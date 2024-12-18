"use client";

import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FocusEvent, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "../_hooks/useDebounce";
import MagnifyingGlassIcon from "../_icons/MagnifyingGlassIcon";
import { searchCoins } from "../_services/apiCoinData";

const inter = Inter({ subsets: ["latin"] });

type searchBarProps = {
  isSearchActive: boolean;
  activateSearch: () => void;
  isWideEnough: boolean;
  isSkeleton?: boolean;
  deactivateSearch: () => void;
};

function SearchBar({
  isSearchActive,
  activateSearch,
  isWideEnough,
  deactivateSearch: onDeactivateSearch,
}: searchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  //delays the update of debouncedSearchQuery after "delay" milliseconds has passed without the user changing searchQuery
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  //The MG icon is only reactive (performs actions in response to user interactions) when the viewport is not wide enough (< 640px). Otherwise, it simply serves as a visual icon.
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useQuery({
    queryKey: ["search_coins", debouncedSearchQuery],
    queryFn: async () => {
      if (!debouncedSearchQuery) return [];
      return await searchCoins(debouncedSearchQuery);
    },
    staleTime: Infinity,
    gcTime: 5000,
  });

  // Limit the number of results to 10 and truncate long names (if viewport is wide enough)
  const top10Results =
    data
      ?.slice(0, 10) // Step 1: Take the first 10 items from the data array
      .map((result) => {
        // Step 2: Check if the name needs to be truncated
        const shouldTruncateName = result.name.length > 30 && isWideEnough;

        // Step 3: Truncate the name if needed
        const truncatedName = shouldTruncateName
          ? `${result.name.slice(0, 30)}...`
          : result.name;

        // Step 4: Return a new object with the updated name
        return {
          ...result,
          name: truncatedName,
        };
      }) || []; // Default to an empty array if data is undefined

  const handleMagnifyingGlassClick = () => {
    if (!isWideEnough && inputRef.current) {
      activateSearch();
      inputRef.current.focus();
    }
  };
  const handleDeactivateSearch = () => {
    onDeactivateSearch();
    setSearchQuery("");
  };

  const handleInputFocus = () => !isSearchActive && activateSearch();
  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    //In a blur event, the element that gained focus is e.relatedTarget. If this value is defined and if it's any of the links that navigates to /coins/[coin], let the onClick handler on the <Link/> handle the navigation first, and then it will call onDeactivateSearch
    const clickedElement = e.relatedTarget;
    if (
      clickedElement &&
      clickedElement.tagName === "A" &&
      clickedElement.classList.contains("coin-id-link")
    )
      return;

    if (isSearchActive) {
      handleDeactivateSearch();
    }
  };
  return (
    <div
      className={`${inter.className} relative w-full text-sm text-coinsTable-headerLight`}
    >
      <fieldset
        className={twMerge(
          "flex rounded-lg border bg-light-50 p-2 dark:bg-dark-350 min-[640px]:w-72",
          isSearchActive && "w-full",
          top10Results.length > 0 && "rounded-none rounded-t-lg",
        )}
      >
        {/* Search toggle button */}
        <button
          onClick={handleMagnifyingGlassClick}
          className={isWideEnough || isSearchActive ? "cursor-default" : ""}
        >
          <MagnifyingGlassIcon fillColor="#353570" className="" />
        </button>

        {/* Input field displayed based on screen size or active search. This is just the skeleton */}
        <input
          type="text"
          className={twMerge(
            "w-0",
            (isWideEnough || isSearchActive) &&
              "ml-2 w-full bg-transparent outline-none",
          )} //
          placeholder="Search..."
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={(e) => handleInputBlur(e)}
        />
      </fieldset>
      {/* The Search results */}
      <ul className="absolute z-50 w-full overflow-x-hidden rounded-b-lg">
        {isSearchActive &&
          top10Results.map((value) => (
            <li key={value.id}>
              <Link
                className="coin-id-link block bg-light-50 py-1 pl-10 hover:bg-[#d3d3fd]"
                href={`/coins/${value.id}`}
                onClick={handleDeactivateSearch}
              >
                {value.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchBar;
