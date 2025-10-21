<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'country', 'subject', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    exit;
}

// Prepare contact data
$contact_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
    'name' => trim($input['firstName'] . ' ' . $input['lastName']),
    'email' => $input['email'],
    'phone' => $input['phone'] ?? 'Not provided',
    'country' => ucfirst($input['country']),
    'subject' => ucfirst(str_replace('-', ' ', $input['subject'])),
    'message' => $input['message'],
    'travel_start' => $input['travelStart'] ?? 'Not specified',
    'travel_end' => $input['travelEnd'] ?? 'Not specified',
    'travelers' => $input['travelers'] ?? 'Not specified',
    'newsletter' => isset($input['newsletter']) ? 'Yes' : 'No',
    'status' => 'new'
];

try {
    // Send data to external endpoint
    $external_endpoint = 'http://69.197.187.24:3056/dm-tors/contactform';
    $external_success = false;
    $external_error = '';
    
    try {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $external_endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contact_data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curl_error = curl_error($ch);
        curl_close($ch);
        
        if ($curl_error) {
            $external_error = 'CURL Error: ' . $curl_error;
        } elseif ($http_code >= 200 && $http_code < 300) {
            $external_success = true;
            $contact_data['external_status'] = 'sent';
            $contact_data['external_response'] = $response;
            $contact_data['external_http_code'] = $http_code;
        } else {
            $external_error = 'HTTP Error: ' . $http_code . ' - ' . $response;
            $contact_data['external_status'] = 'failed';
            $contact_data['external_error'] = $external_error;
        }
        
    } catch (Exception $e) {
        $external_error = 'Exception: ' . $e->getMessage();
        $contact_data['external_status'] = 'error';
        $contact_data['external_error'] = $external_error;
    }
    
    // Log external API attempt
    $api_log_entry = date('Y-m-d H:i:s') . " - External API call to {$external_endpoint}: " . 
                     ($external_success ? 'SUCCESS' : 'FAILED') . 
                     ($external_error ? " - {$external_error}" : '') . "\n";
    file_put_contents('contact_log.txt', $api_log_entry, FILE_APPEND | LOCK_EX);
    
    // Create submissions directory if it doesn't exist
    $submissions_dir = 'submissions';
    if (!is_dir($submissions_dir)) {
        mkdir($submissions_dir, 0755, true);
    }
    
    // Generate unique filename with timestamp
    $filename = 'contact_' . date('Y-m-d_H-i-s') . '_' . uniqid() . '.json';
    $filepath = $submissions_dir . '/' . $filename;
    
    // Save contact data to JSON file (including external API response)
    $json_data = json_encode($contact_data, JSON_PRETTY_PRINT);
    file_put_contents($filepath, $json_data, LOCK_EX);
    
    // Also append to a simple log file for easy reading
    $log_entry = sprintf(
        "[%s] New Contact Form Submission\n" .
        "Name: %s\n" .
        "Email: %s\n" .
        "Phone: %s\n" .
        "Country: %s\n" .
        "Subject: %s\n" .
        "Travel Dates: %s to %s\n" .
        "Travelers: %s\n" .
        "Newsletter: %s\n" .
        "Message: %s\n" .
        "IP: %s\n" .
        "External API: %s\n" .
        "File: %s\n" .
        "---\n\n",
        $contact_data['timestamp'],
        $contact_data['name'],
        $contact_data['email'],
        $contact_data['phone'],
        $contact_data['country'],
        $contact_data['subject'],
        $contact_data['travel_start'],
        $contact_data['travel_end'],
        $contact_data['travelers'],
        $contact_data['newsletter'],
        $contact_data['message'],
        $contact_data['ip_address'],
        $external_success ? 'SUCCESS' : 'FAILED' . ($external_error ? ' - ' . $external_error : ''),
        $filename
    );
    
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    // Create a summary CSV file for easy data analysis
    $csv_file = 'submissions/contact_summary.csv';
    $csv_header = "Date,Name,Email,Phone,Country,Subject,Travel_Start,Travel_End,Travelers,Newsletter,Status,External_API,File\n";
    
    // Add header if file doesn't exist
    if (!file_exists($csv_file)) {
        file_put_contents($csv_file, $csv_header, LOCK_EX);
    }
    
    // Add new entry to CSV
    $csv_entry = sprintf(
        '"%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s","%s"' . "\n",
        $contact_data['timestamp'],
        $contact_data['name'],
        $contact_data['email'],
        $contact_data['phone'],
        $contact_data['country'],
        $contact_data['subject'],
        $contact_data['travel_start'],
        $contact_data['travel_end'],
        $contact_data['travelers'],
        $contact_data['newsletter'],
        $contact_data['status'],
        $external_success ? 'SUCCESS' : 'FAILED',
        $filename
    );
    
    file_put_contents($csv_file, $csv_entry, FILE_APPEND | LOCK_EX);
    
    // Return success response
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! We have received your inquiry and will get back to you within 24 hours.',
        'submission_id' => $filename
    ]);
    
} catch (Exception $e) {
    // Log the error
    $error_log = date('Y-m-d H:i:s') . " - Contact form error: " . $e->getMessage() . "\n";
    file_put_contents('error_log.txt', $error_log, FILE_APPEND | LOCK_EX);
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'There was an error processing your request. Please try again or contact us directly.'
    ]);
}
?>
