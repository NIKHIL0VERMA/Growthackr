import { createSignal, For } from 'solid-js'
import '@pages/options/styles/optionPage.css'
import facebookImg from "@assets/img/facebook.svg";
import youtubeImg from "@assets/img/youtube.svg";
import instagramImg from "@assets/img/instagram.svg";
import xImg from "@assets/img/x.svg";
import tiktokImg from "@assets/img/tiktok.svg";
import snapchatImg from "@assets/img/snapchat.svg";
import { Button } from '@src/components/Button';
import { Input } from '@src/components/Input';
import { ThemeSwitch } from '@src/components/ThemeSwitch'

export function OptionsPage() {
  const platforms = [
    { name: "Facebook", url: "facebook.com", img: facebookImg },
    { name: "YouTube", url: "youtube.com", img: youtubeImg },
    { name: "Instagram", url: "instagram.com", img: instagramImg },
    { name: "X", url: "x.com", img: xImg },
    { name: "TikTok", url: "tiktok.com", img: tiktokImg },
    { name: "Snapchat", url: "snapchat.com", img: snapchatImg },
  ];

    const [selectedPlatform, setSelectedPlatform] = createSignal(null);
    const [hours, setHours] = createSignal(0);
    const [minutes, setMinutes] = createSignal(0);

    const handlePlatformSelect = (platform) => {
        if (selectedPlatform() === platform) {
            // Deselect if already selected
            setSelectedPlatform(null);
            setHours(0);
            setMinutes(0);
        } else {
            // Select a new platform
            setSelectedPlatform(platform);
            setHours(0); // Reset hours
            setMinutes(0); // Reset minutes
        }
    };

    const saveSettings = () => {
        console.log('Saving settings:', {
            platform: selectedPlatform(),
            hours: hours(),
            minutes: minutes(),
        });
        // Here you can store the values in local storage or any other method
        setSelectedPlatform(null); // Deselect after saving
    };

    return (
        <div class="options-page">
          <ThemeSwitch/>
            <div class="right-section">
                <h2>Select Platforms</h2>
                <div class="platforms">
                    <For each={platforms}>
                        {(platform) => (
                            <Button
                                variant={selectedPlatform() === platform.name ? "primary" : "outline"}
                                onClick={() => handlePlatformSelect(platform.name)}
                                class={`platform-button ${selectedPlatform() === platform.name ? "selected" : ""}`}
                                aria-pressed={selectedPlatform() === platform.name}
                            >
                                <img src={platform.img} alt={`${platform.name} logo`} class="platform-icon" />
                                {platform.name}
                            </Button>
                        )}
                    </For>
                </div>
            </div>
            <div class="left-section">
                <h2>Set Daily Time Limits</h2>
                {selectedPlatform() && (
                    <div class="input-card">
                        <h3>For {selectedPlatform()}</h3>
                        <div class="time-input">
                            <label for="hours-input">Hours</label>
                            <Input
                                id="hours-input"
                                type="number"
                                min="0"
                                max="23"
                                value={hours()}
                                onInput={(e) => setHours(parseInt(e.target.value))}
                                placeholder="Hours"
                                aria-label="Hours"
                            />
                            <label for="minutes-input">Minutes</label>
                            <Input
                                id="minutes-input"
                                type="number"
                                min="0"
                                max="59"
                                value={minutes()}
                                onInput={(e) => setMinutes(parseInt(e.target.value))}
                                placeholder="Minutes"
                                aria-label="Minutes"
                            />
                        </div>
                        <div class="button-group">
                            <Button onClick={saveSettings}>Save</Button>
                            <Button onClick={() => handlePlatformSelect(selectedPlatform())}>Cancel</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}