# Contact Form System - DM Tours Sri Lanka

## Overview
This system handles contact form submissions by saving them to files instead of sending emails via SMTP. This approach is more reliable and doesn't require email server configuration.

## How to Submit Data in the Contact Form

### Accessing the Contact Form
1. Navigate to the contact page: `contact.html` (or `yoursite.com/contact.html`)
2. The contact form is displayed in the main content area

### Step-by-Step Instructions

#### Step 1: Fill in Personal Information
- **First Name** (Required): Enter your first name
- **Last Name** (Required): Enter your last name
- **Email Address** (Required): Enter a valid email address where we can reach you
  - Format: `name@example.com`
  - The system validates email format automatically
- **Phone Number** (Optional): Enter your phone number with country code if available
  - Example: `+94 77 880 8689` or `+1 234 567 8900`

#### Step 2: Select Your Location
- **Country** (Required): Select your country from the dropdown menu
  - Options include: USA, UK, Canada, Australia, Germany, France, India, China, Japan, Singapore, Malaysia, Thailand, or Other

#### Step 3: Choose Subject
- **Subject** (Required): Select the purpose of your inquiry from the dropdown:
  - **Tour Inquiry**: General questions about tours
  - **Make a Booking**: Ready to book a tour
  - **Custom Tour Request**: Want a personalized itinerary
  - **Pricing Information**: Questions about tour prices
  - **Partnership Opportunity**: Business partnership inquiries
  - **Feedback & Suggestions**: Share your feedback
  - **Other**: Any other inquiries

#### Step 4: Write Your Message
- **Message** (Required): Provide details about your inquiry
  - Include information about:
    - Your travel interests
    - Specific questions or requirements
    - Any special needs or preferences
    - Budget considerations (if applicable)
  - Minimum: A few sentences describing your needs

#### Step 5: Travel Details (Optional but Recommended)
- **Preferred Travel Dates**:
  - **Start Date**: Select your preferred arrival date
  - **End Date**: Select your preferred departure date
  - Note: End date must be after start date
- **Number of Travelers**: Select from the dropdown:
  - 1 person
  - 2 people
  - 3-5 people
  - 6-10 people
  - More than 10 people

#### Step 6: Newsletter Subscription (Optional)
- Check the box if you want to receive:
  - Travel tips
  - Special offers
  - Newsletter updates

#### Step 7: Submit the Form
1. Review all your information
2. Click the **"Send Message"** button
3. Wait for the confirmation message (usually appears within a few seconds)

### What Happens After Submission

1. **Immediate Feedback**:
   - You'll see a success message: "Thank you for your message! We have received your inquiry and will get back to you within 24 hours."
   - The form will reset automatically
   - If there are errors, you'll see specific error messages

2. **Processing**:
   - Your data is validated on the server
   - Data is sent to the external API endpoint
   - A unique submission file is created
   - Your inquiry is logged in the system

3. **Response Time**:
   - You can expect a response within 24 hours
   - For urgent matters, use the emergency contact: **+94 77 880 8689**

### Tips for Best Results

1. **Be Specific**: The more details you provide, the better we can assist you
   - Include preferred travel dates if known
   - Mention specific interests (beaches, wildlife, culture, etc.)
   - Note any special requirements (dietary, accessibility, etc.)

2. **Required Fields**: Make sure all required fields (marked with *) are filled
   - First Name
   - Last Name
   - Email Address
   - Country
   - Subject
   - Message

3. **Email Validation**: Ensure your email address is correct and active
   - Check for typos
   - Use an email you check regularly

4. **Travel Dates**: If you have flexible dates, mention it in your message
   - Example: "Flexible between March and May 2025"

5. **Multiple Inquiries**: If you have multiple questions, it's better to:
   - Include all questions in one message, OR
   - Submit separate forms for different topics

### Form Validation

The form includes automatic validation:
- **Email format**: Must be a valid email address
- **Date validation**: End date must be after start date
- **Required fields**: Cannot be left empty
- **Real-time feedback**: Fields show validation status as you type

### Troubleshooting Submission Issues

If you encounter problems submitting the form:

1. **Check Required Fields**: Ensure all required fields are filled
2. **Email Format**: Verify your email address is correctly formatted
3. **Date Range**: Make sure end date is after start date
4. **Browser Console**: Check browser console (F12) for JavaScript errors
5. **Network Connection**: Ensure you have a stable internet connection
6. **Try Again**: Wait a moment and try submitting again

### Privacy and Security

- All form data is securely processed
- Your information is stored safely
- IP addresses are logged for security purposes
- Data is sent to the external API securely via HTTPS
- See our Privacy Policy for more details

