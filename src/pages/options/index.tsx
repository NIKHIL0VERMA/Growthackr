import { createSignal, createEffect } from 'solid-js'
import { render } from 'solid-js/web'
import '@pages/popup/index.css'
import { ThemeToggle } from '@pages/popup/components/ThemeToggle'
import { WelcomePage } from '@pages/popup/components/WelcomePage'
import { colorLog, LogTypes } from '../../../utils/logger'

const Index = () => {
  const [darkMode, setDarkMode] = createSignal(false)
  
  const handleWelcomeComplete = (platformList) => {
    chrome.runtime.sendMessage({action: 'welcomeCompleted', value: false}, (response) =>{
      if(response.success){
        colorLog("Welcome Event completed", LogTypes.SUCCESS);
      }
    });

    chrome.runtime.sendMessage({action: 'monitorList', value: platformList}, (response) => {
      if(response.success){
        colorLog(`Successfully saved monitoring list`, LogTypes.SUCCESS);
        colorLog(platformList, LogTypes.INFO);
      }
    });

    chrome.runtime.sendMessage({action: "closeOptionsPage"}, (response) =>{
      colorLog("Option page after welcoming closed", LogTypes.SUCCESS);
    })
  };

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
            <WelcomePage onComplete={handleWelcomeComplete} />
      </main>
    </div>
  )
}

const root = document.getElementById('options-container');
render(Index, root as HTMLElement);