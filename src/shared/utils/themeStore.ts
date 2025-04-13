/**
 * Theme store utility for managing application theme state
 * Provides functions to get, set, and toggle between light and dark themes
 * Uses localStorage and system preferences for persistence
 */
import { createSignal, onMount } from "solid-js"
import { ExtensionMessage, MessageAction } from "../types/messages"
import { colorLog, LogTypes } from "./logger"

/**
 * Gets the initial theme based on localStorage or system preference
 * @returns {boolean} True if dark mode is active, false otherwise
 */
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme === "dark"
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/**
 * Creates a theme store with state and functions to manage theme
 * @returns {Object} Theme store with isDarkMode signal and toggleTheme function
 */
export const createThemeStore = () => {
  const [isDarkMode, setIsDarkMode] = createSignal(getInitialTheme())

  /**
   * Toggles between light and dark themes
   * Updates localStorage, DOM attributes, and broadcasts to other contexts
   */
  const toggleTheme = () => {
    const newTheme = !isDarkMode()
    setIsDarkMode(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light")
    localStorage.setItem("theme", newTheme ? "dark" : "light")

    // Broadcast theme change to other contexts (popup, options page, etc.)
    chrome.runtime
      .sendMessage({
        action: MessageAction.SYNC_THEME,
        theme: newTheme ? "dark" : "light",
      })
      .catch((err) => {
        colorLog("Theme sync message failed, likely in development mode", LogTypes.ERROR);
      })
  }

  /**
   * Listens for theme change messages from other contexts
   */
  const listenForThemeChanges = () => {
    chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
      if(message.action === MessageAction.SYNC_THEME) {
        const theme = message.theme;
        const isDark = theme === "dark";
        if(isDark !== isDarkMode()){
          setIsDarkMode(isDark);
          document.documentElement.setAttribute("data-theme", message.theme)
          localStorage.setItem("theme", message.theme)
        }
      }
      return true;
    });
  }

  // Initialize theme on mount
  onMount(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode() ? "dark" : "light")
    listenForThemeChanges()
  })

  return { isDarkMode, toggleTheme }
}