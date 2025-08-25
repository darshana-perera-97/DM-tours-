// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Initialize Application
function initApp() {
    // Add smooth scrolling to navigation links
    addSmoothScrolling();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Add navbar background on scroll
    addNavbarScrollEffect();
    
    // Add destination card interactions
    addDestinationInteractions();
}

// Smooth Scrolling for Navigation
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.destination-card, .about-image, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar Background Effect on Scroll
function addNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-dark', 'shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
}

// Destination Card Interactions
function addDestinationInteractions() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact Form Initialization
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        addFormValidation();
    }
}

// Form Validation
function addFormValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

// Validate Individual Field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    if (value) {
        field.classList.add('is-valid');
    }
    
    return true;
}

// Clear Validation
function clearValidation(e) {
    const field = e.target;
    field.classList.remove('is-valid', 'is-invalid');
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        inputs.forEach(input => input.classList.remove('is-valid'));
        
    }, 2000);
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

// Remove Notification
function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Button Click Functions
function exploreDestinations() {
    const destinationsSection = document.querySelector('#destinations');
    if (destinationsSection) {
        destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function contactUs() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showDestination(type) {
    const destinations = {
        mountains: {
            title: 'Mountain Adventures',
            description: 'Experience the thrill of mountain climbing, hiking, and breathtaking views.',
            activities: ['Hiking', 'Climbing', 'Camping', 'Photography']
        },
        beaches: {
            title: 'Beach Getaways',
            description: 'Relax on pristine beaches with crystal clear waters and golden sands.',
            activities: ['Swimming', 'Snorkeling', 'Sunbathing', 'Water Sports']
        },
        cities: {
            title: 'City Tours',
            description: 'Discover vibrant cities with rich history, culture, and modern attractions.',
            activities: ['Sightseeing', 'Museums', 'Shopping', 'Local Cuisine']
        }
    };
    
    const destination = destinations[type];
    if (destination) {
        showDestinationModal(destination);
    }
}

// Show Service Information
function showService(type) {
    const services = {
        packages: {
            title: 'Expertly Curated Sri Lanka Packages',
            description: 'From luxury holidays to adventure travel, every itinerary captures the diverse charm of Sri Lanka.',
            features: ['Luxury Accommodations', 'Adventure Tours', 'Cultural Experiences', 'Custom Itineraries']
        },
        experiences: {
            title: 'Authentic Sri Lanka Experiences',
            description: 'Immerse yourself in rich culture, stunning wildlife safaris, and breathtaking scenery.',
            features: ['Wildlife Safaris', 'Cultural Tours', 'Scenic Landscapes', 'Local Traditions']
        },
        tours: {
            title: 'Tailored Sri Lanka Tours',
            description: 'Customizable adventures that fit your interests and pace for foreign travelers.',
            features: ['Personalized Planning', 'Flexible Schedules', 'Expert Guides', 'Local Insights']
        },
        support: {
            title: '24/7 Worldwide Customer Support',
            description: 'Seamless travel planning for global travelers with round-the-clock customer support.',
            features: ['24/7 Availability', 'Multi-language Support', 'Global Coverage', 'Instant Assistance']
        }
    };
    
    const service = services[type];
    if (service) {
        showServiceModal(service);
    }
}

// Show Destination Modal
function showDestinationModal(destination) {
    // Remove existing modal
    const existingModal = document.querySelector('.destination-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'destination-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${destination.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${destination.description}</p>
                    <h5>Popular Activities:</h5>
                    <ul>
                        ${destination.activities.map(activity => `<li>${activity}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="bookDestination('${destination.title}')">
                        Book This Destination
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
    `;
    
    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #dee2e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const body = modal.querySelector('.modal-body');
    body.style.cssText = `
        padding: 20px;
    `;
    
    const footer = modal.querySelector('.modal-footer');
    footer.style.cssText = `
        padding: 20px;
        border-top: 1px solid #dee2e6;
        text-align: center;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    closeBtn.addEventListener('click', () => removeModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            removeModal(modal);
        }
    });
    
    // Add keydown listener for ESC key
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            removeModal(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Remove Modal
function removeModal(modal) {
    const content = modal.querySelector('.modal-content');
    content.style.animation = 'modalSlideOut 0.3s ease';
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Book Destination
function bookDestination(destinationName) {
    showNotification(`Thank you for your interest in ${destinationName}! Our team will contact you soon.`, 'success');
    
    // Close modal
    const modal = document.querySelector('.destination-modal');
    if (modal) {
        removeModal(modal);
    }
}

// Show Service Modal
function showServiceModal(service) {
    // Remove existing modal
    const existingModal = document.querySelector('.service-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${service.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${service.description}</p>
                    <h5>Key Features:</h5>
                    <ul>
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="contactUs()">
                        Contact Us for More Info
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 15px;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
    `;
    
    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #dee2e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const body = modal.querySelector('.modal-body');
    body.style.cssText = `
        padding: 20px;
    `;
    
    const footer = modal.querySelector('.modal-footer');
    footer.style.cssText = `
        padding: 20px;
        border-top: 1px solid #dee2e6;
        text-align: center;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    closeBtn.addEventListener('click', () => removeModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            removeModal(modal);
        }
    });
    
    // Add keydown listener for ESC key
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            removeModal(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Add CSS animations for modal
const style = document.createElement('style');
style.textContent = `
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyle); 