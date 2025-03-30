import { toggleTheme, isDarkMode } from '@utils/themeStore';
export { isDarkMode };

export function ThemeSwitch() {
  return (
    <button
      class="theme-switch"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDarkMode()}
    >
      <span class="theme-switch__icon">
        {isDarkMode() ? '🌙' : '☀️'}
      </span>
    </button>
  );
}