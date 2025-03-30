import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import { UsageTracker } from './components/UsageTracker'
import { ThemeToggle } from '../../components/ThemeToggle'
import "@assets/styles/global.css"
import "@pages/popup/index.css"
import { WelcomePage } from '../options/components/WelcomePage'
import { colorLog, LogTypes } from '../../../utils/logger'

const App = () => {
  const [darkMode, setDarkMode] = createSignal(false);
  const [currentView, setCurrentView] = createSignal('main');
  const [welcome, setWelcome] = createSignal(false);

  const handleWelcomeComplete = (platformList) => {
    setWelcome(false);
    chrome.runtime.sendMessage({action: 'welcomeCompleted', value: false}, (response) =>{
      if(response.success){
        colorLog("Welcome Event completed", LogTypes.SUCCESS);
      }
    });

    chrome.runtime.sendMessage({action: 'monitorList', value: platformList}, (response) => {
      if(response.success){
        colorLog(`Successfully saved monitoring list`, LogTypes.INFO);
        colorLog(platformList, LogTypes.INFO);
      }
    })

  };

  onMount(() => {
    chrome.storage.local.get(['welcome'], (res) => {
      if(res.welcome !== false){
        setWelcome(true);
      }
    });
  });

  createEffect(() => {
    document.body.classList.toggle('dark', darkMode())
  });

  return (
    <div class={`app ${darkMode() ? 'dark' : 'light'}`}>
      <header>
        <h1>Growthackr</h1>
        <p>Take control of your time</p>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <main>
        {welcome() ? (
            <WelcomePage onComplete={handleWelcomeComplete} />
          ) : (
            <UsageTracker darkMode={darkMode} setCurrentView={setCurrentView} />
          )}
      </main>
    </div>
  )
}

const root = document.getElementById('extension-container');
render(App, root as HTMLElement);