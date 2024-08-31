"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "../_icons/SunIcon";
import MoonIcon from "../_icons/MoonIcon";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8"></div>;

  return (
    <div className="w-8 h-8 ">
      {resolvedTheme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <MoonIcon size={10} />
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <SunIcon size={10} />
        </button>
      )}
    </div>
  );
}
