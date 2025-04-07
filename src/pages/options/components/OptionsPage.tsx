import { createSignal, For } from "solid-js"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import "@pages/options/styles/optionPage.css"

import facebookImg from "@assets/img/facebook.svg"
import youtubeImg from "@assets/img/youtube.svg"
import instagramImg from "@assets/img/instagram.svg"
import xImg from "@assets/img/x.svg"
import tiktokImg from "@assets/img/tiktok.svg"
import snapchatImg from "@assets/img/snapchat.svg"

export function OptionsPage() {
  const platforms = [
    { name: "Facebook", url: "facebook.com", img: facebookImg },
    { name: "YouTube", url: "youtube.com", img: youtubeImg },
    { name: "Instagram", url: "instagram.com", img: instagramImg },
    { name: "X", url: "x.com", img: xImg },
    { name: "TikTok", url: "tiktok.com", img: tiktokImg },
    { name: "Snapchat", url: "snapchat.com", img: snapchatImg },
    { name: "LinkedIn", url: "linkedin.com", img: facebookImg },
    { name: "Pinterest", url: "pinterest.com", img: youtubeImg },
    { name: "Reddit", url: "reddit.com", img: instagramImg },
    { name: "Twitch", url: "twitch.tv", img: xImg },
    { name: "Discord", url: "discord.com", img: tiktokImg },
    { name: "WhatsApp", url: "whatsapp.com", img: snapchatImg },
  ]

  const [selectedPlatform, setSelectedPlatform] = createSignal(null)
  const [hours, setHours] = createSignal(0)
  const [minutes, setMinutes] = createSignal(0)
  const [isExpanded, setIsExpanded] = createSignal(false)
  const [animatingOut, setAnimatingOut] = createSignal(false)

  const handlePlatformSelect = (platform) => {
    if (selectedPlatform() === platform) {
      setAnimatingOut(true)
      setTimeout(() => {
        setSelectedPlatform(null)
        setHours(0)
        setMinutes(0)
        setIsExpanded(false)
        setAnimatingOut(false)
      }, 300)
    } else {
      setSelectedPlatform(platform)
      setHours(0)
      setMinutes(0)
      setIsExpanded(true)
    }
  }

  const saveSettings = () => {
    console.log("Saving settings:", {
      platform: selectedPlatform(),
      hours: hours(),
      minutes: minutes(),
    })

    const saveButton = document.querySelector(".save-button")
    saveButton.classList.add("save-success")

    setTimeout(() => {
      setAnimatingOut(true)
      setTimeout(() => {
        setSelectedPlatform(null)
        setHours(0)
        setMinutes(0)
        setIsExpanded(false)
        setAnimatingOut(false)
        saveButton.classList.remove("save-success")
      }, 300)
    }, 500)
  }

  const handleHoursChange = (e) => {
    let value = Number.parseInt(e.target.value)
    if (isNaN(value)) value = 0
    if (value < 0) value = 0
    if (value > 23) value = 23
    setHours(value)
  }

  const handleMinutesChange = (e) => {
    let value = Number.parseInt(e.target.value)
    if (isNaN(value)) value = 0
    if (value < 0) value = 0
    if (value > 59) value = 59
    setMinutes(value)
  }

  return (
    <div class="platform-manager">
      <div class="theme-switch-container">
        <ThemeSwitch />
      </div>

      <div class="content-container">
        <div class={`platforms-container ${isExpanded() ? "expanded" : ""} ${animatingOut() ? "animating-out" : ""}`}>
          <h2 class="section-title">Select Platforms</h2>
          <div class="platforms-list">
            <For each={platforms}>
              {(platform) => (
                <button
                  class={`platform-button ${selectedPlatform() === platform.name ? "selected" : ""}`}
                  onClick={() => handlePlatformSelect(platform.name)}
                  aria-pressed={selectedPlatform() === platform.name}
                >
                  <div class="platform-icon-container">
                    <img src={platform.img || "/placeholder.svg"} alt={`${platform.name} logo`} class="platform-icon" />
                  </div>
                  <span class="platform-name">{platform.name}</span>
                </button>
              )}
            </For>
          </div>
        </div>

        <div class={`time-limit-container ${isExpanded() ? "expanded" : ""} ${animatingOut() ? "animating-out" : ""}`}>
          <div class="input-card">
            <h2 class="section-title">Set Daily Time Limit</h2>
            <h3 class="platform-title">For {selectedPlatform()}</h3>

            <div class="time-inputs">
              <div class="time-input-group">
                <label for="hours-input">Hours</label>
                <input
                  id="hours-input"
                  type="number"
                  min="0"
                  max="23"
                  value={hours()}
                  onInput={handleHoursChange}
                  class="time-input"
                  aria-label="Hours"
                />
              </div>

              <div class="time-input-group">
                <label for="minutes-input">Minutes</label>
                <input
                  id="minutes-input"
                  type="number"
                  min="0"
                  max="59"
                  value={minutes()}
                  onInput={handleMinutesChange}
                  class="time-input"
                  aria-label="Minutes"
                />
              </div>
            </div>

            <div class="button-group">
              <button class="action-button save-button" onClick={saveSettings}>
                Save
              </button>
              <button class="action-button cancel-button" onClick={() => handlePlatformSelect(selectedPlatform())}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
