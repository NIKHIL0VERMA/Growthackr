import { createSignal, createResource, Show } from "solid-js"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import { PlatformList } from "@src/components/common/PlatformList"
import "@pages/options/styles/platformManager.css"
import "@styles/platform-list.css"

import { MessageAction, type SuccessResponse } from "@src/shared/types/messages"
import { colorLog, LogTypes } from "@src/shared/utils/logger"
import type { Platform } from "@src/pages/background/types/storage"
import type { UpdatePlatformMessage } from "@src/shared/types/messages"

/**
 * PlatformManager component for managing platform time limits
 * Allows users to select platforms and set daily time limits
 */
export function PlatformManager() {
  const [selectedPlatform, setSelectedPlatform] = createSignal<Platform | null>(null)
  const [hours, setHours] = createSignal(0)
  const [minutes, setMinutes] = createSignal(0)
  const [showConfirmation, setShowConfirmation] = createSignal(false)
  const [confirmationMessage, setConfirmationMessage] = createSignal("")

  const [platforms, {refetch}] = createResource(async () => {
    try {
      const stored_platforms: SuccessResponse<Platform[]> = await chrome.runtime.sendMessage({
        action: MessageAction.GET_PLATFORMS,
      })
      return stored_platforms.data
    } catch (error) {
      console.error("Error fetching platforms:", error)
      return []
    }
  })

  const handlePlatformSelect = (platform: Platform) => {
    if (selectedPlatform() && selectedPlatform().name === platform.name) {
      setSelectedPlatform(null)
    } else {
      setSelectedPlatform(platform)
      setHours(platform.timeLimit.hours)
      setMinutes(platform.timeLimit.minutes)
    }
  }

  const saveSettings = async () => {
    if (!selectedPlatform()) return

    try {
      const hr = hours()
      const mn = minutes()
      const updatedPlatform = { ...selectedPlatform(), timeLimit: { hours: hr, minutes: mn } }

      const updateMessage: UpdatePlatformMessage = {
        action: MessageAction.UPDATE_PLATFORM,
        platform: updatedPlatform,
      }

      const response = await chrome.runtime.sendMessage(updateMessage)

      if (response.success) {
        colorLog(`Time limit updated for ${updatedPlatform.name} to ${hr} hours and ${mn} minutes`, LogTypes.INFO)
        setConfirmationMessage(`Time limit for ${updatedPlatform.name} updated successfully!`)
        setShowConfirmation(true)
        setTimeout(() => setShowConfirmation(false), 3000)

        // Refresh platforms data
        refetch()
        setSelectedPlatform(null)
      } else {
        colorLog(`Failed to update time limit: ${response.error}`, LogTypes.ERROR)
        setConfirmationMessage("Failed to update time limit. Please try again.")
        setShowConfirmation(true)
        setTimeout(() => setShowConfirmation(false), 3000)
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      setConfirmationMessage("An error occurred. Please try again.")
      setShowConfirmation(true)
      setTimeout(() => setShowConfirmation(false), 3000)
    }
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
        <div class="platform-manager-layout">
          <div class="platform-selection-panel">
            <h2 class="section-title">Select Platforms</h2>
            <p class="section-description">Choose a platform to set daily time limits</p>

            <PlatformList
              platforms={platforms() || []}
              isSelected={(platform) => selectedPlatform() && selectedPlatform().name === platform.name}
              onSelect={handlePlatformSelect}
              showTimeLimit={true}
              loading={platforms.loading}
              maxHeight="calc(100vh - 250px)"
              emptyMessage="No platforms configured. Add platforms in the welcome page."
            />
          </div>

          <Show when={selectedPlatform()}>
            <div class="time-limit-panel">
              <div class="input-card">
                <h2 class="section-title">Set Daily Time Limit</h2>
                <h3 class="platform-title">For {selectedPlatform()?.name}</h3>

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
                  <button class="action-button cancel-button" onClick={() => setSelectedPlatform(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </div>

      <Show when={showConfirmation()}>
        <div class="confirmation-toast" role="alert" aria-live="assertive">
          <i class="fas fa-check-circle"></i>
          <span>{confirmationMessage()}</span>
        </div>
      </Show>
    </div>
  )
}
