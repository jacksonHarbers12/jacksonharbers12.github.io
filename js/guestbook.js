/* Guestbook functionality for 90s-themed blog */

document.addEventListener('DOMContentLoaded', () => {
  initGuestbook();
});

function initGuestbook() {
  const guestbookForm = document.getElementById('guestbook-form');
  
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', handleGuestbookSubmit);
    loadGuestbookEntries();
  }
}

function handleGuestbookSubmit(event) {
  event.preventDefault();
  
  // Get form values
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  
  if (!nameInput || !messageInput) return;
  
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  
  // Validate inputs
  if (name === '' || message === '') {
    alert('Please fill in all fields!');
    return;
  }
  
  // Add the new entry
  addGuestbookEntry(name, message);
  
  // Clear the form
  nameInput.value = '';
  messageInput.value = '';
  
  // Show success message
  alert('Thanks for signing my guestbook!');
}

function addGuestbookEntry(name, message) {
  // Get existing entries from localStorage
  let entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
  
  // Add new entry
  const newEntry = {
    name: name,
    message: message,
    date: new Date().toLocaleDateString(),
    id: Date.now() // unique ID based on timestamp
  };
  
  entries.unshift(newEntry); // Add to the beginning
  
  // Limit to 20 entries
  if (entries.length > 20) {
    entries = entries.slice(0, 20);
  }
  
  // Save to localStorage
  localStorage.setItem('guestbookEntries', JSON.stringify(entries));
  
  // Refresh the displayed entries
  displayGuestbookEntries(entries);
}

function loadGuestbookEntries() {
  // Get entries from localStorage
  const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
  
  // Display entries
  displayGuestbookEntries(entries);
}

function displayGuestbookEntries(entries) {
  const entriesContainer = document.querySelector('.guestbook-entries');
  if (!entriesContainer) return;
  
  // Clear existing entries
  entriesContainer.innerHTML = '';
  
  // If no entries yet, show a message
  if (entries.length === 0) {
    entriesContainer.innerHTML = '<p>No entries yet. Be the first to sign my guestbook!</p>';
    return;
  }
  
  // Add entries to the container
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('guestbook-entry');
    
    entryElement.innerHTML = `
      <span class="entry-name">${sanitizeHTML(entry.name)}</span>
      <span class="entry-date">${entry.date}</span>
      <p>${sanitizeHTML(entry.message)}</p>
    `;
    
    entriesContainer.appendChild(entryElement);
  });
}

// Helper function to sanitize HTML and prevent XSS
function sanitizeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}