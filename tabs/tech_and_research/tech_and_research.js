document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for sections when content is visible
    function initSectionAnimations() {
        // Target all sections that should have animations
        const animatedSections = document.querySelectorAll(
            '.core-tech-section, .research-pillars-section, .publications-section, .projects-section, .process-section'
        );
        
        // Create observer for sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when at least 10% of the section is visible
        
        // Observe each section
        animatedSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Animate individual tech cards with hover effects
    function initTechCardEffects() {
        const techCards = document.querySelectorAll('.tech-card');
        
        techCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add more pronounced animation on hover
                this.style.transform = 'translateY(-15px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
                
                // Highlight tech tags
                const tags = this.querySelectorAll('.tech-tag');
                tags.forEach(tag => {
                    tag.style.backgroundColor = 'rgba(255, 50, 50, 0.2)';
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset to default hover state
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                
                // Reset tech tags
                const tags = this.querySelectorAll('.tech-tag');
                tags.forEach(tag => {
                    tag.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                });
            });
        });
    }

    // Add smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize animations when main content is loaded
    const mainContent = document.getElementById('main-content');
    if (mainContent && !mainContent.classList.contains('hidden')) {
        initSectionAnimations();
        initTechCardEffects();
        initSmoothScroll();
    } else {
        // If content is still loading, set up event listener for when it becomes visible
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList && !mutation.target.classList.contains('hidden')) {
                    initSectionAnimations();
                    initTechCardEffects();
                    initSmoothScroll();
                    observer.disconnect();
                }
            });
        });
        
        if (mainContent) {
            observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });
        }
    }
    
    // Add a special effect for the process flow arrows
    function animateProcessArrows() {
        const arrows = document.querySelectorAll('.process-arrow');
        let index = 0;
        
        function pulseNextArrow() {
            // Reset all arrows
            arrows.forEach(arrow => {
                arrow.style.backgroundColor = 'var(--army-camel)';
                arrow.style.height = '30px';
            });
            
            // Pulse the current arrow if it exists
            if (arrows[index]) {
                arrows[index].style.backgroundColor = 'var(--medic-red)';
                arrows[index].style.height = '40px';
            }
            
            // Move to next arrow, or loop back to beginning
            index = (index + 1) % arrows.length;
            
            // Continue the animation
            setTimeout(pulseNextArrow, 1000);
        }
        
        // Start the animation if there are arrows
        if (arrows.length > 0) {
            pulseNextArrow();
        }
    }
    
    // Initialize process arrow animation when process section is visible
    const processSection = document.querySelector('.process-section');
    if (processSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateProcessArrows();
                observer.unobserve(processSection);
            }
        }, { threshold: 0.3 });
        
        observer.observe(processSection);
    }
});