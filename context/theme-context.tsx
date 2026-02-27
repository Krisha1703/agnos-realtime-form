/* Theme Context for managing dark and light mode state across the application */

"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext<any>(null)

export function ThemeProvider({ children }: any) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)