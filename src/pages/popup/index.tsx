import { render } from 'solid-js/web'
import { UsageTracker } from './components/UsageTracker'
import { ThemeSwitch } from '@src/components/common/ThemeSwitch'
import { ThemeProvider, useTheme } from '@src/components/common/ThemeProvider'
import "@assets/styles/global.css"
import "@pages/popup/index.css"

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div class={`app ${isDarkMode() ? 'dark' : 'light'}`}>
      <header>
        <h1>Growthackr</h1>
        <p>Take control of your time</p>
        <ThemeSwitch/>
      </header>
      <main>
        <UsageTracker/>
      </main>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

const root = document.getElementById('extension-container');
render(App, root as HTMLElement);