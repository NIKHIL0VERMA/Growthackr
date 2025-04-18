import { createSignal, createEffect, For, Show, onMount, createMemo } from "solid-js"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import { useTheme } from "@src/components/common/ThemeProvider"
import { Button } from "@src/components/ui/Button"
import "@styles/global.css"
import "@pages/popup/index.css"
import { CircularProgress } from "./CircularProgress"
import { getStorageSnapshot, initStorage, onStorageChange } from "@src/pages/background/services/storage"
import { Platform, StorageData, TimeSpentData } from "@src/pages/background/types/storage"

/**
 * Main content component for the popup
 */
export const UsageTracker = () => {
  const { isDarkMode } = useTheme()
  const [overallPercentage, setOverallPercentage] = createSignal(0)
  const [remainingTime, setRemainingTime] = createSignal({ hours: 0, minutes: 0 })
  const [platforms, setPlatforms] = createSignal<Platform[]>([])
  const [timeSpent, setTimeSpent] = createSignal<TimeSpentData>({})
  const [isLoading, setIsLoading] = createSignal(true);

  onMount(async () => {
    await initStorage();

    const snapshot = getStorageSnapshot();

    setPlatforms(snapshot.platforms);
    setTimeSpent(snapshot.timeSpent);
    setIsLoading(false);

    onStorageChange((update : StorageData) => {
      setPlatforms(update.platforms)
      setTimeSpent(update.timeSpent)
    });
  });

  const todayUsage = createMemo(() => {
    const ts = timeSpent();
    const today = new Date().toLocaleDateString('en-CA');
    return ts[today] || {};
  });
  
  const overallStats = createMemo(() => {
    const today = todayUsage();
    const platformsList = platforms();
  
    let totalSeconds = 0;
    let totalLimit = 0;
  
    platformsList.forEach(platform => {
      const seconds = today[platform.url.toLowerCase()] || 0;
      totalSeconds += seconds;
  
      const limitInSeconds = platform.timeLimit.hours * 3600 + platform.timeLimit.minutes * 60;
      totalLimit += limitInSeconds;
    });
  
    const percentage = totalLimit > 0 ? Math.min(Math.round((totalSeconds / totalLimit) * 100), 100) : 0;
    const remaining = Math.max(totalLimit - totalSeconds, 0);
  
    return {
      percentage,
      remainingHours: Math.floor(remaining / 3600),
      remainingMinutes: Math.floor((remaining % 3600) / 60)
    };
  });
  

  // Calculate usage data when resources are loaded
  createEffect(() => {
    if (isLoading()) return;
    const stats = overallStats();
    setOverallPercentage(stats.percentage);
    setRemainingTime({ hours: stats.remainingHours, minutes: stats.remainingMinutes });
});


  // Calculate platform usage percentage
  const getPlatformPercentage = (platform : Platform) => {
    const usage = todayUsage();
    const seconds = usage[platform.url.toLowerCase()] || 0
    const limitInSeconds = platform.timeLimit.hours * 60 * 60 + platform.timeLimit.minutes * 60

    if (limitInSeconds === 0) return 0
    return Math.min(Math.round((seconds / limitInSeconds) * 100), 100)
  }

  // Format seconds to time string
  const formatTime = (seconds: number) => {
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
            when={!isLoading()}
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
                    const percentage = createMemo(() => getPlatformPercentage(platform));
                    const seconds = createMemo(() => todayUsage()[platform.url.toLowerCase()] || 0);

                    return (
                      <li class="platform-item" role="listitem">
                        <div class="platform-icon">
                          <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`}></i>
                        </div>
                        <div class="platform-details">
                          <div class="platform-header">
                            <span class="platform-name">{platform.name}</span>
                            <span class="platform-time">
                              {formatTime(seconds())} / {platform.timeLimit.hours}h {platform.timeLimit.minutes}m
                            </span>
                          </div>
                          <div class="progress-container" aria-hidden="true">
                            <div
                              class={`progress-bar ${percentage() < 50 ? "good" : percentage() < 80 ? "warning" : "danger"}`}
                              style={{ width: `${percentage()}%` }}
                            ></div>
                          </div>
                          <span class="sr-only">
                            {platform.name} usage: {percentage()}% of daily limit
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
