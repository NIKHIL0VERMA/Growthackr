import { createSignal, onCleanup, createEffect } from "solid-js";

const [isBlocked, setIsBlocked] = createSignal(false);
const originalContent = document.body.innerHTML;

console.log("content is attached to the chrome");

const blockSite = () => {
  if (document.getElementById('growthackr-blocking-message')) return; // Prevent duplicate blocking message

  const blockingMessage = document.createElement('div');
  blockingMessage.id = 'growthackr-blocking-message';
  blockingMessage.innerHTML = `
    <h1>Time's Up!</h1>
    <p>You've reached your daily limit for this site.</p>
    <p>Try again tomorrow or adjust your limits in the extension settings.</p>
    <button id="growthackr-close-btn">Close</button>
  `;

  // Style the blocking message
  const styles = `
    #growthackr-blocking-message {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999999;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    #growthackr-blocking-message h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
    }
    #growthackr-blocking-message p {
      font-size: 1.2em;
      margin-bottom: 10px;
    }
    #growthackr-close-btn {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 1em;
      cursor: pointer;
    }
  `;

  // Add styles to the document
  const styleElement = document.createElement('style');
  styleElement.id = 'growthackr-styles'; // Unique ID for cleanup
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  // Replace the body content with the blocking message
  document.body.innerHTML = '';
  document.body.appendChild(blockingMessage);

  // Add event listener to the close button
  document.getElementById('growthackr-close-btn')?.addEventListener('click', () => {
    // Restore the original content when the close button is clicked
    document.body.innerHTML = originalContent;
    document.head.removeChild(styleElement); // Cleanup styles
    setIsBlocked(false);
  });
};

// Listener for incoming messages
const listener = (request) => {
  if (request.action === "blockSite" && !isBlocked()) {
    console.log("listner added");
    setIsBlocked(true);
    blockSite();
  }
};

chrome.runtime.onMessage.addListener(listener);

onCleanup(() => {
  // Clean up the listener when the component is unmounted
  chrome.runtime.onMessage.removeListener(listener);
});
