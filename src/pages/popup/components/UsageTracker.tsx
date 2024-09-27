import { createSignal, For } from 'solid-js'
import Speedometer from './Speedometer'

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
          {(platform, index) => (
            <div class="platform-item">
              <Speedometer
                id={index}
                value={platform.usage}
                max={platform.limit}
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