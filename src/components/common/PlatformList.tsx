import { For, Show } from "solid-js"
import type { Platform } from "@src/pages/background/types/storage"

export interface PlatformListProps {
  platforms: Platform[]
  isSelected: (platform: Platform) => boolean
  onSelect: (platform: Platform) => void
  variant?: "default" | "compact" | "dashboard"
  showTimeLimit?: boolean
  showActions?: boolean
  onEdit?: (platform: Platform) => void
  onDelete?: (platform: Platform) => void
  maxHeight?: string
  emptyMessage?: string
  loading?: boolean
}

export const PlatformList = (props: PlatformListProps) => {
  const variant = props.variant || "default"
  const showTimeLimit = props.showTimeLimit !== undefined ? props.showTimeLimit : false
  const showActions = props.showActions !== undefined ? props.showActions : false
  const maxHeight = props.maxHeight || "400px"
  const emptyMessage = props.emptyMessage || "No platforms available"

  return (
    <div
      class={`platform-list-container ${variant}`}
      style={{ "max-height": maxHeight }}
      role="listbox"
      aria-multiselectable={variant !== "dashboard"}
    >
      <Show
        when={!props.loading}
        fallback={
          <div class="platform-list-loading" aria-live="polite">
            <div class="loading-spinner" aria-hidden="true"></div>
            <span>Loading platforms...</span>
          </div>
        }
      >
        <Show
          when={props.platforms && props.platforms.length > 0}
          fallback={
            <div class="platform-list-empty" aria-live="polite">
              <p>{emptyMessage}</p>
            </div>
          }
        >
          <div class="platform-list" role="group">
            <For each={props.platforms}>
              {(platform) => (
                <div
                  class={`platform-item ${variant} ${props.isSelected(platform) ? "selected" : ""}`}
                  onClick={() => props.onSelect(platform)}
                  role={variant !== "dashboard" ? "option" : undefined}
                  aria-selected={variant !== "dashboard" ? props.isSelected(platform) : undefined}
                  tabindex="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      props.onSelect(platform)
                    }
                  }}
                >
                  <div class="platform-item-content">
                    <div class="platform-icon-wrapper">
                      <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon} platform-icon`}></i>
                    </div>
                    <div class="platform-details">
                      <span class="platform-name">{platform.name}</span>
                      {showTimeLimit && (
                        <span class="platform-time-limit">
                          {platform.timeLimit.hours}h {platform.timeLimit.minutes}m
                        </span>
                      )}
                    </div>
                  </div>

                  {showActions && (
                    <div class="platform-actions">
                      <button
                        class="action-button edit"
                        onClick={(e) => {
                          e.stopPropagation()
                          props.onEdit && props.onEdit(platform)
                        }}
                        aria-label={`Edit ${platform.name}`}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="action-button delete"
                        onClick={(e) => {
                          e.stopPropagation()
                          props.onDelete && props.onDelete(platform)
                        }}
                        aria-label={`Delete ${platform.name}`}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </div>
  )
}