## Files Structure

### Core Files
- `contact_handler.php` - Main handler for processing contact form submissions
- `admin_contacts.php` - Admin panel to view submitted contact forms
- `contact.html` - Contact form (updated to use new handler)

### Generated Files
- `submissions/` - Directory containing individual submission files
- `submissions/contact_summary.csv` - CSV file with all submissions for easy analysis
- `contact_log.txt` - Human-readable log of all submissions
- `error_log.txt` - Error log for debugging

## How It Works

### 1. Form Submission
When a user submits the contact form:
1. Data is validated on the server
2. **Data is sent to external API** at `http://69.197.187.24:3056/dm-tors/contactform` via POST
3. A unique JSON file is created in the `submissions/` directory (including API response)
4. Entry is added to the CSV summary file (including API status)
5. Entry is logged in the human-readable log file (including API status)
6. Success response is sent to the user

### 2. Data Storage
Each submission creates:
- **Individual JSON file**: `contact_YYYY-MM-DD_HH-MM-SS_uniqueid.json`
- **CSV entry**: Added to `contact_summary.csv` for spreadsheet analysis
- **Log entry**: Added to `contact_log.txt` for easy reading

### 3. Admin Access
- Visit `admin_contacts.php` to view all submissions
- Download CSV file for data analysis
- View detailed information for each submission

## File Formats

### JSON File Structure
```json
{
    "timestamp": "2025-01-01 12:00:00",
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "country": "United States",
    "subject": "Tour Inquiry",
    "message": "I'm interested in...",
    "travel_start": "2025-03-01",
    "travel_end": "2025-03-15",
    "travelers": "2",
    "newsletter": "Yes",
    "status": "new",
    "external_status": "sent",
    "external_response": "API response data",
    "external_http_code": 200
}
```

### CSV Columns
- Date, Name, Email, Phone, Country, Subject, Travel_Start, Travel_End, Travelers, Newsletter, Status, External_API, File

## Benefits

### Advantages over SMTP
1. **No email server dependency** - Works on any hosting environment
2. **No delivery issues** - Data is always saved locally
3. **No spam filters** - Submissions are never blocked
4. **Better reliability** - No network or server issues
5. **Easy backup** - Simple file-based storage
6. **Data analysis** - CSV format for easy spreadsheet analysis

### Security Features
1. **Input validation** - All form data is validated
2. **File permissions** - Proper file system permissions
3. **Error handling** - Graceful error handling and logging
4. **IP tracking** - IP addresses are logged for security

## Setup Instructions

### 1. File Permissions
Ensure the web server can write to the directory:
```bash
chmod 755 submissions/
chmod 666 contact_log.txt
chmod 666 error_log.txt
```

### 2. Directory Structure
```
/
├── contact_handler.php
├── admin_contacts.php
├── contact.html
├── submissions/
│   ├── contact_2025-01-01_12-00-00_abc123.json
│   ├── contact_2025-01-01_12-05-00_def456.json
│   └── contact_summary.csv
├── contact_log.txt
└── error_log.txt
```

### 3. Admin Access
- Visit `yoursite.com/admin_contacts.php` to view submissions
- Bookmark this URL for easy access
- Consider adding basic authentication for security

## Maintenance

### Regular Tasks
1. **Monitor disk space** - Submissions will accumulate over time
2. **Backup files** - Regularly backup the `submissions/` directory
3. **Review logs** - Check `error_log.txt` for any issues
4. **Archive old data** - Move old submissions to archive if needed

### Data Export
- Use the CSV file for data analysis in Excel/Google Sheets
- JSON files can be imported into databases if needed
- Log files provide human-readable format for quick review

## Troubleshooting

### Common Issues
1. **Permission errors** - Check file/directory permissions
2. **Directory not created** - Ensure web server can create directories
3. **Form not submitting** - Check JavaScript console for errors
4. **No data saved** - Check `error_log.txt` for PHP errors

### Debug Mode
Add this to the top of `contact_handler.php` for debugging:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Security Considerations

1. **Admin panel access** - Consider adding authentication to `admin_contacts.php`
2. **File permissions** - Ensure only web server can write to submission files
3. **Input sanitization** - All user input is properly sanitized
4. **Rate limiting** - Consider adding rate limiting to prevent spam

## Migration from SMTP

This system replaces the previous SMTP-based email system:
- ✅ Removed: `send_email.php`, `SMTP_SETUP_INSTRUCTIONS.md`
- ✅ Updated: `contact.html` to use new handler
- ✅ Added: File-based logging and admin panel

The new system is more reliable and doesn't require email server configuration.
