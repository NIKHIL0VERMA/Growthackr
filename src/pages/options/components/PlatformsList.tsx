import { For } from "solid-js";
import { Platform } from "@src/pages/background/types/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export interface PlatformListProps {
    platforms: Platform[],
    isSelected: (platfrom: Platform) => boolean,
    onSelect: (platform: Platform) => void
  }

export const PlatformList = (props : PlatformListProps) => {
    return (
        <div class="platforms">
            <For each={props.platforms}>
                {(platform) => (
                    <button
                        class={`platform-button ${props.isSelected(platform) ? "selected" : ""}`}
                        onClick={() => props.onSelect(platform)}
                        aria-pressed={props.isSelected(platform)}
                    >
                        <div class="platform-icon-wrapper">
                            <FontAwesomeIcon icon = {platform.icon || faGlobe} class="platform-icon" />
                        </div>
                        <span class="platform-button-text">{platform.name}</span>
                    </button>
                )}
            </For>
        </div>
    )
};