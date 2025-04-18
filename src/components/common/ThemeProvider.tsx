import { createContext, useContext, type ParentComponent } from "solid-js"
import { createThemeStore } from "@src/shared/utils/themeStore"

const ThemeContext = createContext<ReturnType<typeof createThemeStore>>()

export const ThemeProvider: ParentComponent = (props) => {
  const theme = createThemeStore()

  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
