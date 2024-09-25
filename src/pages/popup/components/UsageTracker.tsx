import { createSignal, For } from 'solid-js'
import Speedometer from './customProgress/Speedometer'
import Background from './customProgress/Background'
import Progress from './customProgress/Progress'
import Arc from './customProgress/Arc'

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
              <Speedometer
                value={platform.usage}
                max={platform.limit}
                // label={platform.name[0]}
              >
                <Background/>
                <Arc arcWidth={4}/>
                <Progress arcWidth={10}/>
              </Speedometer>
              <p>{platform.name}</p>
            </div>
          )}
        </For>
      </div>
      <button onClick={() => setCurrentView('settings')}>Set Time</button>
    </div>
  )
}