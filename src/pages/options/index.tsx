import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import "@styles/global.css"
import { ThemeProvider, useTheme } from '@src/components/common/ThemeProvider'
import { WelcomePage } from '@src/pages/options/components/WelcomePage'
import { colorLog, LogTypes } from '@src/shared/utils/logger'
import { PlatformManager } from '@src/pages/options/components/PlatformManager'
import { MessageAction } from '@src/shared/types/messages'
import { Platform } from '@src/pages/background/types/storage'
import "@src/shared/utils/IconSetup"
import "./index.css"

const OptionsContent = () => {
  const [welcomeShown, setwelcomeShown] = createSignal(false);
  const { isDarkMode } = useTheme();

  const handleWelcomeComplete = async (platformList : Platform[]) => {
    try {
      // Send all platforms in a single message
      const platformResponse = await chrome.runtime.sendMessage({
        action: MessageAction.SET_PLATFORMS,
        platforms: platformList
      });

      if (platformResponse.success) {
        colorLog(`Successfully added ${platformList.length} platforms`, LogTypes.SUCCESS);
      }

      // Mark welcome as completed
      const welcomeResponse = await chrome.runtime.sendMessage({
        action: MessageAction.WELCOME_COMPLETED
      });
      
      if (welcomeResponse.success) {
        colorLog("Welcome Event completed", LogTypes.SUCCESS);
      }

      // Close options page
      const closeResponse = await chrome.runtime.sendMessage({
        action: MessageAction.CLOSE_OPTIONS_PAGE
      });

      if (closeResponse.success) {
        colorLog("Options page closed after welcome", LogTypes.SUCCESS);
      }
    } catch (error) {
      colorLog(`Error during welcome completion: ${error}`, LogTypes.ERROR);
    }
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
          : (<PlatformManager />)
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