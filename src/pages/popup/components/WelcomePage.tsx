import { createSignal, For } from "solid-js"
import { Input } from "@src/components/Input"
import { Button } from "@src/components/Button"

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

  return (
    <div class="welcome-page p-6 max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Welcome to Growthackr</h2>
      <p class="mb-4">Select the platforms you want to track:</p>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <For each={popularPlatforms}>
          {(platform) => (
            <Button
              variant={selectedPlatforms().includes(platform) ? "primary" : "outline"}
              onClick={() => togglePlatform(platform)}
              class="w-full"
            >
              {platform.name}
            </Button>
          )}
        </For>
      </div>
      <div class="mb-6">
        <p class="mb-2">Add a custom website:</p>
        <div class="flex gap-2">
          <Input
            type="text"
            placeholder="Enter URL (e.g., example.com)"
            value={customUrl()}
            onInput={(e) => setCustomUrl(e.target.value)}
          />
          <Button onClick={addCustomUrl}>Add</Button>
        </div>
      </div>
      <div class="mb-6">
        <p class="font-bold mb-2">Selected platforms:</p>
        <ul class="list-disc pl-5">
          <For each={selectedPlatforms()}>{(platform) => <li>{platform.name}</li>}</For>
        </ul>
      </div>
      <Button onClick={handleComplete} class="w-full">
        Get Started
      </Button>
    </div>
  )
}

