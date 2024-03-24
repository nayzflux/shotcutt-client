"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeSwitch = () => {
  const theme = useTheme();

  const handleSwitch = () => {
    if (theme.theme === "light") {
      theme.setTheme("dark");
    }

    if (theme.theme === "dark") {
      theme.setTheme("light");
    }

    if (theme.theme === "system") {
      if (theme.systemTheme === "light") {
        theme.setTheme("dark");
      }

      if (theme.systemTheme === "dark") {
        theme.setTheme("light");
      }
    }
  };

  return (
    <button onClick={() => handleSwitch()} className="flex items-center">
      {theme.theme === "light" ||
      (theme.theme === "systme" && theme.systemTheme === "light") ? (
        <>
          <MoonIcon className="w-4 h-4 mr-2" />
          Dark mode
        </>
      ) : (
        <>
          <SunIcon className="w-4 h-4 mr-2" />
          Light mode
        </>
      )}
    </button>
  );
};

export default ThemeSwitch;
