"use client";

import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import MagnifyingGlassIcon from "../_icons/MagnifyingGlassIcon";
import XMarkIcon from "../_icons/XMarkIcon";

type searchBarProps = {
  isSearchActive: boolean;
  toggleSearch: () => void;
  isWideEnough: boolean;
  isSkeleton?: boolean;
};

function SearchBar({
  isSearchActive,
  toggleSearch,
  isWideEnough,
  isSkeleton = false,
}: searchBarProps) {
  //The MG icon is only reactive (performs actions in response to user interactions) when the viewport is not wide enough (< 640px). Otherwise, it simply serves as a visual icon.
  const inputRef = useRef<HTMLInputElement>(null);
  const handleMagnifyingGlassClick = () => {
    if (!isWideEnough && inputRef.current) {
      toggleSearch();
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <fieldset
        className={twMerge(
          "flex h-10 gap-2 rounded-t-lg border bg-light-50 p-2 dark:bg-dark-350 min-[640px]:w-72",
          isSearchActive && "w-full",
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
              "w-auto bg-transparent outline-none",
          )} //
          placeholder="Search..."
          ref={inputRef}
        />
      </fieldset>
      <ul className="absolute z-50 w-full rounded-b-lg bg-light-50">
        <li className="w-min translate-x-10">Bitcoin</li>
        <li className="w-min translate-x-10">Dogecoin</li>
        <li className="w-min translate-x-10">Ethereum</li>
        <li className="w-min translate-x-10">XRP</li>
      </ul>
    </div>
  );
}

export default SearchBar;
