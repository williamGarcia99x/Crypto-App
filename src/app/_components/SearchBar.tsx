"use client";

import { twMerge } from "tailwind-merge";
import MagnifyingGlassIcon from "../_icons/MagnifyingGlassIcon";

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
  return (
    <div className="relative w-full">
      <fieldset
        className={twMerge(
          "flex h-10 gap-2 rounded-t-lg border bg-light-50 p-2 dark:bg-dark-350 min-[640px]:w-72",
          isSearchActive && "w-full",
        )}
      >
        {/* Search toggle button */}
        <button onClick={toggleSearch}>
          <MagnifyingGlassIcon fillColor="#353570" className="" />
        </button>

        {/* Input field displayed based on screen size or active search. This is just the skeleton */}
        {isSkeleton && (
          <input
            type="text"
            className="hidden h-full w-full bg-transparent outline-none min-[640px]:block"
            placeholder="Search..."
          />
        )}

        {!isSkeleton && (isWideEnough || isSearchActive) && (
          <input
            type="text"
            className="bg-transparent outline-none" //
            placeholder="Search..."
          />
        )}
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
