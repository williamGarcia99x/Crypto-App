"use client";
import Link from "next/link";
import HomeIcon from "../_icons/HomeIcon";
import CoinExchangeIcon from "../_icons/CoinExchangeIcon";
import StackIcon from "../_icons/StackIcon";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav className="fixed bottom-0 w-full border border-[#1919251c] bg-white bg-opacity-60 py-2 backdrop-blur-sm">
      <ul className="flex items-center justify-center gap-4">
        <Link
          href="/"
          className={twMerge(
            "w-28 rounded-xl border py-2 text-dark-100",
            isActive("/") && "bg-light-100 bg-opacity-60 text-white",
          )}
        >
          <li className="flex flex-col items-center">
            <HomeIcon fillColor="#6161D6" />
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
          <li className="flex flex-col items-center">
            <CoinExchangeIcon fillColor="#6161D6" />
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
          <li className="flex flex-col items-center">
            <StackIcon fillColor="#6161D6" />
            <p>Portfolio</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default BottomNav;
