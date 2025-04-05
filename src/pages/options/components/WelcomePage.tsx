import { createSignal, For, onMount, Show } from "solid-js"
import { Input } from "@src/components/Input"
import { Button } from "@src/components/Button"
import { ThemeSwitch } from "@src/components/ThemeSwitch"
import GetStartedButton from "@src/components/GetStartedButton"
import "@pages/options/styles/WelcomePage.css"

import facebookImg from "@assets/img/facebook.svg"
import youtubeImg from "@assets/img/youtube.svg"
import instagramImg from "@assets/img/instagram.svg"
import xImg from "@assets/img/x.svg"
import tiktokImg from "@assets/img/tiktok.svg"
import snapchatImg from "@assets/img/snapchat.svg"
import editIcon from "@assets/img/edit.svg"
import deleteIcon from "@assets/img/delete.svg"
import plusIcon from "@assets/img/plus.svg"

const popularPlatforms = [
  { name: "Facebook", url: "facebook.com", img: facebookImg },
  { name: "YouTube", url: "youtube.com", img: youtubeImg },
  { name: "Instagram", url: "instagram.com", img: instagramImg },
  { name: "X", url: "x.com", img: xImg },
  { name: "TikTok", url: "tiktok.com", img: tiktokImg },
  { name: "Snapchat", url: "snapchat.com", img: snapchatImg },
]

