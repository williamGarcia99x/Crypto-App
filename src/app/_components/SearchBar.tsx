"use client";

import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import MagnifyingGlassIcon from "../_icons/MagnifyingGlassIcon";
const inter = Inter({ subsets: ["latin"] });

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
    <fieldset
      className={twMerge(
        "bg-light-50 flex h-10 gap-2 rounded-lg border p-2 dark:bg-dark-350 min-[640px]:w-72",
        isSearchActive && "w-full",
      )}
    >
      {/* Search toggle button */}
      <button className="text-red-500" onClick={toggleSearch}>
        <MagnifyingGlassIcon fillColor="#353570" className="" />
      </button>

      {/* Input field displayed based on screen size or active search */}
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
          className="h-full w-full bg-transparent outline-none" //
          placeholder="Search..."
        />
      )}
    </fieldset>
  );
}

export default SearchBar;
