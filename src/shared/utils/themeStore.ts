import { createSignal, onMount } from 'solid-js';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const createThemeStore = () => {
  const [isDarkMode, setIsDarkMode] = createSignal(getInitialTheme());

  const toggleTheme = () => {
    const newTheme = !isDarkMode();
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Initialize theme on mount
  onMount(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode() ? 'dark' : 'light');
  });

  return { isDarkMode, toggleTheme };
};
