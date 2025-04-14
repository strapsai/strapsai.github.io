document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading animation (this will be handled by the main script.js)
    // This script only contains robots-specific functionality

    // Function to handle robot section animations
    function initRobotAnimations() {
        // Select all robot sections
        const robotSections = document.querySelectorAll('.robot-section');
        
        // Observer for revealing elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe each robot section
        robotSections.forEach(section => {
            observer.observe(section);
            
            // Add subtle animation delay to child elements
            const elements = section.querySelectorAll('.robot-image, .robot-info, .capability-tag');
            elements.forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    // Function to animate coordination points sequentially
    function initCoordinationAnimation() {
        const points = document.querySelectorAll('.coordination-point');
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                points.forEach((point, index) => {
                    setTimeout(() => {
                        point.classList.add('active');
                    }, index * 300);
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        const coordinationSection = document.querySelector('.coordination-section');
        if (coordinationSection) {
            observer.observe(coordinationSection);
        }
    }

    // Function to handle smooth scrolling for anchor links
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
        initRobotAnimations();
        initCoordinationAnimation();
        initSmoothScroll();
    } else {
        // If content is still loading, set up event listener for when it becomes visible
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList && !mutation.target.classList.contains('hidden')) {
                    initRobotAnimations();
                    initCoordinationAnimation();
                    initSmoothScroll();
                    observer.disconnect();
                }
            });
        });
        
        if (mainContent) {
            observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });
        }
    }
});