export const blockSite = () => {
    const existingMessage = document.getElementById('growthackr-blocking-message');
    if (existingMessage) {
        return;
    }

    const blockingMessage = document.createElement('div');
    blockingMessage.id = 'growthackr-blocking-message';

    const logoImage = document.createElement('img');
    logoImage.src = chrome.runtime.getURL('/icons/128x128.png');
    logoImage.alt = "Site is blocked";
    logoImage.id = 'blocking-logo';

    const dismissButton = document.createElement('button');
    dismissButton.classList.add('dismiss-button');
    dismissButton.textContent = 'Dismiss';
    dismissButton.onclick = () => {
        chrome.runtime.sendMessage({ action: "closeTab" });
    };

    blockingMessage.innerHTML = `
        <div class="logo-container">${logoImage.outerHTML}</div>
        <h1>Time's Up!</h1>
        <p>You've reached your daily limit for this site.</p>
        <p>Try again tomorrow or adjust your limits in the extension settings.</p>
    `;

    blockingMessage.appendChild(dismissButton);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('styles/blocking.css');
    document.head.appendChild(link);

    document.body.appendChild(blockingMessage);
}
