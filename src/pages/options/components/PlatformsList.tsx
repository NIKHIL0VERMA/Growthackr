import { For } from "solid-js";
import { Platform } from "@src/pages/background/types/storage";

export interface PlatformListProps {
    platforms: Platform[],
    isSelected: (platfrom: Platform) => boolean,
    onSelect: (platform: Platform) => void
  }

export const PlatformList = (props : PlatformListProps) => {
    return (
        <div class="platforms-list">
            <For each={props.platforms}>
                {(platform) => (
                    <button
                        class={`platform-button ${props.isSelected(platform) ? "selected" : ""}`}
                        onClick={() => props.onSelect(platform)}
                        aria-pressed={props.isSelected(platform)}
                    >
                        <div class="platform-icon-wrapper">
                            <i class={`${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon} platform-icon`} />
                        </div>
                        <span class="platform-button-text">{platform.name}</span>
                    </button>
                )}
            </For>
        </div>
    )
};