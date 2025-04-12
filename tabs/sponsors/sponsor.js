document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation behavior
    initNavigation();
    
    // Initialize sponsor card animations
    initSponsorCards();
    
    // Setup the contact form
    initContactForm();
    
    // Apply animations to sections when they come into view
    initSectionAnimations();
});

// Navigation behavior (scrolling effects, active states)
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    const buttonNav = document.querySelector('.button-nav');
    
    // Handle scroll to change navigation background
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            buttonNav.classList.add('scrolled');
        } else {
            buttonNav.classList.remove('scrolled');
        }
    });
    
    // Trigger scroll event initially to set correct state
    window.dispatchEvent(new Event('scroll'));
    
    // Handle navigation button clicks for smooth scrolling
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for same-page links (starting with #)
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                // Get the target element
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update active button
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

// Animate sponsor cards with hover effects and staggered reveals
function initSponsorCards() {
    const sponsorCards = document.querySelectorAll('.sponsor-card');
    
    // Add staggered reveal animation
    sponsorCards.forEach((card, index) => {
        // Set initial state (slightly faded and translated down)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Add transition properties
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Create observer for this card
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger the animation based on index
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100); // 100ms delay between each card
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 }); // Trigger when at least 10% of the card is visible
        
        // Start observing
        observer.observe(card);
    });
    
    // Add hover effects for partnership cards
    const partnershipCards = document.querySelectorAll('.partnership-card');
    partnershipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });
}

// Handle contact form submission
function initContactForm() {
    const form = document.getElementById('sponsor-inquiry-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formDataObj = {};
            let interests = [];
            
            formData.forEach((value, key) => {
                // Handle checkboxes (multiple values with same name)
                if (key === 'interest') {
                    interests.push(value);
                } else {
                    formDataObj[key] = value;
                }
            });
            
            // Add interests array to the form data object
            formDataObj.interests = interests;
            
            // Construct email body
            const emailSubject = 'Sponsorship Inquiry from ' + formDataObj.name;
            let emailBody = `
Name: ${formDataObj.name}
Organization: ${formDataObj.organization}
Email: ${formDataObj.email}
Phone: ${formDataObj.phone || 'Not provided'}

Interests: ${interests.join(', ')}

Message:
${formDataObj.message}
            `;
            
            // Encode the email body for mailto link
            emailBody = encodeURIComponent(emailBody);
            
            // Display confirmation message
            form.innerHTML = `
                <div class="form-success">
                    <h3>Thank you for your interest!</h3>
                    <p>Click the button below to open your email client and send your inquiry:</p>
                    <a href="mailto:darpa-triage@cmu.edu?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}" class="submit-btn" id="send-email-btn">Send Email</a>
                    <p class="form-note">If the button doesn't work, please contact us directly at 
                    <a href="mailto:darpa-triage@cmu.edu">darpa-triage@cmu.edu</a>.</p>
                </div>
            `;
            
            // Automatically click the send email button
            document.getElementById('send-email-btn').click();
            
            console.log('Form submission data:', formDataObj);
        });
    }
}

// Animate sections as they come into view
function initSectionAnimations() {
    const sections = document.querySelectorAll('.current-sponsors-section, .sponsorship-section, .partnership-section, .contact-section');
    
    sections.forEach(section => {
        // Set initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate in when section comes into view
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.1 }); // Trigger when at least 10% of the section is visible
        
        // Start observing
        observer.observe(section);
    });
    
    // Animate the sponsor tier titles with a special effect
    const tierTitles = document.querySelectorAll('.tier-title');
    
    tierTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-20px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateX(0)';
                    observer.unobserve(title);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
}