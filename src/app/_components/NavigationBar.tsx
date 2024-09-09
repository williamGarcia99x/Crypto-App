import Link from "next/link";

import ThemeSwitch from "./ThemeSwitch";

function NavigationBar() {
  return (
    <nav className="flex justify-between ">
      <div>
        <Link href="/">Home</Link>
        <Link href="/portfolio">Portfolio</Link>
      </div>
      <input type="text" className="bg-cryptoblue-250 opacity-50 " />
      <ThemeSwitch />
    </nav>
  );
}

export default NavigationBar;
