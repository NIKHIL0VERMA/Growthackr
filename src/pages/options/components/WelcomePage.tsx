import { createEffect, createSignal, For, onMount } from "solid-js";
import { Input } from "@src/components/Input";
import { Button } from "@src/components/Button";
import { ThemeSwitch } from "@src/components/ThemeSwitch";
import GetStartedButton from "@src/components/GetStartedButton";
import '@pages/options/styles/WelcomePage.css';

// Import SVG images
import facebookImg from "@assets/img/facebook.svg";
import youtubeImg from "@assets/img/youtube.svg";
import instagramImg from "@assets/img/instagram.svg";
import xImg from "@assets/img/x.svg";
import tiktokImg from "@assets/img/tiktok.svg";
import snapchatImg from "@assets/img/snapchat.svg";

export function WelcomePage({ onComplete }) {
  const [selectedPlatforms, setSelectedPlatforms] = createSignal([]);
  const [customUrl, setCustomUrl] = createSignal("");
  const [error, setError] = createSignal("");

  const popularPlatforms = [
    { name: "Facebook", url: "facebook.com", img: facebookImg },
    { name: "YouTube", url: "youtube.com", img: youtubeImg },
    { name: "Instagram", url: "instagram.com", img: instagramImg },
    { name: "X", url: "twitter.com", img: xImg },
    { name: "TikTok", url: "tiktok.com", img: tiktokImg },
    { name: "Snapchat", url: "snapchat.com", img: snapchatImg },
  ];

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform)
      } else {
        return [...prev, platform]
      }
    })
  }

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", "i" // fragment locator
    )
    return !!urlPattern.test(url)
  }

  const addCustomUrl = () => {
    if (customUrl() && validateUrl(customUrl())) {
      if (!selectedPlatforms().find((p) => p.url === customUrl())) {
        setSelectedPlatforms((prev) => [...prev, { name: customUrl(), url: customUrl() }])
        setCustomUrl("")
        setError("")
      }
    } else {
      setError("Please enter a valid URL.")
    }
  }

  const handleComplete = () => {
    onComplete(selectedPlatforms())
  }

  onMount(() => {
    document.title = "Welcome to Growthackr";
  });
  
  return (
    <div class="welcome-page">
      <header>
        <h2 class="title">Welcome to Growthackr</h2>
        <ThemeSwitch />
      </header>
      <div class="content">
        <div class="right-section">
          <p class="description">Select the platforms you want to track:</p>
          <div class="platforms">
            <For each={popularPlatforms}>
              {(platform) => (
                <Button
                  variant={selectedPlatforms().includes(platform) ? "primary" : "outline"}
                  onClick={() => togglePlatform(platform)}
                  class={`platform-button ${selectedPlatforms().includes(platform) ? "selected" : ""}`}
                  aria-pressed={selectedPlatforms().includes(platform)}
                >
                  <img src={platform.img} alt={`${platform.name} logo`} class="platform-icon" />
                  {platform.name}
                </Button>
              )}
            </For>
          </div>
        </div>
        <div class="left-section">
          <p class="description">Selected platforms:</p>
          <ul class="selected-list">
            <For each={selectedPlatforms()}>{(platform) => <li>{platform.name}</li>}</For>
          </ul>
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
            {error() && <p class="error-message">{error()}</p>}
          
          </div>
          </div>
            <GetStartedButton onClick={handleComplete} />
    </div>
  )
}
