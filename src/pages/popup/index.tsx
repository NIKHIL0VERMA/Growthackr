import { render } from 'solid-js/web'
import { UsageTracker } from './components/UsageTracker'
import { ThemeSwitch, isDarkMode } from '@src/components/ThemeSwitch'
import "@assets/styles/global.css"
import "@pages/popup/index.css"

const App = () => {

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

const root = document.getElementById('extension-container');
render(App, root as HTMLElement);