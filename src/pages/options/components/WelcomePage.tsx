import { createSignal, For, onMount } from "solid-js";
import { Input } from "@src/components/Input";
import { Button } from "@src/components/Button";
import { ThemeSwitch } from "@src/components/ThemeSwitch";
import GetStartedButton from "@src/components/GetStartedButton";
import '@pages/options/styles/WelcomePage.css';

// Import SVG images
import facebookImg from "@assets/img/facebook.svg";
import youtubeImg from "@assets/img/youtube.svg";
import instagramImg from "@assets/img/instagram.svg";
import xImg from "@assets/img/x.svg";
import tiktokImg from "@assets/img/tiktok.svg";
import snapchatImg from "@assets/img/snapchat.svg";
import editIcon from "@assets/img/edit.svg";
import deleteIcon from "@assets/img/delete.svg";
import plusIcon from "@assets/img/plus.svg";

const popularPlatforms = [
  { name: "Facebook", url: "facebook.com", img: facebookImg },
  { name: "YouTube", url: "youtube.com", img: youtubeImg },
  { name: "Instagram", url: "instagram.com", img: instagramImg },
  { name: "X", url: "x.com", img: xImg },
  { name: "TikTok", url: "tiktok.com", img: tiktokImg },
  { name: "Snapchat", url: "snapchat.com", img: snapchatImg },
];

export function WelcomePage({ onComplete }) {
  const [selectedPlatforms, setSelectedPlatforms] = createSignal([]);
  const [customUrl, setCustomUrl] = createSignal("");
  const [error, setError] = createSignal("");
  const [editIndex, setEditIndex] = createSignal(-1);
  const [editUrl, setEditUrl] = createSignal("");

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", "i" // fragment locator
    );
    return !!urlPattern.test(url);
  };

  const addCustomUrl = () => {
    if (customUrl() && validateUrl(customUrl())) {
      if (!selectedPlatforms().find((p) => p.url === customUrl())) {
        setSelectedPlatforms((prev) => [...prev, { name: customUrl(), url: customUrl() }]);
        setCustomUrl("");
        setError("");
      }
    } else {
      setError("Please enter a valid URL.");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUrl(selectedPlatforms()[index].url);
  };

  const saveEdit = (index) => {
    if (validateUrl(editUrl())) {
      const updatedPlatforms = [...selectedPlatforms()];
      updatedPlatforms[index] = { ...updatedPlatforms[index], url: editUrl() };
      setSelectedPlatforms(updatedPlatforms);
      setEditIndex(-1);
      setEditUrl("");
    } else {
      setError("Please enter a valid URL.");
    }
  };

  const deletePlatform = (index) => {
    setSelectedPlatforms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    onComplete(selectedPlatforms());
  };

  onMount(() => {
    document.title = "Welcome to Growthackr";
  });
  
  return (
    <div class="welcome-page">
      <header>
        <h2 class="title">Welcome to Growthackr</h2>
        <ThemeSwitch />
      </header>
      <div class="content">
        <div class="right-section">
          <p class="description">Select the platforms you want to track:</p>
          <div class="platforms">
            <For each={popularPlatforms}>
              {(platform) => (
                <Button
                  variant={selectedPlatforms().includes(platform) ? "primary" : "outline"}
                  onClick={() => togglePlatform(platform)}
                  class={`platform-button ${selectedPlatforms().includes(platform) ? "selected" : ""}`}
                  aria-pressed={selectedPlatforms().includes(platform)}
                >
                  <img src={platform.img} alt={`${platform.name} logo`} class="platform-icon" />
                  {platform.name}
                </Button>
              )}
            </For>
          </div>
        </div>
        <div class="left-section">
          <p class="description">Selected platforms:</p>
          <ul class="selected-list">
            <For each={selectedPlatforms()}>
              {(platform, index) => (
                <li class="selected-item">
                  <span class="platform-name">{platform.name}</span>
                  <div class="icon-container">
                    <img
                      src={editIcon}
                      alt={`Edit ${platform.name}`}
                      class="icon"
                      onClick={() => handleEdit(index())}
                      aria-label={`Edit ${platform.name}`}
                    />
                    <img
                      src={deleteIcon}
                      alt={`Delete ${platform.name}`}
                      class="icon"
                      onClick={() => deletePlatform(index())}
                      aria-label={`Delete ${platform.name}`}
                    />
                  </div>
                  {editIndex() === index() && (
                    <div>
                      <Input
                        type="text"
                        value={editUrl()}
                        onInput={(e) => setEditUrl(e.target.value)}
                        aria-label={`Edit URL for ${platform.name}`}
                      />
                      <Button onClick={() => saveEdit(index())} aria-label="Save changes">
                        Save
                      </Button>
                    </div>
                  )}
                </li>
              )}
            </For>
            <div class="input-group">
              <Input
                type="text"
                placeholder="Enter URL (e.g., example.com)"
                value={customUrl()}
                onInput={(e) => setCustomUrl(e.target.value)}
                class="url-input"
                aria-label="Custom URL"
              />
              <Button onClick={addCustomUrl} class="add-button">
                <img src={plusIcon} alt="Add" class="plus-icon" />
              </Button>
            </div>
            {error() && <p class="error-message">{error()}</p>}
          </ul>
        </div>
      </div>
      <GetStartedButton onClick={handleComplete} />
    </div>
  );
}
