/* Main JavaScript functionality for 90s-themed blog */

// Start the retro experience
document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to My 90s Blog! 📟');
  initCursorEffect();
  initRetroEffects();
});

// Custom cursor effect
function initCursorEffect() {
  // For a future implementation of custom cursor
  console.log('Custom cursor initialized');
}

// Initialize various retro effects
function initRetroEffects() {
  // Add glitch effect to logo occasionally
  setInterval(() => {
    const logo = document.getElementById('logo');
    if (logo) {
      logo.classList.add('glitch');
      logo.setAttribute('data-text', logo.innerText);
      
      setTimeout(() => {
        logo.classList.remove('glitch');
      }, 1500);
    }
  }, 10000);
  
  // Make all links have a hover sound (could be implemented with actual sound)
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      console.log('Link hover sound would play here');
      // Uncomment to add sound in the future
      // const hoverSound = new Audio('/sounds/hover.wav');
      // hoverSound.volume = 0.2;
      // hoverSound.play();
    });
  });
  
  // Initialize the visitor counter with a random increment
  incrementVisitorCounter();
}

// Increment the visitor counter
function incrementVisitorCounter() {
  const visitorCount = document.getElementById('visitor-count');
  const hitCount = document.getElementById('hit-count');
  
  if (visitorCount) {
    // Get current count
    let count = parseInt(visitorCount.textContent) || 1337;
    
    // Add a random number between 1 and 5
    count += Math.floor(Math.random() * 5) + 1;
    
    // Update the counter
    visitorCount.textContent = count;
  }
  
  if (hitCount) {
    // Get current count
    let count = parseInt(hitCount.textContent) || 42069;
    
    // Add a random number between 1 and 3
    count += Math.floor(Math.random() * 3) + 1;
    
    // Update the counter
    hitCount.textContent = count;
  }
}

// Add a "last updated" timestamp to the footer
function addLastUpdated() {
  const footer = document.querySelector('footer');
  if (footer) {
    const lastUpdated = document.createElement('p');
    lastUpdated.textContent = `Last updated: ${new Date().toLocaleDateString()}`;
    lastUpdated.style.fontSize = '0.8em';
    lastUpdated.style.marginTop = '8px';
    footer.appendChild(lastUpdated);
  }
}

// Call last updated function
addLastUpdated();