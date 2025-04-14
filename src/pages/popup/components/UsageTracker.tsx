import { createSignal, createResource, createEffect, For, Show } from "solid-js"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import { useTheme } from "@src/components/common/ThemeProvider"
import { Button } from "@src/components/ui/Button"
import "@styles/global.css"
import "@pages/popup/index.css"
import { CircularProgress } from "./CircularProgress"
import { colorLog, LogTypes } from "@src/shared/utils/logger"

/**
 * Main content component for the popup
 */
export const UsageTracker = () => {
  const { isDarkMode } = useTheme()
  const [todayUsage, setTodayUsage] = createSignal<{ [key: string]: number }>({})
  const [overallPercentage, setOverallPercentage] = createSignal(0)
  const [remainingTime, setRemainingTime] = createSignal({ hours: 0, minutes: 0 })

  // Fetch platforms data
  const [platforms] = createResource(async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        action: "GET_PLATFORMS",
      })
      return response.data || []
    } catch (error) {
      colorLog("Error fetching platforms:" + error, LogTypes.ERROR);
      return []
    }
  })

  // Fetch time spent data
  const [timeSpent] = createResource(async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        action: "GET_TIME_SPENT",
      })
      return response.data || {}
    } catch (error) {
      colorLog("Error fetching time spent:" + error, LogTypes.ERROR);
      return {}
    }
  })

  // Calculate usage data when resources are loaded
  createEffect(() => {
    if (platforms.loading || timeSpent.loading) return

    const today = new Date().toISOString().split("T")[0]
    const todayData = timeSpent()?.[today] || {}
    setTodayUsage(todayData)

    // Calculate overall percentage and remaining time
    let totalSeconds = 0
    let totalLimit = 0

    platforms().forEach((platform) => {
      const seconds = todayData[platform.url] || 0
      totalSeconds += seconds

      const limitInSeconds = platform.timeLimit.hours * 60 * 60 + platform.timeLimit.minutes * 60
      totalLimit += limitInSeconds
    })

    if (totalLimit > 0) {
      const percentage = Math.min(Math.round((totalSeconds / totalLimit) * 100), 100)
      setOverallPercentage(percentage)

      const remainingSecs = Math.max(totalLimit - totalSeconds, 0)
      const hours = Math.floor(remainingSecs / 3600)
      const minutes = Math.floor((remainingSecs % 3600) / 60)
      setRemainingTime({ hours, minutes })
    }
  })

  // Calculate platform usage percentage
  const getPlatformPercentage = (platform) => {
    const seconds = todayUsage()[platform.url] || 0
    const limitInSeconds = platform.timeLimit.hours * 60 * 60 + platform.timeLimit.minutes * 60

    if (limitInSeconds === 0) return 0
    return Math.min(Math.round((seconds / limitInSeconds) * 100), 100)
  }

  // Format seconds to time string
  const formatTime = (seconds) => {
    if (!seconds) return "0m"

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div class={`app ${isDarkMode() ? "dark" : "light"}`}>
      <header class="popup-header">
        <div class="header-content">
          <img
            src={chrome.runtime.getURL("/icons/34x34.png") || "/placeholder.svg"}
            alt="Growthackr"
            class="app-icon"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=34&width=34"
            }}
          />
          <div class="title-container">
            <h1>Growthackr</h1>
            <p class="tagline">Take control of your time</p>
          </div>
        </div>
        <ThemeSwitch />
      </header>

      <main class="popup-content">
        <section class="usage-overview" aria-labelledby="usage-overview-title">
          <h2 id="usage-overview-title" class="section-title">
            Today's Usage
          </h2>

          <div class="usage-summary">
            <CircularProgress percentage={overallPercentage()} size={140} label="Overall usage percentage" />

            <div class="time-stats">
              <div class="time-stat">
                <span class="stat-label">Remaining</span>
                <span class="stat-value">
                  {remainingTime().hours}h {remainingTime().minutes}m
                </span>
              </div>
              <div class="time-stat">
                <span class="stat-label">Status</span>
                <span
                  class={`stat-status ${overallPercentage() < 50 ? "good" : overallPercentage() < 80 ? "warning" : "danger"}`}
                >
                  {overallPercentage() < 50 ? "Good" : overallPercentage() < 80 ? "Moderate" : "High"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="platforms-overview" aria-labelledby="platforms-title">
          <h2 id="platforms-title" class="section-title">
            Your Platforms
          </h2>

          <Show
            when={!platforms.loading}
            fallback={
              <div class="loading-indicator" aria-live="polite">
                Loading platforms...
              </div>
            }
          >
            <Show when={platforms().length > 0} fallback={<p class="empty-message">No platforms configured yet.</p>}>
              <ul class="platform-list" role="list">
                <For each={platforms()}>
                  {(platform) => {
                    const percentage = getPlatformPercentage(platform)
                    const seconds = todayUsage()[platform.url] || 0

                    return (
                      <li class="platform-item" role="listitem">
                        <div class="platform-icon">
                          <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`}></i>
                        </div>
                        <div class="platform-details">
                          <div class="platform-header">
                            <span class="platform-name">{platform.name}</span>
                            <span class="platform-time">
                              {formatTime(seconds)} / {platform.timeLimit.hours}h {platform.timeLimit.minutes}m
                            </span>
                          </div>
                          <div class="progress-container" aria-hidden="true">
                            <div
                              class={`progress-bar ${percentage < 50 ? "good" : percentage < 80 ? "warning" : "danger"}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span class="sr-only">
                            {platform.name} usage: {percentage}% of daily limit
                          </span>
                        </div>
                      </li>
                    )
                  }}
                </For>
              </ul>
            </Show>
          </Show>
        </section>
      </main>

      <footer class="popup-footer">
        <Button
          variant="secondary"
          class="open-options-button"
          onClick={() => chrome.runtime.openOptionsPage()}
          aria-label="Open advanced settings page"
        >
          Advanced Settings
        </Button>
      </footer>
    </div>
  )
}
