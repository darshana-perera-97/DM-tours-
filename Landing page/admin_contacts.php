<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Submissions - DM Tours Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .admin-header {
            background: linear-gradient(135deg, #142328 0%, #2c3e50 100%);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
        }
        .submission-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 1rem;
            transition: transform 0.2s;
        }
        .submission-card:hover {
            transform: translateY(-2px);
        }
        .status-badge {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
        }
        .contact-info {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
            margin: 0.5rem 0;
        }
        .message-content {
            background: #e9ecef;
            padding: 1rem;
            border-radius: 5px;
            border-left: 4px solid #06C167;
        }
    </style>
</head>
<body>
    <div class="admin-header">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1><i class="fas fa-envelope me-3"></i>Contact Form Submissions</h1>
                    <p class="mb-0">DM Tours Sri Lanka - Admin Panel</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Recent Submissions</h2>
                    <div>
                        <a href="submissions/contact_summary.csv" class="btn btn-success me-2" download>
                            <i class="fas fa-download me-2"></i>Download CSV
                        </a>
                        <button class="btn btn-primary" onclick="location.reload()">
                            <i class="fas fa-refresh me-2"></i>Refresh
                        </button>
                    </div>
                </div>

                <?php
                $submissions_dir = 'submissions';
                $submissions = [];

                if (is_dir($submissions_dir)) {
                    $files = glob($submissions_dir . '/contact_*.json');
                    
                    // Sort by modification time (newest first)
                    usort($files, function($a, $b) {
                        return filemtime($b) - filemtime($a);
                    });

                    foreach ($files as $file) {
                        $content = file_get_contents($file);
                        $data = json_decode($content, true);
                        if ($data) {
                            $data['filename'] = basename($file);
                            $submissions[] = $data;
                        }
                    }
                }

                if (empty($submissions)) {
                    echo '<div class="alert alert-info">No contact submissions found.</div>';
                } else {
                    foreach ($submissions as $submission) {
                        $status_class = $submission['status'] === 'new' ? 'bg-success' : 'bg-secondary';
                        ?>
                        <div class="submission-card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                            <h5 class="card-title mb-0">
                                                <i class="fas fa-user me-2"></i><?php echo htmlspecialchars($submission['name']); ?>
                                            </h5>
                                            <span class="badge <?php echo $status_class; ?> status-badge">
                                                <?php echo ucfirst($submission['status']); ?>
                                            </span>
                                        </div>
                                        
                                        <div class="contact-info">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <strong><i class="fas fa-envelope me-2"></i>Email:</strong><br>
                                                    <a href="mailto:<?php echo htmlspecialchars($submission['email']); ?>">
                                                        <?php echo htmlspecialchars($submission['email']); ?>
                                                    </a>
                                                </div>
                                                <div class="col-md-6">
                                                    <strong><i class="fas fa-phone me-2"></i>Phone:</strong><br>
                                                    <?php echo htmlspecialchars($submission['phone']); ?>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <strong><i class="fas fa-globe me-2"></i>Country:</strong><br>
                                                    <?php echo htmlspecialchars($submission['country']); ?>
                                                </div>
                                                <div class="col-md-6">
                                                    <strong><i class="fas fa-tag me-2"></i>Subject:</strong><br>
                                                    <?php echo htmlspecialchars($submission['subject']); ?>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="message-content mt-3">
                                            <strong><i class="fas fa-comment me-2"></i>Message:</strong><br>
                                            <?php echo nl2br(htmlspecialchars($submission['message'])); ?>
                                        </div>

                                        <?php if ($submission['travel_start'] !== 'Not specified' || $submission['travel_end'] !== 'Not specified'): ?>
                                        <div class="mt-3">
                                            <strong><i class="fas fa-calendar me-2"></i>Travel Details:</strong><br>
                                            <small class="text-muted">
                                                Dates: <?php echo htmlspecialchars($submission['travel_start']); ?> to <?php echo htmlspecialchars($submission['travel_end']); ?><br>
                                                Travelers: <?php echo htmlspecialchars($submission['travelers']); ?><br>
                                                Newsletter: <?php echo htmlspecialchars($submission['newsletter']); ?>
                                            </small>
                                        </div>
                                        <?php endif; ?>
                                    </div>
                                    
                                    <div class="col-md-4">
                                        <div class="text-end">
                                            <small class="text-muted">
                                                <i class="fas fa-clock me-1"></i><?php echo htmlspecialchars($submission['timestamp']); ?><br>
                                                <i class="fas fa-file me-1"></i><?php echo htmlspecialchars($submission['filename']); ?><br>
                                                <i class="fas fa-globe me-1"></i><?php echo htmlspecialchars($submission['ip_address']); ?><br>
                                                <?php if (isset($submission['external_status'])): ?>
                                                    <i class="fas fa-cloud me-1"></i>
                                                    <span class="badge <?php echo $submission['external_status'] === 'sent' ? 'bg-success' : 'bg-danger'; ?>">
                                                        External API: <?php echo strtoupper($submission['external_status']); ?>
                                                    </span>
                                                <?php endif; ?>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                }
                ?>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
