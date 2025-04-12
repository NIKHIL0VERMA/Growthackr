import { createSignal, For, onMount, Show } from "solid-js"
import { Input } from "@src/components/ui/Input"
import { Button } from "@src/components/ui/Button"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import GetStartedButton from "@src/components/common/GetStartedButton"
import "@pages/options/styles/WelcomePage.css"
import {extractHostName, isValidPage, removeTLD, validateUrl} from "@src/shared/utils/utilities"
import { PlatformList } from "./PlatformsList"
import { Platform } from "@src/pages/background/types/storage"
import { popularPlatforms } from "@src/shared/constants/PopularPlatforms"

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


  const addCustomUrl = () => {
    if (!customUrl()) {
      setError("Please enter a URL.")
      animateError()
      return
    }

    const url = customUrl();
    if(!validateUrl(url)){
      setError("Please enter a valid URL.");
      animateError();
      return;
    }

    const hostname = extractHostName(url);

    if(selectedPlatforms().some((p) => p.url.toLowerCase() === hostname.toLowerCase())){
      setError("This URL is already in your list.");
      animateError();
      return;
    }

    const display_name = removeTLD(hostname);
    setSelectedPlatforms((prev) => {
      const newList = [...prev, { name: display_name, url: hostname }];
      setLastAction({ type: "add", index: newList.length - 1 });
      return newList;
    });
    setCustomUrl("");
    setError("");
    setAnimateSelection(true);
    setTimeout(() => setAnimateSelection(false), 500);
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
    <div class="page-container">
      <header class="header">
        <h2 class="title">Welcome to Growthackr</h2>
        <div class="theme-switch-wrapper">
          <ThemeSwitch />
        </div>
      </header>

      <div class="content-container">
        <div class="section right-section">
          <h3 class="section-title">Popular Platforms</h3>
          <p class="description">Select the platforms you want to track:</p>

          <PlatformList 
            platforms={popularPlatforms}
            isSelected={(platform: Platform) => selectedPlatforms().some((p) => p.url == platform)}
            onSelect={togglePlatform}
          />
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
