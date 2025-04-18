import { useTheme } from "./ThemeProvider"

export function ThemeSwitch() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button class="theme-switch" onClick={toggleTheme} aria-label="Toggle theme" aria-pressed={isDarkMode()}>
      <span class="theme-switch__icon">{isDarkMode() ? "🌙" : "☀️"}</span>
    </button>
  )
}
