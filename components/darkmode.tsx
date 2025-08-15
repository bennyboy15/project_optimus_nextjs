"use client";

import { useEffect, useState } from "react";

export function DarkModeButton() {
  const [isDark, setIsDark] = useState(false);

  // Load initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setIsDark(prefersDark);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-80 transition"
    >
      {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
