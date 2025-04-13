/**
 * ThemeSwitch component that toggles between light and dark themes
 * Uses the theme context to access current theme state and toggle function
 */
import { useTheme } from "./ThemeProvider"

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button class="theme-switch" onClick={toggleTheme} aria-label="Toggle theme" aria-pressed={isDarkMode()}>
      <span class="theme-switch__icon">{isDarkMode() ? "🌙" : "☀️"}</span>
    </button>
  )
}
