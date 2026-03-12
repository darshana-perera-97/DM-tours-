# Thank You Page - Google Review Redirect

A fully responsive thanking page that automatically redirects users to Google Reviews after 5 seconds.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Beautiful animated UI with checkmark animation
- ✅ 5-second countdown timer
- ✅ Progress bar visualization
- ✅ Automatic redirect to Google Reviews
- ✅ Manual navigation button (appears after countdown)
- ✅ Smooth animations and transitions

## Setup

1. **Update the Google Review URL** in `script.js`:
   ```javascript
   const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/place/YOUR_BUSINESS_NAME';
   ```
   Replace `YOUR_BUSINESS_NAME` with your actual Google Review URL.

2. **Open the page**:
   - Simply open `index.html` in a web browser, or
   - Serve it using a local web server

## How to Get Your Google Review URL

1. Go to Google Maps
2. Search for your business
3. Click on "Write a review"
4. Copy the URL from the address bar
5. Replace the URL in `script.js`

## Customization

- **Colors**: Edit the gradient colors in `styles.css` (lines with `#667eea` and `#764ba2`)
- **Countdown time**: Change the `countdown` variable in `script.js` (default: 5 seconds)
- **Text content**: Edit the HTML content in `index.html`

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## File Structure

```
review/
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # Countdown and redirect logic
└── README.md       # This file
```

