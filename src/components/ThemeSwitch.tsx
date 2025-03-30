import { onMount } from 'solid-js';
import { toggleTheme, isDarkMode } from '@utils/themeStore';
export { isDarkMode };

export function ThemeSwitch() {
  onMount(() => {
    document.body.classList.toggle('dark', isDarkMode());
  });

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