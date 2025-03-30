import { createSignal, onMount } from 'solid-js';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const [isDarkMode, setIsDarkMode] = createSignal(getInitialTheme());

const toggleTheme = () => {
  const newTheme = !isDarkMode();
  setIsDarkMode(newTheme);
  document.body.classList.toggle('dark', newTheme);
  localStorage.setItem('theme', newTheme ? 'dark' : 'light');
};

export { isDarkMode, toggleTheme };