export function WelcomePage({ onComplete }) {
  const [selectedPlatforms, setSelectedPlatforms] = createSignal([])
  const [customUrl, setCustomUrl] = createSignal("")
  const [error, setError] = createSignal("")
  const [editIndex, setEditIndex] = createSignal(-1)
  const [editUrl, setEditUrl] = createSignal("")
  const [animateSelection, setAnimateSelection] = createSignal(false)
  const [lastAction, setLastAction] = createSignal({ type: "", index: -1 })

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.some((p) => p.url === platform.url)) {
        setLastAction({ type: "remove", index: prev.findIndex((p) => p.url === platform.url) })
        return prev.filter((p) => p.url !== platform.url)
      } else {
        setLastAction({ type: "add", index: prev.length })
        setAnimateSelection(true)
        setTimeout(() => setAnimateSelection(false), 500)
        return [...prev, platform]
      }
    })
  }

  const validateUrl = (url) => {
    if (!url) return false

    let testUrl = url
    if (!testUrl.match(/^https?:\/\//i)) {
      testUrl = "http://" + testUrl
    }

    try {
      new URL(testUrl)
      return true
    } catch (e) {
      return false
    }
  }

  const addCustomUrl = () => {
    if (!customUrl()) {
      setError("Please enter a URL.")
      animateError()
      return
    }

    const url = customUrl()
    const displayUrl = url.replace(/^https?:\/\//i, "")

    if (validateUrl(url)) {
      if (!selectedPlatforms().some((p) => p.url.toLowerCase() === displayUrl.toLowerCase())) {
        setSelectedPlatforms((prev) => {
          const newList = [...prev, { name: displayUrl, url: displayUrl }]
          setLastAction({ type: "add", index: newList.length - 1 })
          return newList
        })
        setCustomUrl("")
        setError("")
        setAnimateSelection(true)
        setTimeout(() => setAnimateSelection(false), 500)
      } else {
        setError("This URL is already in your list.")
        animateError()
      }
    } else {
      setError("Please enter a valid URL.")
      animateError()
    }
  }

  const animateError = () => {
    const inputElement = document.querySelector(".url-input")
    if (inputElement) {
      inputElement.classList.add("shake-animation")
      setTimeout(() => {
        inputElement.classList.remove("shake-animation")
      }, 500)
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setEditUrl(selectedPlatforms()[index].url)
  }

  const saveEdit = (index) => {
    if (validateUrl(editUrl())) {
      const updatedPlatforms = [...selectedPlatforms()]
      updatedPlatforms[index] = {
        ...updatedPlatforms[index],
        url: editUrl(),
        name: editUrl().replace(/^https?:\/\//i, ""),
      }
      setSelectedPlatforms(updatedPlatforms)
      setEditIndex(-1)
      setEditUrl("")
      setError("")
    } else {
      setError("Please enter a valid URL.")
      animateError()
    }
  }

  const deletePlatform = (index) => {
    setLastAction({ type: "delete", index })
    setSelectedPlatforms((prev) => prev.filter((_, i) => i !== index))
  }

  const handleComplete = () => {
    if (selectedPlatforms().length === 0) {
      setError("Please select at least one platform.")
      return
    }

    const button = document.querySelector(".get-started-button")
    if (button) {
      button.classList.add("pulse-animation")
      setTimeout(() => {
        onComplete(selectedPlatforms())
      }, 600)
    } else {
      onComplete(selectedPlatforms())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addCustomUrl()
    }
  }

  onMount(() => {
    document.title = "Welcome to Growthackr"
  })

  return (
    <div class="welcome-page">
      <header class="welcome-header">
        <h2 class="title">Welcome to Growthackr</h2>
        <div class="theme-switch-wrapper">
          <ThemeSwitch />
        </div>
      </header>

      <div class="content">
        <div class="section right-section">
          <h3 class="section-title">Popular Platforms</h3>
          <p class="description">Select the platforms you want to track:</p>

          <div class="platforms">
            <For each={popularPlatforms}>
              {(platform) => (
                <button
                  class={`platform-button ${selectedPlatforms().some((p) => p.url === platform.url) ? "selected" : ""}`}
                  onClick={() => togglePlatform(platform)}
                  aria-pressed={selectedPlatforms().some((p) => p.url === platform.url)}
                >
                  <div class="platform-icon-wrapper">
                    <img src={platform.img || "/placeholder.svg"} alt={`${platform.name} logo`} class="platform-icon" />
                  </div>
                  <span class="platform-button-text">{platform.name}</span>
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="section left-section">
          <h3 class="section-title">Your Selection</h3>
          <p class="description">Selected platforms:</p>

          <div class="selected-container">
            <Show
              when={selectedPlatforms().length > 0}
              fallback={
                <div class="empty-selection">
                  <p>No platforms selected yet. Choose from popular platforms or add a custom URL.</p>
                </div>
              }
            >
              <ul class="selected-list">
                <For each={selectedPlatforms()}>
                  {(platform, index) => (
                    <li
                      class={`selected-item ${lastAction().type === "add" && lastAction().index === index() ? "item-added" : ""}`}
                    >
                      <Show
                        when={editIndex() !== index()}
                        fallback={
                          <div class="edit-container">
                            <Input
                              type="text"
                              value={editUrl()}
                              onInput={(e) => setEditUrl(e.target.value)}
                              onKeyPress={handleKeyPress}
                              class="edit-input"
                              aria-label={`Edit URL for ${platform.name}`}
                            />
                            <div class="edit-actions">
                              <Button
                                onClick={() => saveEdit(index())}
                                class="save-edit-button"
                                aria-label="Save changes"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditIndex(-1)}
                                class="cancel-edit-button"
                                aria-label="Cancel editing"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        }
                      >
                        <div class="platform-info">
                          <span class="platform-name">{platform.name}</span>
                        </div>
                        <div class="icon-container">
                          <button
                            class="icon-button edit-button"
                            onClick={() => handleEdit(index())}
                            aria-label={`Edit ${platform.name}`}
                          >
                            <img src={editIcon || "/placeholder.svg"} alt="Edit" class="action-icon" />
                          </button>
                          <button
                            class="icon-button delete-button"
                            onClick={() => deletePlatform(index())}
                            aria-label={`Delete ${platform.name}`}
                          >
                            <img src={deleteIcon || "/placeholder.svg"} alt="Delete" class="action-icon" />
                          </button>
                        </div>
                      </Show>
                    </li>
                  )}
                </For>
              </ul>
            </Show>

            <div class="custom-url-section">
              <h4 class="custom-url-title">Add Custom URL</h4>
              <div class="input-group">
                <Input
                  type="text"
                  placeholder="Enter URL (e.g., example.com)"
                  value={customUrl()}
                  onInput={(e) => setCustomUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  class="url-input"
                  aria-label="Custom URL"
                />
                <button class="add-button" onClick={addCustomUrl} aria-label="Add custom URL">
                  <img src={plusIcon || "/placeholder.svg"} alt="Add" class="plus-icon" />
                </button>
              </div>
              <Show when={error()}>
                <p class="error-message">{error()}</p>
              </Show>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <GetStartedButton class="get-started-button" onClick={handleComplete} />
      </div>
    </div>
  )
}
