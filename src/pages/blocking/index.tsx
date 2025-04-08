export const blockSite = () => {
    // Check if message already exists
    const existingMessage = document.getElementById('growthackr-blocking-message');
    if (existingMessage) {
        return;
    }

    // Create and inject CSS with enhanced styles
    const styles = `
        #growthackr-blocking-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(8px);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999999;
            font-family: 'Segoe UI', 'Arial', sans-serif;
            text-align: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        #growthackr-blocking-message.visible {
            opacity: 1;
        }

        .blocking-card {
            background-color: #1a1a1a;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            overflow: visible;
        }

        .logo-container {
            margin-bottom: 20px;
            position: relative;
        }

        #blocking-logo {
            width: 100px;
            height: 100px;
            border-radius: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        #growthackr-blocking-message h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #9C6CAE;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        #growthackr-blocking-message p {
            font-size: 1.2rem;
            margin-bottom: 15px;
            line-height: 1.6;
            color: #f1f1f1;
            max-width: 100%;
        }

        #growthackr-blocking-message p:last-of-type {
            font-size: 1rem;
            color: #b0b0b0;
            margin-bottom: 30px;
        }

        .button-container {
            display: flex;
            gap: 15px;
            margin-top: 20px;
            justify-content: center;
        }

        .dismiss-button, .settings-button {
            padding: 12px 24px;
            border-radius: 30px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10000000;
            position: relative;
        }

        .dismiss-button {
            background-color: #9C6CAE;
            color: white;
            border: none;
        }

        .dismiss-button:hover {
            background-color: #8a5c9c;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(156, 108, 174, 0.4);
        }

        .settings-button {
            background-color: transparent;
            color: #9C6CAE;
            border: 2px solid #9C6CAE;
        }

        .settings-button:hover {
            background-color: rgba(156, 108, 174, 0.1);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(156, 108, 174, 0.2);
        }

        .quote-text {
            font-style: italic;
            margin-top: 10px;
            color: #b0b0b0;
        }

        @media (max-width: 600px) {
            .blocking-card {
                padding: 30px 20px;
            }
            
            #blocking-logo {
                width: 80px;
                height: 80px;
            }
            
            #growthackr-blocking-message h1 {
                font-size: 2rem;
            }
            
            #growthackr-blocking-message p {
                font-size: 1rem;
            }
            
            .button-container {
                flex-direction: column;
                width: 100%;
            }
            
            .dismiss-button,
            .settings-button {
                width: 100%;
                margin-bottom: 10px;
            }
        }
    `;

    // Create and inject the stylesheet
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Create the main container
    const blockingMessage = document.createElement('div');
    blockingMessage.id = 'growthackr-blocking-message';

    // Create the card container
    const blockingCard = document.createElement('div');
    blockingCard.className = 'blocking-card';

    // Create the logo
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    
    const logoImage = document.createElement('img');
    logoImage.src = chrome.runtime.getURL('/icons/128x128.png');
    logoImage.alt = "Site is blocked";
    logoImage.id = 'blocking-logo';
    
    logoContainer.appendChild(logoImage);

    // Create the content
    const title = document.createElement('h1');
    title.textContent = "Time's Up!";

    const message1 = document.createElement('p');
    message1.textContent = "You've reached your daily limit for this site.";

    const message2 = document.createElement('p');
    message2.textContent = "Try again tomorrow or adjust your limits in the extension settings.";

    // Add motivational quote
    const quotes = [
        "Great job on managing your screen time!",
        "Take a break and do something you enjoy offline.",
        "Time away from screens is good for your wellbeing.",
        "You've made a positive choice for your digital health.",
        "Step away from the screen and into the world.",
        "Your future self will thank you for this break."
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteElement = document.createElement('p');
    quoteElement.textContent = randomQuote;
    quoteElement.className = 'quote-text';

    // Create the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Create dismiss button (simplified)
    const dismissButton = document.createElement('button');
    dismissButton.className = 'dismiss-button';
    dismissButton.textContent = 'Close Tab';
    
    // Create settings button (simplified)
    const settingsButton = document.createElement('button');
    settingsButton.className = 'settings-button';
    settingsButton.textContent = 'Adjust Limits';

    // Add buttons to container
    buttonContainer.appendChild(dismissButton);
    buttonContainer.appendChild(settingsButton);

    // Assemble the card
    blockingCard.appendChild(logoContainer);
    blockingCard.appendChild(title);
    blockingCard.appendChild(message1);
    blockingCard.appendChild(message2);
    blockingCard.appendChild(quoteElement);
    blockingCard.appendChild(buttonContainer);

    // Add the card to the main container
    blockingMessage.appendChild(blockingCard);

    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';

    // Add to the document
    document.body.appendChild(blockingMessage);

    // Add event listeners AFTER adding to DOM
    dismissButton.addEventListener('click', function() {
        blockingMessage.style.opacity = '0';
        setTimeout(() => {
            chrome.runtime.sendMessage({ action: "closeTab" });
        }, 300);
    });

    settingsButton.addEventListener('click', function() {
        blockingMessage.style.opacity = '0';
        setTimeout(() => {
            chrome.runtime.sendMessage({ action: "openOptions" });
            chrome.runtime.sendMessage({ action: "closeTab" });
        }, 300);
    });

    // Trigger entrance animation
    setTimeout(() => {
        blockingMessage.classList.add('visible');
    }, 10);

    // Add escape key listener
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            dismissButton.click();
            window.removeEventListener('keydown', handleKeyDown);
        }
    };
    
    window.addEventListener('keydown', handleKeyDown);
};