"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import SunIcon from "../_icons/SunIcon";
import MoonIcon from "../_icons/MoonIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

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
      <div className="bg-light-50 rounded-md">
        {/* opacity-0 so that the content of the button doesn't show. */}
        <button className="p-2 opacity-0">
          <SunIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-light-50 rounded-md">
      <button className="p-2" onClick={toggleTheme}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
