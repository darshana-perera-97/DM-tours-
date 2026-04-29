POST https://www.api.dmtours.lk/custom/contactForm

{
  "recipientNumbers": ["94771461925", "94778808689"],
  "load": {
    "name": "John",
    "email": "john@example.com",
    "message": "Security inquiry"
  }
}

recipientNumbers: array of WhatsApp numbers (same format as ['94771461925', '94778808689'])
payload or load: any JSON object you want to send

alidates that recipientNumbers has at least one number
Converts the JSON payload to a formatted message
Sends it to each number in the array
Returns success response with recipients + payload


------
https://www.api.dmtours.lk/security/contactForm is a POST API for security inquiries with a minimal payload.

Endpoint
POST /security/contactForm
Request body (required fields)
name (string)
email (string)
contact_number (string)
message (string)
Also accepted for contact number:

contactNumber or phone (mapped internally to contact_number)
Validation
If any required field is missing/empty, response is:
400 Bad Request
{ success: false, message: "name, email, contact_number and message are required" }
What it does
Logs the submission.
Formats a WhatsApp alert with:
Date/time
Name
Email
Contact Number
Message
Sends that message to configured SECURITY_CONTACT_RECIPIENTS.
Success response
200 OK
JSON:
success: true
message: "Security contact form submitted successfully"
data: { name, email, contact_number, message, ... } (sanitized payload used by API)
Example request

{
  "name": "John Doe",
  "email": "john@example.com",
  "contact_number": "+94 77 123 4567",
  "message": "Need information about security services."
}