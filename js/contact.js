// Toggle contact form visibility
function toggleContactForm() {
    const contactContent = document.getElementById('contactContent');
    contactContent.classList.toggle('active');
}

// Handle email form submission
function sendEmail(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const recipientEmail = 'haarishks2020@gmail.com';
    const subject = 'Portfolio Contact Form Submission';
    
    // Create mailto link with pre-filled content
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Clear form
    document.getElementById('emailForm').reset();
    
    // Close contact form
    document.getElementById('contactContent').classList.remove('active');
} 