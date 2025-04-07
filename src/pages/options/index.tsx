import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import "@assets/styles/global.css"
import { ThemeProvider, useTheme } from '@src/components/common/ThemeProvider'
import { WelcomePage } from '@src/pages/options/components/WelcomePage'
import { colorLog, LogTypes } from '@src/shared/utils/logger'
import { OptionsPage } from '@src/pages/options/components/OptionsPage'

const OptionsContent = () => {
  const [welcomeShown, setwelcomeShown] = createSignal(false);
  const { isDarkMode } = useTheme();

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
    chrome.storage.local.get(['welcome'], (res) => {
      if(res.welcome !== false){
        setwelcomeShown(true);
      }
    });
  });

  return (
    <div class={`app ${isDarkMode() ? 'dark' : 'light'}`}>
      <main>
        {welcomeShown() ? (<WelcomePage onComplete={handleWelcomeComplete} />)
          : (<OptionsPage />)
        }
      </main>
    </div>
  )
}

const Index = () => {
  return (
    <ThemeProvider>
      <OptionsContent />
    </ThemeProvider>
  )
}

const root = document.getElementById('options-container');
render(Index, root as HTMLElement);