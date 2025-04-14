
import { render } from "solid-js/web"
import { ThemeProvider } from "@src/components/common/ThemeProvider"
import "@styles/global.css"
import "@pages/popup/index.css"
import "@src/shared/utils/IconSetup"
import { UsageTracker } from "./components/UsageTracker"

/**
 * Main App component wrapped with ThemeProvider
 */
const App = () => {
  return (
    <ThemeProvider>
      <UsageTracker />
    </ThemeProvider>
  )
}

const root = document.getElementById("extension-container")
render(App, root as HTMLElement)