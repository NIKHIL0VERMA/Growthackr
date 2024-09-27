import { createSignal, createEffect } from 'solid-js'
import { render } from 'solid-js/web'
import { UsageTracker } from './components/UsageTracker'
import { TimeSettings } from './components/TimeSettings'
import { ThemeToggle } from './components/ThemeToggle'
import './index.css'

const App = () => {
  const [darkMode, setDarkMode] = createSignal(false)
  const [currentView, setCurrentView] = createSignal('main')

  createEffect(() => {
    document.body.classList.toggle('dark', darkMode())
  })

  return (
    <div class={`app ${darkMode() ? 'dark' : 'light'}`}>
      <header>
        <h1>Growthackr</h1>
        <p>Take control of your time</p>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <main>
        {currentView() === 'main' ? (
          <UsageTracker darkMode={darkMode} setCurrentView={setCurrentView} />
        ) : (
          <TimeSettings darkMode={darkMode} setCurrentView={setCurrentView} />
        )}
      </main>
    </div>
  )
}

const root = document.getElementById('extension-container');
render(App, root as HTMLElement);