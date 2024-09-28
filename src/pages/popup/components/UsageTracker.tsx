import { createSignal, For, onMount } from 'solid-js'
import Speedometer from './Speedometer'

export function UsageTracker({ darkMode, setCurrentView }) {
  const [platforms, setPlatforms] = createSignal([]);

  onMount(() => {
    chrome.storage.sync.get(['timeSpent', 'dailyLimits'], (result) => {
      const timeSpent = result.timeSpent || {};
      const dailyLimits = result.dailyLimits || {};
      const today = new Date().toDateString();

      const updatedPlatforms = [
        { name: 'Facebook', usage: timeSpent[today]?.['facebook.com'] || 0, limit: dailyLimits['facebook.com'] || 60 },
        { name: 'Youtube', usage: timeSpent[today]?.['youtube.com'] || 0, limit: dailyLimits['youtube.com'] || 90 },
        { name: 'Instagram', usage: timeSpent[today]?.['instagram.com'] || 0, limit: dailyLimits['instagram.com'] || 30 },
      ];

      setPlatforms(updatedPlatforms);
    });
  });

  return (
    <div class="usage-tracker">
      <h2>Today's Usage</h2>
      <div class="platform-list">
        <For each={platforms()}>
          {(platform, index) => (
            <div class="platform-item">
              <Speedometer
                id={index}
                darkMode={darkMode}
                value={platform.usage}
                max={platform.limit}
                min={0}
                text={platform.name}
                width={250}
              >{platform.name}</Speedometer>
            </div>
          )}
        </For>
      </div>
      <button onClick={() => setCurrentView('settings')}>Set Time</button>
    </div>
  )
}