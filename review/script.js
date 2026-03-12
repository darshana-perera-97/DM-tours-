// Configuration - Update this with your actual Google Review URL
const GOOGLE_REVIEW_URL = 'https://g.page/r/Cfj-Jk5E1sKTEBM/review'; // Replace with your actual Google Review URL

// Get elements
const countdownElement = document.getElementById('countdown');
const progressFill = document.getElementById('progressFill');
const reviewLink = document.getElementById('reviewLink');

let countdown = 5;
let intervalId;

// Function to update countdown and progress
function updateCountdown() {
    countdownElement.textContent = countdown;
    progressFill.style.width = ((5 - countdown) / 5 * 100) + '%';
    
    if (countdown <= 0) {
        clearInterval(intervalId);
        redirectToReview();
    } else {
        countdown--;
    }
}

// Function to redirect to Google Review page
function redirectToReview() {
    // Set the href attribute
    reviewLink.href = GOOGLE_REVIEW_URL;
    
    // Show the button briefly, then redirect
    reviewLink.style.display = 'inline-block';
    
    // Redirect after a brief moment
    setTimeout(() => {
        window.location.href = GOOGLE_REVIEW_URL;
    }, 500);
}

// Start the countdown when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Set initial progress
    progressFill.style.width = '0%';
    
    // Start countdown interval (updates every second)
    intervalId = setInterval(updateCountdown, 1000);
    
    // Initial update
    updateCountdown();
});

// Allow manual navigation if user clicks the button
reviewLink.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(intervalId);
    window.location.href = GOOGLE_REVIEW_URL;
});

