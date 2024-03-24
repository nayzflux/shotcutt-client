"use client";

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
  };

  return <button onClick={() => handleSwitch()}>Switch theme</button>;
};

export default ThemeSwitch;
