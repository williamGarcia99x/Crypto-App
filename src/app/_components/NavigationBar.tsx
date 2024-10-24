"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "../_hooks/useMediaQuery";
import HomeWithDoorIcon from "../_icons/HomeWithDoorIcon";
import LogoIcon from "../_icons/LogoIcon";
import MagnifyingGlassIcon from "../_icons/MagnifyingGlassIcon";
import ThreeStackFineIcon from "../_icons/ThreeStarFineIcon";
import ThemeSwitch from "./ThemeSwitch";
import SearchBar from "./SearchBar";
const inter = Inter({ subsets: ["latin"] });

function NavigationBar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isWideEnough = useMediaQuery("(min-width: 640px)");

  // Toggles the search input visibility
  const toggleSearch = () => setIsSearchActive((prevState) => !prevState);

  useEffect(function () {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="mx-auto mb-4 flex h-20 w-full max-w-[1500px] items-center justify-between bg-white px-4 dark:dark:bg-dark-300">
        {/* Logo and app name */}
        <div className="flex items-center gap-2 text-2xl">
          <LogoIcon />
          <p
            className={`${inter.className} hidden text-xl font-extrabold text-light-highlight-bar dark:text-white md:block`}
          >
            CoinFolio
          </p>
        </div>

        {/* Navigation links for wider screens */}
        <nav className="md-plus:flex hidden gap-6">
          <Link href="/" className="flex gap-1">
            <HomeWithDoorIcon fillColor="#353570" />
            <p className="text-dark-highlight-bar">Home</p>
          </Link>
          <Link href="/portfolio" className="flex gap-1">
            <ThreeStackFineIcon fillColor="#353570" />
            <p>Portfolio</p>
          </Link>
        </nav>

        {/* Search input and controls */}
        <div
          className={twMerge(
            "flex",
            !isWideEnough && isSearchActive && "w-full",
          )}
        >
          <SearchBar
            isSearchActive={false}
            toggleSearch={() => null}
            isWideEnough={false}
            isSkeleton
          />
          {/* Currency and theme switch (hidden in search mode on smaller screens) */}

          <div className="p-2">USD</div>
          <ThemeSwitch />
        </div>
      </header>
    );
  }

  return (
    <header className="dark: mx-auto mb-4 flex h-20 w-full max-w-[1500px] items-center justify-between bg-white px-4 dark:dark:bg-dark-300">
      {/* Logo and app name */}
      {(isWideEnough || (!isWideEnough && !isSearchActive)) && (
        <div className="flex h-6 items-center gap-2">
          <LogoIcon />
          <p
            className={`${inter.className} hidden text-xl font-extrabold text-light-highlight-bar dark:text-white md:block`}
          >
            CoinFolio
          </p>
        </div>
      )}

      {/* Navigation links for wider screens */}
      <nav className="md-plus:flex hidden gap-6">
        <Link href="/" className="flex gap-1">
          <HomeWithDoorIcon fillColor="#353570" />
          <p className="text-dark-highlight-bar">Home</p>
        </Link>
        <Link href="/portfolio" className="flex gap-1">
          <ThreeStackFineIcon fillColor="#353570" />
          <p>Portfolio</p>
        </Link>
      </nav>

      {/* Search input and controls */}
      <div
        className={twMerge("flex", !isWideEnough && isSearchActive && "w-full")}
      >
        <SearchBar
          isSearchActive={isSearchActive}
          toggleSearch={toggleSearch}
          isWideEnough={isWideEnough}
        />
        {/* Currency and theme switch (hidden in search mode on smaller screens) */}
        {(isWideEnough || (!isWideEnough && !isSearchActive)) && (
          <>
            <div className="p-2">USD</div>
            <ThemeSwitch />
          </>
        )}
      </div>
    </header>
  );
}

export default NavigationBar;
