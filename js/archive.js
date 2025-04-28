/* Archive functionality for 90s-themed blog */

document.addEventListener('DOMContentLoaded', () => {
  initArchivePage();
});

function initArchivePage() {
  // Set up year navigation buttons
  const yearButtons = document.querySelectorAll('.year-btn');
  
  if (yearButtons.length > 0) {
    // Set the first year as active by default
    const defaultYear = yearButtons[0].getAttribute('data-year');
    showYearPosts(defaultYear);
    
    // Add click handlers to all year buttons
    yearButtons.forEach(button => {
      button.addEventListener('click', () => {
        const year = button.getAttribute('data-year');
        showYearPosts(year);
        
        // Update active button styling
        yearButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
    
    // Set the first button as active
    yearButtons[0].classList.add('active');
  }
  
  // Handle category filter from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (category) {
    filterByCategory(category);
  }
}

function showYearPosts(year) {
  // Hide all year sections
  const allYearSections = document.querySelectorAll('.archive-posts');
  allYearSections.forEach(section => {
    section.style.display = 'none';
  });
  
  // Show the selected year
  const selectedYear = document.getElementById(`archive-${year}`);
  if (selectedYear) {
    selectedYear.style.display = 'block';
    
    // Add a retro effect when changing years
    selectedYear.style.opacity = '0';
    selectedYear.classList.add('sliding-bg');
    
    setTimeout(() => {
      selectedYear.style.transition = 'opacity 0.5s ease';
      selectedYear.style.opacity = '1';
      
      setTimeout(() => {
        selectedYear.classList.remove('sliding-bg');
      }, 1000);
    }, 50);
  }
}

function filterByCategory(category) {
  const allRows = document.querySelectorAll('.archive-table tr');
  const categoryTitle = document.createElement('h3');
  categoryTitle.textContent = `Showing posts in category: ${category}`;
  categoryTitle.style.color = 'var(--color-accent)';
  
  // Remove any existing category title
  const existingTitle = document.querySelector('.category-filter-title');
  if (existingTitle) {
    existingTitle.remove();
  }
  
  categoryTitle.classList.add('category-filter-title');
  
  // Get the first year section (which should be visible)
  const visibleSection = document.querySelector('.archive-posts[style="display: block"]') || 
                        document.querySelector('.archive-posts');
  
  if (visibleSection) {
    visibleSection.insertBefore(categoryTitle, visibleSection.querySelector('table'));
  }
  
  // Filter the visible rows
  allRows.forEach(row => {
    if (row.querySelector('th')) {
      // Skip header row
      return;
    }
    
    const categoryCell = row.cells[2]; // Assuming category is the 3rd column
    if (categoryCell && categoryCell.textContent.toLowerCase() === category.toLowerCase()) {
      row.style.display = '';
      row.classList.add('highlight-row');
    } else {
      row.style.display = 'none';
    }
  });
  
  // Add a clear filter button
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear Filter';
  clearButton.classList.add('clear-filter-btn');
  clearButton.addEventListener('click', () => {
    // Remove the filter
    window.location.href = window.location.pathname;
  });
  
  if (visibleSection && !document.querySelector('.clear-filter-btn')) {
    visibleSection.insertBefore(clearButton, visibleSection.querySelector('table'));
  }
}

// Add a random "last updated" date to each post
function addRandomDates() {
  // This is just for the demo - in a real blog you'd use actual dates
  const dateElements = document.querySelectorAll('.archive-table td:first-child');
  
  dateElements.forEach(dateEl => {
    const originalDate = dateEl.textContent;
    
    // If hovering, show a "last modified" date
    dateEl.addEventListener('mouseenter', () => {
      dateEl.setAttribute('data-original', originalDate);
      dateEl.textContent = `Modified: ${getRandomPastDate()}`;
      dateEl.style.color = 'var(--color-accent)';
    });
    
    dateEl.addEventListener('mouseleave', () => {
      dateEl.textContent = dateEl.getAttribute('data-original');
      dateEl.style.color = '';
    });
  });
}

// Helper to generate random past dates
function getRandomPastDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30) + 1;
  const randomDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  return randomDate.toLocaleDateString();
}

// Call to add random dates
addRandomDates();