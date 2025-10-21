# Contact Form System - DM Tours Sri Lanka

## Overview
This system handles contact form submissions by saving them to files instead of sending emails via SMTP. This approach is more reliable and doesn't require email server configuration.

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
