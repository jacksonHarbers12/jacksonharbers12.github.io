/* Visitor Counter for 90s-themed blog */

document.addEventListener('DOMContentLoaded', () => {
  initVisitorCounter();
});

function initVisitorCounter() {
  // Check if we've saved a count in localStorage
  let visitorCount = localStorage.getItem('visitorCount');
  
  if (!visitorCount) {
    // First time visitor - set a random starting number
    visitorCount = 1337 + Math.floor(Math.random() * 50);
    localStorage.setItem('visitorCount', visitorCount);
  } else {
    // Returning visitor - increment the count
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
  }
  
  // Update the counter display
  updateCounterDisplay(visitorCount);
  
  // Also update hit counter in footer if it exists
  updateHitCounter();
}

function updateCounterDisplay(count) {
  const visitorCountElement = document.getElementById('visitor-count');
  if (visitorCountElement) {
    visitorCountElement.textContent = count;
    
    // Add a blinking effect momentarily
    visitorCountElement.classList.add('blink');
    setTimeout(() => {
      visitorCountElement.classList.remove('blink');
    }, 2000);
  }
}

function updateHitCounter() {
  const hitCountElement = document.getElementById('hit-count');
  if (hitCountElement) {
    // Get or set hit count from localStorage
    let hitCount = localStorage.getItem('hitCount');
    
    if (!hitCount) {
      hitCount = 42069;
    } else {
      hitCount = parseInt(hitCount) + 1;
    }
    
    localStorage.setItem('hitCount', hitCount);
    hitCountElement.textContent = hitCount;
  }
}

// Set an interval to randomly increment the counter for a more "alive" feel
setInterval(() => {
  let visitorCount = parseInt(localStorage.getItem('visitorCount') || 1337);
  
  // Small random increment
  if (Math.random() > 0.7) {
    visitorCount += 1;
    localStorage.setItem('visitorCount', visitorCount);
    updateCounterDisplay(visitorCount);
  }
}, 30000);