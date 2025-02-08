import { createSignal, createEffect, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import '../popup/index.css'
import { ThemeToggle } from '../popup/components/ThemeToggle'
import { WelcomePage } from '../popup/components/WelcomePage'
import { logger } from '../background/logger'

const App = () => {
  const [darkMode, setDarkMode] = createSignal(false)
  
  const handleWelcomeComplete = (platformList) => {
    chrome.runtime.sendMessage({action: 'welcomeCompleted', value: false}, (response) =>{
      if(response.success){
        logger.log("Welcome Event completed");
      }
    });

    chrome.runtime.sendMessage({action: 'monitorList', value: platformList}, (response) => {
      if(response.success){
        logger.log(`Successfully saved monitoring list`);
        logger.log(platformList);
      }
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

const root = document.getElementById('welcome-container');
render(App, root as HTMLElement);