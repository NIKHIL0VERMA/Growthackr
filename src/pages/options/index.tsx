import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import "@assets/styles/global.css"
import { ThemeProvider, useTheme } from '@src/components/common/ThemeProvider'
import { WelcomePage } from '@src/pages/options/components/WelcomePage'
import { colorLog, LogTypes } from '@src/shared/utils/logger'
import { OptionsPage } from '@src/pages/options/components/OptionsPage'
import { MessageAction } from '@src/shared/types/messages'
import { Platform } from '@src/pages/background/types/storage'

// Default settings - to be moved to a settings configuration in the future
const DEFAULT_SETTINGS = {
  timeLimit: {
    hours: 0,
    minutes: 15
  }
};

const OptionsContent = () => {
  const [welcomeShown, setwelcomeShown] = createSignal(false);
  const { isDarkMode } = useTheme();

  const handleWelcomeComplete = async (platformList) => {
    try {
      // Create complete platform objects with default settings
      const platforms: Platform[] = platformList.map(platform => ({
        url: platform.url,
        name: platform.name,
        icon: platform.img || '',
        timeLimit: DEFAULT_SETTINGS.timeLimit,
        isCustom: !platform.img // If no image, it's a custom platform
      }));

      // Send all platforms in a single message
      const platformResponse = await chrome.runtime.sendMessage({
        action: MessageAction.ADD_PLATFORM,
        platforms // Send the entire list at once
      });

      if (platformResponse.success) {
        colorLog(`Successfully added ${platforms.length} platforms`, LogTypes.SUCCESS);
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