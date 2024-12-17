"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "../_hooks/useMediaQuery";
import HomeWithDoorIcon from "../_icons/HomeWithDoorIcon";
import LogoIcon from "../_icons/LogoIcon";
import ThreeStackFineIcon from "../_icons/ThreeStarFineIcon";
import ThemeSwitch from "./ThemeSwitch";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

function HomePortfolioLinks() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const isLinkActive = (href: string) => href === pathname;
  return (
    <nav className="hidden gap-6 md-plus:flex">
      <Link href="/" className="flex gap-1">
        <HomeWithDoorIcon
          fillColor={theme === "light" ? "#353570" : "white"}
          className={isLinkActive("/") ? "opacity-100" : "opacity-50"}
        />
        <p className={isLinkActive("/") ? "opacity-100" : "opacity-50"}>Home</p>
      </Link>
      <Link href="/portfolio" className="flex gap-1">
        <ThreeStackFineIcon
          fillColor={theme === "light" ? "#353570" : "white"}
          className={` ${isLinkActive("/portfolio") ? "opacity-100" : "opacity-50"}`}
        />
        <p
          className={isLinkActive("/portfolio") ? "opacity-100" : "opacity-50"}
        >
          Portfolio
        </p>
      </Link>
    </nav>
  );
}

export default function NavigationBar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isWideEnough = useMediaQuery("(min-width: 640px)");

  // Toggles the search input visibility

  const toggleSearch = () => setIsSearchActive(true);

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
      <HomePortfolioLinks />

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
        {(isWideEnough || !isSearchActive) && (
          <>
            <div className="p-2">USD</div>
            <ThemeSwitch />
          </>
        )}
      </div>
    </header>
  );
}
