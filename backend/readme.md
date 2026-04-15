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