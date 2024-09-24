import { createSignal, For } from 'solid-js'
import { RadialProgressBar } from './customProgress/RadialProgressBar'

export function UsageTracker({ setCurrentView }) {
  const [platforms] = createSignal([
    { name: 'Facebook', usage: 45, limit: 60 },
    { name: 'Youtube', usage: 30, limit: 90 },
    { name: 'Instagram', usage: 15, limit: 30 },
  ])

  return (
    <div class="usage-tracker">
      <h2>Today's Usage</h2>
      <div class="platform-list">
        <For each={platforms()}>
          {(platform) => (
            <div class="platform-item">
              <RadialProgressBar
                value={platform.usage}
                max={platform.limit}
                label={platform.name[0]}
              />
              <p>{platform.name}</p>
            </div>
          )}
        </For>
      </div>
      <button onClick={() => setCurrentView('settings')}>Set Time</button>
    </div>
  )
}