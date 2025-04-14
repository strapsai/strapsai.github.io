// Team page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoading();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Handle navigation scroll effects
    handleNavScroll();
});

// Simulate loading and remove loading screen
function initLoading() {
    const progressBar = document.getElementById('progress-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    let width = 0;
    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            // Small delay before hiding loading screen
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                mainContent.classList.remove('hidden');
                
                // After transition completes, remove loading screen from DOM
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        } else {
            // Accelerate progress toward the end
            width += width < 80 ? 1 : (width < 95 ? 0.5 : 0.25);
            progressBar.style.width = width + '%';
            loadingPercentage.textContent = Math.floor(width) + '%';
        }
    }, 25);
}

// Handle scroll animations for team members, expertise areas, and opportunity cards
function initScrollAnimations() {
    const sections = document.querySelectorAll('.team-section, .team-areas-section, .join-section');
    
    // Immediately animate some elements if they're in viewport on load
    checkSectionsInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkSectionsInView);
    
    function checkSectionsInView() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = sectionTop < window.innerHeight - 100;
            
            if (sectionVisible) {
                section.classList.add('section-visible');
            }
        });
    }
}

// Handle navigation bar effects on scroll
function handleNavScroll() {
    const nav = document.querySelector('.button-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 32) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Trigger initially in case page is loaded in middle
    if (window.scrollY > 32) {
        nav.classList.add('scrolled');
    }
}