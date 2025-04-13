
import { render } from "solid-js/web"
import { createSignal, createResource, For, Show } from "solid-js"
import { ThemeSwitch } from "@src/components/common/ThemeSwitch"
import { ThemeProvider, useTheme } from "@src/components/common/ThemeProvider"
import { Button } from "@src/components/ui/Button"
import "@styles/global.css"
import "@pages/popup/index.css"
import "@src/shared/utils/IconSetup"

const AppContent = () => {
  const { isDarkMode } = useTheme()
  const [activeTab, setActiveTab] = createSignal("overview")
  const [platforms] = createResource(async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        action: "GET_PLATFORMS", // TODO: update to usage platforms
      })
      return response.data || []
    } catch (error) {
      console.error("Error fetching platforms:", error)
      return []
    }
  })

  return (
    <div class={`app ${isDarkMode() ? "dark" : "light"}`}>
      <header>
        <div class="logo-container">
          <h1>Growthackr</h1>
          <p class="tagline">Take control of your time</p>
        </div>
        <ThemeSwitch />
      </header>

      <nav class="tab-navigation">
        <button
          class={`tab-button ${activeTab() === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
          aria-selected={activeTab() === "overview"}
        >
          <i class="fas fa-chart-pie"></i>
          <span>Overview</span>
        </button>
        <button
          class={`tab-button ${activeTab() === "platforms" ? "active" : ""}`}
          onClick={() => setActiveTab("platforms")}
          aria-selected={activeTab() === "platforms"}
        >
          <i class="fas fa-globe"></i>
          <span>Platforms</span>
        </button>
        <button
          class={`tab-button ${activeTab() === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
          aria-selected={activeTab() === "settings"}
        >
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </nav>

      <main>
        <Show when={activeTab() === "overview"}>
          <div class="overview-tab">
            <div class="today-summary">
              <h2>Today's Usage</h2>
              <div class="usage-chart">
                <div class="chart-placeholder">
                  <i class="fas fa-chart-pie fa-3x"></i>
                </div>
              </div>
              <div class="time-summary">
                <div class="time-item">
                  <span class="time-label">Total Time</span>
                  <span class="time-value">1h 45m</span>
                </div>
                <div class="time-item">
                  <span class="time-label">Remaining</span>
                  <span class="time-value">2h 15m</span>
                </div>
              </div>
            </div>

            <div class="platform-summary">
              <h3>Top Platforms</h3>
              <ul class="platform-list">
                <Show when={!platforms.loading} fallback={<div class="loading">Loading platforms...</div>}>
                  <For each={platforms()?.slice(0, 3) || []}>
                    {(platform) => (
                      <li class="platform-item">
                        <div class="platform-icon">
                          <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`}></i>
                        </div>
                        <div class="platform-details">
                          <span class="platform-name">{platform.name}</span>
                          <div class="progress-container">
                            <div class="progress-bar" style={{ width: "45%" }}></div>
                          </div>
                          <div class="platform-time">
                            <span>
                              45m / {platform.timeLimit.hours}h {platform.timeLimit.minutes}m
                            </span>
                          </div>
                        </div>
                      </li>
                    )}
                  </For>
                </Show>
              </ul>
            </div>
          </div>
        </Show>

        <Show when={activeTab() === "platforms"}>
          <div class="platforms-tab">
            <div class="platforms-header">
              <h2>Manage Platforms</h2>
              <Button variant="primary" class="add-platform-btn">
                <i class="fas fa-plus"></i> Add Platform
              </Button>
            </div>

            <ul class="platform-list full">
              <Show when={!platforms.loading} fallback={<div class="loading">Loading platforms...</div>}>
                <For each={platforms() || []}>
                  {(platform) => (
                    <li class="platform-item with-actions">
                      <div class="platform-icon">
                        <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`}></i>
                      </div>
                      <div class="platform-details">
                        <span class="platform-name">{platform.name}</span>
                        <div class="platform-time-limit">
                          <span>
                            Limit: {platform.timeLimit.hours}h {platform.timeLimit.minutes}m
                          </span>
                        </div>
                      </div>
                      <div class="platform-actions">
                        <button class="action-button edit">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-button delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </li>
                  )}
                </For>
              </Show>
            </ul>
          </div>
        </Show>

        <Show when={activeTab() === "settings"}>
          <div class="settings-tab">
            <h2>Settings</h2>

            <div class="settings-group">
              <h3>Notifications</h3>
              <div class="setting-item">
                <span>Enable notifications</span>
                <label class="toggle">
                  <input type="checkbox" checked />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="setting-item">
                <span>Warning at 80% of limit</span>
                <label class="toggle">
                  <input type="checkbox" checked />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="settings-group">
              <h3>Blocking</h3>
              <div class="setting-item">
                <span>Hard block when limit reached</span>
                <label class="toggle">
                  <input type="checkbox" />
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="setting-item">
                <span>Allow 5 minute grace period</span>
                <label class="toggle">
                  <input type="checkbox" checked />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="settings-group">
              <h3>Data</h3>
              <Button variant="outline" class="data-button">
                Export Data
              </Button>
              <Button variant="outline" class="data-button">
                Reset Statistics
              </Button>
            </div>
          </div>
        </Show>
      </main>

      <footer>
        <Button variant="secondary" class="open-options-button" onClick={() => chrome.runtime.openOptionsPage()}>
          Advanced Options
        </Button>
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

const root = document.getElementById("extension-container")
render(App, root as HTMLElement)
