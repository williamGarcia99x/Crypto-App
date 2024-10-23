import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import LogoIcon from "../_icons/LogoIcon";
import HomeIcon from "../_icons/HomeIcon";
import CoinExchangeIcon from "../_icons/CoinExchangeIcon";
import StackIcon from "../_icons/StackIcon";

function NavigationBar() {
  //const isActive = (href: string) => router.pathname === href;

  return (
    <div className="">
      <div>
        <div className="flex">
          <LogoIcon />
        </div>
      </div>
      <input type="text" className="bg-cryptoblue-250 opacity-50" />
      <ThemeSwitch />
    </div>
  );
}

export default NavigationBar;
