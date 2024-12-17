"use client";
import Link from "next/link";
import HomeIcon from "../_icons/HomeIcon";
import CoinExchangeIcon from "../_icons/CoinExchangeIcon";
import StackIcon from "../_icons/StackIcon";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function BottomNav({ className = "" }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const isActive = (href: string) => pathname === href;
  // Wait for the component to mount on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <nav
        className={twMerge(
          "fixed bottom-0 h-20 w-full border-t-2 border-[#1919251c] bg-white bg-opacity-60 py-2 backdrop-blur-sm dark:bg-dark-350 dark:bg-opacity-90",
          className,
        )}
      ></nav>
    );
  }
  return (
    <nav
      className={twMerge(
        "fixed bottom-0 h-20 w-full border-t-2 border-[#1919251c] bg-white bg-opacity-60 py-2 backdrop-blur-sm dark:bg-dark-350 dark:bg-opacity-90",
        className,
      )}
    >
      <ul className="flex items-center justify-center gap-4">
        <Link
          href="/"
          className={twMerge(
            "w-28 rounded-xl border py-2",
            isActive("/") && "bg-light-100 bg-opacity-60",
          )}
        >
          <li
            className={twMerge(
              "flex flex-col items-center",
              isActive("/") || theme !== "light"
                ? "text-white"
                : "text-dark-100",
            )}
          >
            <HomeIcon
              fillColor={
                theme !== "light" || isActive("/") ? "white" : "#6161D6"
              }
            />
            <p>Home</p>
          </li>
        </Link>
        <Link
          href="/converter"
          className={twMerge(
            "w-28 rounded-xl border py-2 text-dark-100",
            isActive("/converter") && "bg-light-100 bg-opacity-60 text-white",
          )}
        >
          <li
            className={twMerge(
              "flex flex-col items-center text-dark-100",
              isActive("/converter") || theme !== "light" ? "text-white" : "",
            )}
          >
            <CoinExchangeIcon
              fillColor={
                theme !== "light" || isActive("/converter")
                  ? "white"
                  : "#6161D6"
              }
            />
            <p>Converter</p>
          </li>
        </Link>
        <Link
          href="/portfolio"
          className={twMerge(
            "w-28 rounded-xl border py-2 text-dark-100",
            isActive("/portfolio") && "bg-light-100 bg-opacity-60 text-white",
          )}
        >
          <li
            className={twMerge(
              "flex flex-col items-center text-dark-100",
              isActive("/portfolio") || theme !== "light" ? "text-white" : "",
            )}
          >
            <StackIcon
              fillColor={
                theme !== "light" || isActive("/portfolio")
                  ? "white"
                  : "#6161D6"
              }
            />
            <p>Portfolio</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default BottomNav;
