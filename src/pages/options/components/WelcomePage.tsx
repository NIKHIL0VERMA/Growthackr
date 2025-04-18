
import { createSignal, For, onMount, Show } from "solid-js"
import { Input } from "@src/components/ui/Input"
import { Button } from "@src/components/ui/Button"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import { PlatformList } from "@src/components/common/PlatformList"
import GetStartedButton from "@src/components/ui/GetStartedButton"
import "@pages/options/styles/WelcomePage.css"
import "@styles/platform-list.css"
import { extractHostName, removeTLD, validateUrl } from "@src/shared/utils/utilities"
import type { Platform } from "@src/pages/background/types/storage"
import { popularPlatforms } from "@src/shared/constants/PopularPlatforms"

// Default settings - to be moved to a settings configuration in the future
const DEFAULT_SETTINGS = {
  timeLimit: {
    hours: 0,
    minutes: 15,
  },
}

export function WelcomePage({ onComplete }) {
  const [selectedPlatforms, setSelectedPlatforms] = createSignal<Platform[]>([])
  const [customUrl, setCustomUrl] = createSignal("")
  const [error, setError] = createSignal("")
  const [editIndex, setEditIndex] = createSignal(-1)
  const [editUrl, setEditUrl] = createSignal("")
  const [step, setStep] = createSignal(1)

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.some((p) => p.url.toLowerCase() === platform.url.toLowerCase())) {
        return prev.filter((p) => p.url.toLowerCase() !== platform.url.toLowerCase())
      } else {
        return [...prev, platform]
      }
    })
  }

  const addCustomUrl = () => {
    if (!customUrl()) {
      setError("Please enter a URL.")
      animateError()
      return
    }

    const url = customUrl()
    if (!validateUrl(url)) {
      setError("Please enter a valid URL.")
      animateError()
      return
    }

    const hostname = extractHostName(url)

    if (selectedPlatforms().some((p) => p.url.toLowerCase() === hostname.toLowerCase())) {
      setError("This URL is already in your list.")
      animateError()
      return
    }

    const display_name = removeTLD(hostname)
    setSelectedPlatforms((prev) => [
      ...prev,
      { name: display_name, url: hostname, icon: "", timeLimit: DEFAULT_SETTINGS.timeLimit, isCustom: true },
    ])
    setCustomUrl("")
    setError("")
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

  const handleEdit = (platform: Platform, index: number) => {
    setEditIndex(index)
    setEditUrl(platform.url.toLowerCase())
  }

  const saveEdit = (index: number) => {
    if (validateUrl(editUrl())) {
      const updatedPlatforms = [...selectedPlatforms()]
      updatedPlatforms[index] = {
        ...updatedPlatforms[index],
        url: editUrl(),
        name: removeTLD(extractHostName(editUrl())),
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

  const deletePlatform = (index: number) => {
    setSelectedPlatforms((prev) => prev.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (selectedPlatforms().length === 0) {
      setError("Please select at least one platform.")
      return
    }
    setStep(2)
  }

  const handleComplete = () => {
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
    <div class="page-container">
      <header class="header">
        <div class="header-content">
          <img
            src={chrome.runtime.getURL("/icons/34x34.png") || "/placeholder.svg"}
            alt="Growthackr"
            class="app-icon"
          />
          <h2 class="title">Growthackr Settings</h2>
        </div>
        <div class="theme-switch-wrapper">
          <ThemeSwitch />
        </div>
      </header>

      <div class="content-container">
        <div class="progress-bar-container">
          <div class="progress-step">
            <div class={`step-circle ${step() >= 1 ? "active" : ""}`}>1</div>
            <span class="step-label">Select Platforms</span>
          </div>
          <div class="progress-line"></div>
          <div class="progress-step">
            <div class={`step-circle ${step() >= 2 ? "active" : ""}`}>2</div>
            <span class="step-label">Set Goals</span>
          </div>
        </div>

        <div class="welcome-sections">
          <Show when={step() === 1}>
            <div class="section platforms-section">
              <h3 class="section-title">Popular Platforms</h3>
              <p class="section-description">Select the platforms you want to track:</p>

              <PlatformList
                platforms={popularPlatforms}
                isSelected={(platform) => selectedPlatforms().some((p) => p.url.toLowerCase() === platform.url.toLowerCase())}
                onSelect={togglePlatform}
                maxHeight="calc(70vh - 250px)"
                />

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
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <Show when={error()}>
                  <p class="error-message" role="alert">
                    {error()}
                  </p>
                </Show>
              </div>
            </div>

            <div class="section selection-section">
              <h3 class="section-title">Your Selection</h3>
              <p class="section-description">Selected platforms:</p>

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
                        <li class="selected-item">
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
                              <div class="platform-icon-small">
                                <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`}></i>
                              </div>
                              <span class="platform-name">{platform.name}</span>
                            </div>
                            <div class="icon-container">
                              <button
                                class="icon-button edit-button"
                                onClick={() => handleEdit(platform, index())}
                                aria-label={`Edit ${platform.name}`}
                              >
                                <i class="fas fa-edit"></i>
                              </button>
                              <button
                                class="icon-button delete-button"
                                onClick={() => deletePlatform(index())}
                                aria-label={`Delete ${platform.name}`}
                              >
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </Show>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
              </div>
            </div>
          </Show>

          <Show when={step() === 2}>
            <div class="section goals-section">
              <h3 class="section-title">Set Your Goals</h3>
              <p class="section-description">Define how much time you want to spend on each platform daily:</p>

              <div class="goals-list">
                <For each={selectedPlatforms()}>
                  {(platform, index) => (
                    <div class="goal-item">
                      <div class="goal-platform-info">
                        <div class="platform-icon-small">
                          <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`}></i>
                        </div>
                        <span class="platform-name">{platform.name}</span>
                      </div>

                      <div class="goal-time-inputs">
                        <div class="time-input-small">
                          <input
                            type="number"
                            min="0"
                            max="23"
                            value={platform.timeLimit.hours}
                            onInput={(e) => {
                              const updatedPlatforms = [...selectedPlatforms()]
                              updatedPlatforms[index()].timeLimit.hours = Number.parseInt(e.target.value) || 0
                              setSelectedPlatforms(updatedPlatforms)
                            }}
                            aria-label="Hours"
                          />
                          <span>h</span>
                        </div>
                        <div class="time-input-small">
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={platform.timeLimit.minutes}
                            onInput={(e) => {
                              const updatedPlatforms = [...selectedPlatforms()]
                              updatedPlatforms[index()].timeLimit.minutes = Number.parseInt(e.target.value) || 0
                              setSelectedPlatforms(updatedPlatforms)
                            }}
                            aria-label="Minutes"
                          />
                          <span>m</span>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="section tips-section">
              <h3 class="section-title">Tips for Success</h3>
              <ul class="tips-list">
                <li>
                  <i class="fas fa-check-circle"></i>
                  <span>Start with realistic time limits you can achieve</span>
                </li>
                <li>
                  <i class="fas fa-check-circle"></i>
                  <span>Gradually reduce time limits as you adjust</span>
                </li>
                <li>
                  <i class="fas fa-check-circle"></i>
                  <span>Use the extension consistently for best results</span>
                </li>
                <li>
                  <i class="fas fa-check-circle"></i>
                  <span>Review your usage patterns weekly</span>
                </li>
              </ul>
            </div>
          </Show>
        </div>

        <div class="welcome-footer">
          <Show when={step() === 1}>
            <Button variant="primary" class="next-button" onClick={nextStep}>
              Continue <i class="fas fa-arrow-right"></i>
            </Button>
          </Show>
          <Show when={step() === 2}>
            <Button variant="outline" class="back-button" onClick={() => setStep(1)}>
              <i class="fas fa-arrow-left"></i> Back
            </Button>
            <GetStartedButton class="get-started-button" onClick={handleComplete} />
          </Show>
        </div>
      </div>
    </div>
  )
}
