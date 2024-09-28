import { render } from "solid-js/web";
import { createSignal, onCleanup } from "solid-js";

const BlockSite = () => {
  const [isBlocked, setIsBlocked] = createSignal(false);
  const originalContent = document.body.innerHTML;

  const blockSite = () => {
    const blockingMessage = document.createElement('div');
    blockingMessage.id = 'grothackr-blocking-message';
    blockingMessage.innerHTML = `
      <h1>Time's Up!</h1>
      <p>You've reached your daily limit for this site.</p>
      <p>Try again tomorrow or adjust your limits in the extension settings.</p>
      <button id="grothackr-close-btn">Close</button>
    `;

    // Style the blocking message
    const styles = `
      #grothackr-blocking-message {
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
      #grothackr-blocking-message h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
      }
      #grothackr-blocking-message p {
        font-size: 1.2em;
        margin-bottom: 10px;
      }
      #grothackr-close-btn {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 1em;
        cursor: pointer;
      }
    `;

    // Add styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Replace the body content with the blocking message
    document.body.innerHTML = '';
    document.body.appendChild(blockingMessage);

    // Add event listener to the close button
    document.getElementById('grothackr-close-btn')?.addEventListener('click', () => {
      // Restore the original content when the close button is clicked
      document.body.innerHTML = originalContent;
      setIsBlocked(false);
    });
  };

  const listener = (request) => {
    if (request.action === "blockSite" && !isBlocked()) {
      setIsBlocked(true);
      blockSite();
    }
  };

  chrome.runtime.onMessage.addListener(listener);

  onCleanup(() => {
    // Clean up the listener when the component is unmounted
    chrome.runtime.onMessage.removeListener(listener);
  });

  return null; // This component does not render anything itself
};

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

// Wrap the JSX in a function to resolve the type error
render( BlockSite, root);
