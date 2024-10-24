"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MoonIcon from "../_icons/MoonIcon";
import SunIcon from "../_icons/SunIcon";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // Ensures the component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering on the server side to avoid hydration mismatch. Render this skeleton instead
  if (!mounted) {
    return (
      <button className="bg-light-50 rounded-md border p-2 dark:bg-dark-350">
        <SunIcon fillColor="" />
      </button>
    );
  }

  return (
    <button
      className="bg-light-50 rounded-md border p-2 dark:bg-dark-350"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <SunIcon fillColor={"white"} />
      ) : (
        <MoonIcon fillColor={"#424286"} />
      )}
    </button>
  );
}
