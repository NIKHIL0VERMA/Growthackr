import { createSignal, createResource} from "solid-js"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import "@pages/options/styles/platformManager.css"

import { MessageAction, SuccessResponse } from "@src/shared/types/messages"
import { colorLog, LogTypes } from "@src/shared/utils/logger";
import { PlatformList } from "./PlatformsList";
import { Platform } from "@src/pages/background/types/storage";
import { UpdatePlatformMessage } from "@src/shared/types/messages";

export function PlatformManager() {
  const [selectedPlatform, setSelectedPlatform] = createSignal(null)
  const [hours, setHours] = createSignal(0)
  const [minutes, setMinutes] = createSignal(0)
  const [isExpanded, setIsExpanded] = createSignal(false)
  const [animatingOut, setAnimatingOut] = createSignal(false)

  const [platforms] = createResource(async () => {
      const stored_platforms : SuccessResponse<Platform[]> = await chrome.runtime.sendMessage({
        action: MessageAction.GET_PLATFORMS
      });
      return stored_platforms.data;
  });

  const handlePlatformSelect = (platform : Platform) => {
    if (selectedPlatform() === platform.name) {
      setAnimatingOut(true)
      setTimeout(() => {
        setSelectedPlatform(null)
        setHours(0)
        setMinutes(0)
        setIsExpanded(false)
        setAnimatingOut(false)
      }, 300)
    } else {
      setSelectedPlatform(platform.name);
      setHours(platform.timeLimit.hours);
      setMinutes(platform.timeLimit.minutes);
      setIsExpanded(true);
    }
  }

  const saveSettings = () => {
    const updatePlatformTimeLimit = async () => {
      const hr = hours();
      const mn = minutes();
      let selectedPlatformData : Platform = platforms().find(platform => platform.name === selectedPlatform());
      selectedPlatformData.timeLimit.hours = hr;
      selectedPlatformData.timeLimit.minutes = mn;
      const updateMessage: UpdatePlatformMessage = {
        action: MessageAction.UPDATE_PLATFORM,
        platform: selectedPlatformData
      };
      const response = await chrome.runtime.sendMessage(updateMessage);
      if (response.success) {
        colorLog(`Time limit updated for ${selectedPlatformData.name} to ${selectedPlatformData.timeLimit.hours} hours and ${selectedPlatformData.timeLimit.minutes} minutes`, LogTypes.INFO);
      } else {
        colorLog(`Failed to update time limit for ${selectedPlatformData.name}: ${response.error}`, LogTypes.ERROR);
      }
    };
    updatePlatformTimeLimit();

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
    <div class="page-container">
      <header class="header">
        <h2 class="title">Growthackr options</h2>
        <div class="theme-switch-wrapper">
          <ThemeSwitch />
        </div>
      </header>

      <div class="content-container">
        <div class={`platforms-container ${isExpanded() ? "expanded" : ""} ${animatingOut() ? "animating-out" : ""}`}>
          <h2 class="section-title">Select Platforms</h2>
          {!!!platforms() && <div>Loading platforms...</div>}
          {platforms() && <PlatformList
              platforms={platforms()}
              isSelected={(platform: Platform) => selectedPlatform() === platform.name}
              onSelect={handlePlatformSelect}
            />}
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
