import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import "@assets/styles/global.css"
import { ThemeSwitch, isDarkMode } from '@src/components/ThemeSwitch'
import { WelcomePage } from '@src/pages/options/components/WelcomePage'
import { colorLog, LogTypes } from '@utils/logger'
import {OptionsPage} from '@src/pages/options/components/OptionsPage'

const Index = () => {
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

  return (
    <div class={`app ${isDarkMode() ? 'dark' : 'light'}`}>
      <ThemeSwitch/>
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