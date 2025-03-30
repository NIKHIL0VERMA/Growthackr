import { createEffect, createSignal, For } from "solid-js"
import { Input } from "@src/components/Input"
import { Button } from "@src/components/Button"
import '@pages/options/styles/WelcomePage.css' 

const popularPlatforms = [
  { name: "Facebook", url: "facebook.com" },
  { name: "YouTube", url: "youtube.com" },
  { name: "Instagram", url: "instagram.com" },
  { name: "Twitter", url: "twitter.com" },
  { name: "TikTok", url: "tiktok.com" },
]

export function WelcomePage({ onComplete }) {
  const [selectedPlatforms, setSelectedPlatforms] = createSignal([])
  const [customUrl, setCustomUrl] = createSignal("")

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform)
      } else {
        return [...prev, platform]
      }
    })
  }

  const addCustomUrl = () => {
    if (customUrl() && !selectedPlatforms().find((p) => p.url === customUrl())) {
      setSelectedPlatforms((prev) => [...prev, { name: customUrl(), url: customUrl() }])
      setCustomUrl("")
    }
  }

  const handleComplete = () => {
    onComplete(selectedPlatforms())
  }

  createEffect(() => {
    document.title = "Welcome to Growthackr";
  });

  return (
    <div class="welcome-page">
      <h2 class="title">Welcome to Growthackr</h2>
      <p class="description">Select the platforms you want to track:</p>
      <div class="platforms">
        <For each={popularPlatforms}>
          {(platform) => (
            <Button
              variant={selectedPlatforms().includes(platform) ? "primary" : "outline"}
              onClick={() => togglePlatform(platform)}
              class="platform-button"
              aria-pressed={selectedPlatforms().includes(platform)}
            >
              {platform.name}
            </Button>
          )}
        </For>
      </div>
      <div class="custom-url">
        <p class="description">Add a custom website:</p>
        <div class="input-group">
          <Input
            type="text"
            placeholder="Enter URL (e.g., example.com)"
            value={customUrl()}
            onInput={(e) => setCustomUrl(e.target.value)}
            class="url-input"
            aria-label="Custom URL"
          />
          <Button onClick={addCustomUrl} class="add-button">Add</Button>
        </div>
      </div>
      <div class="selected-platforms">
        <p class="description">Selected platforms:</p>
        <ul>
          <For each={selectedPlatforms()}>{(platform) => <li>{platform.name}</li>}</For>
        </ul>
      </div>
      <Button onClick={handleComplete} class="get-started-button">
        Get Started
      </Button>
    </div>
  )
}
