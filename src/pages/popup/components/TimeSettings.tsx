import { createSignal, For } from 'solid-js'

export function TimeSettings({ setCurrentView }) {
  const [platforms] = createSignal(['Instagram', 'Youtube', 'Facebook'])
  const [selectedPlatforms, setSelectedPlatforms] = createSignal([])
  const [hours, setHours] = createSignal(0)
  const [minutes, setMinutes] = createSignal(0)

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  const saveSettings = () => {
    // Here you would save the settings to storage
    console.log('Saving settings:', { selectedPlatforms: selectedPlatforms(), hours: hours(), minutes: minutes() })
    setCurrentView('main')
  }

  return (
    <div class="time-settings">
      <h2>Set Daily Time Limits</h2>
      <div class="platform-selection">
        <For each={platforms()}>
          {(platform) => (
            <button
              class={selectedPlatforms().includes(platform) ? 'selected' : ''}
              onClick={() => togglePlatform(platform)}
            >
              {platform}
            </button>
          )}
        </For>
      </div>
      <div class="time-input">
        <input
          type="number"
          min="0"
          max="23"
          value={hours()}
          onInput={(e) => setHours(parseInt(e.target.value))}
        />
        <label>Hours</label>
        <input
          type="number"
          min="0"
          max="59"
          value={minutes()}
          onInput={(e) => setMinutes(parseInt(e.target.value))}
        />
        <label>Minutes</label>
      </div>
      <button onClick={saveSettings}>Save</button>
      <button onClick={() => setCurrentView('main')}>Back</button>
    </div>
  )
}