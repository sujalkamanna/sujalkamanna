// email.js

// Your EmailJS configuration (get these from EmailJS dashboard)
const emailConfig = {
    serviceID: 'YOUR_SERVICE_ID', // Example: 'gmail'
    templateID: 'YOUR_TEMPLATE_ID', // Example: 'template_abc123'
    userID: 'YOUR_PUBLIC_KEY' // Example: 'user_abc123'
};

// Initialize EmailJS
(function() {
    emailjs.init(emailConfig.userID);
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Prepare template parameters
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            to_name: 'Sujal Kamanna'
        };

        // Send email
        emailjs.send(
            emailConfig.serviceID, 
            emailConfig.templateID, 
            templateParams
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully!', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        });
    });
});

// Notification function
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}