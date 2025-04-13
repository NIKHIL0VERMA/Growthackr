/**
 * Blocks the current site by displaying an overlay message
 * that prevents further interaction with the site.
 */
export const blockSite = () => {
    // Check if message already exists
    const existingMessage = document.getElementById("g-blocking-message")
    if (existingMessage) {
      return
    }
  
    // inject css files
    const blockingStyle = document.createElement("link")
    blockingStyle.rel = "stylesheet"
    blockingStyle.href = chrome.runtime.getURL("/styles/blocking.css")
    document.head.appendChild(blockingStyle)

    // Create the main container
    const blockingMessage = document.createElement("div")
    blockingMessage.id = "g-blocking-message"
    blockingMessage.setAttribute("role", "dialog")
    blockingMessage.setAttribute("aria-modal", "true")
    blockingMessage.setAttribute("aria-labelledby", "g-blocking-title")
    blockingMessage.setAttribute("aria-describedby", "g-blocking-description")
  
    // Create the logo
    const logoContainer = document.createElement("div")
    logoContainer.className = "g-logo-container"
  
    const logoImage = document.createElement("img")
    logoImage.src = chrome.runtime.getURL("/icons/128x128.png")
    logoImage.alt = "Growthackr logo"
    logoImage.className = "g-blocking-logo"
  
    logoContainer.appendChild(logoImage)
  
    // Create the content
    const title = document.createElement("h1")
    title.textContent = "Time's Up!"
    title.className = "g-blocking-title"
  
    const message1 = document.createElement("p")
    message1.textContent = "You've reached your daily limit for this site."
    message1.className = "g-blocking-description"
  
    const message2 = document.createElement("p")
    message2.textContent = "Try again tomorrow or adjust your limits in the extension settings."
  
    // Add time remaining if available
    const timeRemaining = document.createElement("div")
    timeRemaining.className = "g-time-remaining"
  
    // Get the current time and reset time (midnight)
    const now = new Date()
    const resetTime = new Date(now)
    resetTime.setHours(24, 0, 0, 0) // Set to midnight
  
    // Calculate time until reset
    const timeUntilReset = resetTime.getTime() - now.getTime()
    const hoursLeft = Math.floor(timeUntilReset / (1000 * 60 * 60))
    const minutesLeft = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60))
  
    timeRemaining.innerHTML = `Time until reset: <span class="g-time-value">${hoursLeft}h ${minutesLeft}m</span>`
  
    // Add motivational quote
    const quotes = [
      "Great job on managing your screen time!",
      "Take a break and do something you enjoy offline.",
      "Time away from screens is good for your wellbeing.",
      "You've made a positive choice for your digital health.",
      "Step away from the screen and into the world.",
      "Your future self will thank you for this break.",
    ]
  
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const quoteElement = document.createElement("p")
    quoteElement.textContent = randomQuote
    quoteElement.className = "g-quote-text"
  
    // Create the buttons
    const buttonContainer = document.createElement("div")
    buttonContainer.className = "g-button-container"
  
    // Create dismiss button
    const dismissButton = document.createElement("button")
    dismissButton.className = "g-dismiss-button"
    dismissButton.textContent = "Close Tab"
    dismissButton.setAttribute("aria-label", "Close this tab")
  
    // Create settings button
    const settingsButton = document.createElement("button")
    settingsButton.className = "g-settings-button"
    settingsButton.textContent = "Adjust Limits"
    settingsButton.setAttribute("aria-label", "Open settings to adjust time limits")
  
    // Add buttons to container
    buttonContainer.appendChild(dismissButton)
    buttonContainer.appendChild(settingsButton)
  
    // Assemble the card
    blockingMessage.appendChild(logoContainer)
    blockingMessage.appendChild(title)
    blockingMessage.appendChild(message1)
    blockingMessage.appendChild(message2)
    blockingMessage.appendChild(timeRemaining)
    blockingMessage.appendChild(quoteElement)
    blockingMessage.appendChild(buttonContainer)
  
    // Prevent scrolling on the body
    document.body.style.overflow = "hidden"
  
    // Add to the document
    document.body.appendChild(blockingMessage)
  
    // Add event listeners AFTER adding to DOM
    dismissButton.addEventListener("click", () => {
      blockingMessage.style.opacity = "0"
      setTimeout(() => {
        chrome.runtime.sendMessage({ action: "closeTab" })
      }, 300)
    })
    const optionsUrl = chrome.runtime.getURL("src/pages/options/index.html");
    settingsButton.addEventListener("click", () => {
      blockingMessage.style.opacity = "0"
      setTimeout(() => {
        chrome.runtime.sendMessage({ action: "closeTab" });
        window.open(optionsUrl, '_blank').focus();
      }, 300)
    })
  
    // Add escape key listener
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dismissButton.click()
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  
    window.addEventListener("keydown", handleKeyDown)
  }