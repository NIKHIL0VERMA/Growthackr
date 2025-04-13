/**
 * Theme provider component that manages theme context across the application
 * Provides theme state and functions to child components
 */
import { createContext, useContext, type ParentComponent } from "solid-js"
import { createThemeStore } from "@src/shared/utils/themeStore"

const ThemeContext = createContext<ReturnType<typeof createThemeStore>>()

/**
 * ThemeProvider component that wraps the application and provides theme context
 */
export const ThemeProvider: ParentComponent = (props) => {
  const theme = createThemeStore()

  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>
}

/**
 * Hook to access theme context from any component
 * @returns Theme context with isDarkMode signal and toggleTheme function
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
