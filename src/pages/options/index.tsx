import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import "@assets/styles/global.css"
import { ThemeToggle } from '@src/components/ThemeToggle'
import { WelcomePage } from '@src/pages/options/components/WelcomePage'
import { colorLog, LogTypes } from '@utils/logger'
import {OptionsPage} from '@src/pages/options/components/OptionsPage'

const Index = () => {
  const [darkMode, setDarkMode] = createSignal(false);
  const [welcomeShown, setwelcomeShown] = createSignal(false);

  const [currentView, setCurrentView] = createSignal('main');

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

  onMount(() => {
    chrome.storage.local.get(['welcome'], (res) => { // Convert this to central background
      if(res.welcome !== false){
        setwelcomeShown(true);
      }
    });
  });

  createEffect(() => {
    document.body.classList.toggle('dark', darkMode());
  });

  return (
    <div class={`app ${darkMode() ? 'dark' : 'light'}`}>
      <header>
        <h1>Growthackr</h1>
        <p>Take control of your time</p>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <main>
          {welcomeShown() ? (<WelcomePage onComplete={handleWelcomeComplete} />)
            : (<OptionsPage setCurrentView={setCurrentView()}/>)
            }
      </main>
    </div>
  )
}

const root = document.getElementById('options-container');
render(Index, root as HTMLElement);