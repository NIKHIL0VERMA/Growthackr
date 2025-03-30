export function ThemeToggle({ darkMode, setDarkMode }) {
    return (
      <button class="theme-toggle" onClick={() => setDarkMode(!darkMode())}>
        {darkMode() ? '☀️' : '🌙'}
      </button>
    )
  }