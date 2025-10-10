# SMTP Configuration Instructions for DM Tours Sri Lanka

## Setup Instructions

### 1. Update SMTP Settings in send_email.php

Edit the `$smtp_config` array in `send_email.php` with your email provider details:

```php
$smtp_config = [
    'host' => 'smtp.gmail.com',        // Your SMTP server
    'port' => 587,                     // SMTP port (587 for TLS, 465 for SSL)
    'username' => 'your-email@gmail.com',  // Your email address
    'password' => 'your-app-password',     // Your app password (not regular password)
    'encryption' => 'tls'              // 'tls' or 'ssl'
];
```

### 2. Common Email Provider Settings

#### Gmail
- Host: smtp.gmail.com
- Port: 587 (TLS) or 465 (SSL)
- Username: your-email@gmail.com
- Password: App Password (not your regular password)
- Encryption: tls or ssl

#### Outlook/Hotmail
- Host: smtp-mail.outlook.com
- Port: 587
- Username: your-email@outlook.com
- Password: Your password
- Encryption: tls

#### Yahoo
- Host: smtp.mail.yahoo.com
- Port: 587 or 465
- Username: your-email@yahoo.com
- Password: App Password
- Encryption: tls or ssl

### 3. Gmail App Password Setup

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Factor Authentication if not already enabled
4. Go to App passwords
5. Generate a new app password for "Mail"
6. Use this app password in the PHP script (not your regular password)

### 4. Update Email Addresses

In `send_email.php`, update these variables:
- `$to_email`: Your business email where contact form submissions will be sent
- `$from_email`: Should match your SMTP username
- `$from_name`: Your business name

### 5. Server Requirements

Make sure your web server has:
- PHP 7.0 or higher
- OpenSSL extension enabled
- Socket support enabled

### 6. Optional: Install PHPMailer

For better email delivery and features, install PHPMailer:

```bash
composer require phpmailer/phpmailer
```

Or download PHPMailer manually and include it in your project.

### 7. Testing

1. Upload both files to your web server
2. Test the contact form
3. Check your email for the submission
4. Check the customer's email for the auto-reply

### 8. Security Notes

- Never commit SMTP credentials to version control
- Use environment variables for sensitive data in production
- Consider using a dedicated email service like SendGrid or Mailgun for better deliverability
- Implement rate limiting to prevent spam

### 9. Troubleshooting

Common issues:
- "Authentication failed": Check username/password
- "Connection refused": Check host/port settings
- "SSL/TLS error": Check encryption settings
- Emails going to spam: Configure SPF, DKIM, and DMARC records

### 10. File Permissions

Ensure the following files are writable by the web server:
- contact_log.txt (for logging submissions)
- error_log.txt (for logging errors)

```bash
chmod 666 contact_log.txt error_log.txt
```
