// Simulates loading of mission data with progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.getElementById('progress-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const medicCircle = document.querySelector('.medic-circle');
    const footerCopyright = '&copy; 2026 Team Chiron. All rights reserved.';

    function syncFooterCopyright() {
        const footerLines = document.querySelectorAll('.contact-footer .footer-info p:first-child');
        footerLines.forEach(line => {
            line.innerHTML = footerCopyright;
        });
    }

    let progress = 0;
    const totalDuration = 600; // Total loading time in milliseconds (reduced from 3000)
    const interval = 10; // Update interval in milliseconds (reduced from 30)
    const baseIncrement = (interval / totalDuration) * 100;

    // Pulse animation for medic cross
    function pulseAnimation() {
        const crossVertical = document.querySelector('.medic-cross-vertical');
        const crossHorizontal = document.querySelector('.medic-cross-horizontal');

        let opacity = 0.7;
        let increasing = true;

        const pulseInterval = setInterval(() => {
            if (increasing) {
                opacity += 0.03;
                if (opacity >= 1) {
                    increasing = false;
                }
            } else {
                opacity -= 0.03;
                if (opacity <= 0.7) {
                    increasing = true;
                }
            }

            crossVertical.style.opacity = opacity;
            crossHorizontal.style.opacity = opacity;
        }, 50);

        return pulseInterval;
    }

    const pulseIntervalId = pulseAnimation();
    syncFooterCopyright();

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        // Calculate next progress step (non-linear but faster overall)
        let increment;

        if (progress < 20) {
            increment = baseIncrement * 0.7; // Start faster
        } else if (progress < 50) {
            increment = baseIncrement * 0.6;
        } else if (progress < 70) {
            increment = baseIncrement * 0.4;
        } else if (progress < 90) {
            increment = baseIncrement * 0.3;
        } else {
            increment = baseIncrement * 0.2; // Slower at the end
        }

        progress += increment;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            clearInterval(pulseIntervalId);

            // Short delay before showing main content
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');

                    // Initialize both components
                    initTacticalScene();
                    initButtonNav();
                    initSponsorCarousel();
                }, 500);
            }, 500);
        }

        // Update progress bar and text
        progressBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;

        // Gradually fill the medic circle as loading progresses
        medicCircle.style.opacity = 0.2 + (progress / 100) * 0.8;

    }, interval);

    // Initialize button navigation
    function initButtonNav() {
        const navButtons = document.querySelectorAll('.nav-button');
        const mobileNavButtons = document.querySelectorAll('.mobile-nav-button');
        const buttonNav = document.querySelector('.button-nav');
        const scene = document.getElementById('scene');
        const burgerMenu = document.querySelector('.burger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMenu = document.querySelector('.close-menu');

        // Set "About Us" as initially active
        if (navButtons.length > 0 && window.location.pathname.indexOf('robots.html') === -1) {
            navButtons[0].classList.add('active');
            if (mobileNavButtons.length > 0) {
                mobileNavButtons[0].classList.add('active');
            }
        }

        // Toggle mobile menu
        if (burgerMenu) {
            burgerMenu.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            });
        }

        // Close mobile menu
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        }

        // Handle button clicks for desktop navigation
        navButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                handleNavButtonClick(e, this, navButtons);
            });
        });

        // Handle button clicks for mobile navigation
        mobileNavButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                handleNavButtonClick(e, this, mobileNavButtons);
                // Close mobile menu after clicking a link
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });

        // Function to handle navigation button clicks
        function handleNavButtonClick(e, button, allButtons) {
            const href = button.getAttribute('href');
            
            // Only prevent default for same-page links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();

                // Remove active class from all buttons
                allButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');
                
                // Scroll to the anchor if it exists on this page
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For external links, allow default navigation behavior
        }

        // Handle scroll to change navigation background and show logo
        window.addEventListener('scroll', function() {
            // Get the position of the scene
            const navLogo = document.getElementById('nav-logo');
            
            if (scene) {
                const sceneRect = scene.getBoundingClientRect();

                // If scene is scrolled out of view (top of scene is above the window)
                if (sceneRect.bottom <= 0) {
                    buttonNav.classList.add('scrolled');
                    if (navLogo) {
                        navLogo.style.opacity = '1';
                    }
                } else {
                    buttonNav.classList.remove('scrolled');
                    if (navLogo) {
                        navLogo.style.opacity = '0';
                    }
                }
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !burgerMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }

    // Position Sponsor Carousel
    function positionSponsorSection() {
        const tacticalScene = document.querySelector('.tactical-scene');
        const sponsorSection = document.querySelector('.sponsors-section');
        
        if (tacticalScene && sponsorSection) {
            // Calculate position to place sponsors at bottom of viewport
            const viewportHeight = window.innerHeight;
            const sceneHeight = viewportHeight;
            
            // Set tactical scene to full viewport height
            tacticalScene.style.height = `${sceneHeight}px`;
            
            // Force sponsors to appear just at the bottom edge of viewport
            const sponsorHeight = sponsorSection.offsetHeight;
            sponsorSection.style.marginTop = `-${sponsorHeight}px`;
            
            // Adjust control center position to stay clear of sponsors
            const controlCenter = document.querySelector('.control-center');
            if (controlCenter) {
                controlCenter.style.bottom = `${sponsorHeight + 40}px`;
            }
        }
    }

    // Tactical scene logic
    function initTacticalScene() {
        const scene = document.getElementById('scene');

        // Only proceed if scene element exists
        if (!scene) return;

        // Check if we're on a mobile device
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;

        // Adjust positions for mobile devices
        let mobileAdjustX = 0;
        let mobileAdjustY = 0;
        
        if (isMobile) {
            mobileAdjustX = 10; // Move elements more to the left on mobile
            if (isSmallMobile) {
                mobileAdjustX = 15; // Even more to the left on very small screens
            }
        }

        // Casualties data - adjust positions for mobile
        const casualties = [
            { x: 35 - mobileAdjustX, y: 60, severity: 'high' },
            { x: 70 - mobileAdjustX, y: 40, severity: 'medium' },
            { x: 25 - mobileAdjustX, y: 80, severity: 'low' },
            { x: 60 - mobileAdjustX, y: 70, severity: 'high' },
            { x: 80 - mobileAdjustX, y: 60, severity: 'medium' }
        ];

        // Robots initial positions - adjust for mobile
        const drones = [
            { x: 50 - mobileAdjustX, y: 20, id: 'drone1' },
            { x: 80 - mobileAdjustX, y: 20, id: 'drone2' },
            { x: 20 - mobileAdjustX, y: 80, id: 'drone3' },
            { x: 80 - mobileAdjustX, y: 80, id: 'drone4' }
        ];

        const quadrupeds = [
            { x: 50 - mobileAdjustX, y: 30, id: 'quad1' },
            { x: 50 - mobileAdjustX, y: 70, id: 'quad2' }
        ];

        // Create casualties
        casualties.forEach((cas, index) => {
            const casualty = document.createElement('div');
            casualty.className = 'casualty';
            casualty.id = `casualty${index}`;
            casualty.style.left = `${cas.x}%`;
            casualty.style.top = `${cas.y}%`;
            scene.appendChild(casualty);

            // Create info panel for casualties
            const infoPanel = document.createElement('div');
            infoPanel.className = 'info-panel';
            infoPanel.id = `info${index}`;
            infoPanel.style.left = `${cas.x + 3}%`;
            infoPanel.style.top = `${cas.y - 10}%`;
            infoPanel.innerHTML = `
                <h3>Casualty Assessment</h3>
                <div class="status">
                    <span>Status:</span>
                    <span>${cas.severity === 'high' ? 'Critical' : cas.severity === 'medium' ? 'Moderate' : 'Stable'}</span>
                </div>
                <div class="status-bar">
                    <div class="status-bar-fill" style="width: ${cas.severity === 'high' ? '85%' : cas.severity === 'medium' ? '60%' : '30%'}"></div>
                </div>
                <div class="vital">
                    <div class="vital-icon">❤️</div>
                    <div class="vital-value">${Math.floor(Math.random() * 40) + 80}</div>
                </div>
            `;
            scene.appendChild(infoPanel);
        });

        // Create quadrupeds
        quadrupeds.forEach(quad => {
            // Create coverage area first
            const coverageArea = document.createElement('div');
            coverageArea.className = 'quadruped-coverage'; // Using a different class for styling if needed
            coverageArea.id = `${quad.id}-coverage`;
            coverageArea.style.left = `${quad.x}%`;
            coverageArea.style.top = `${quad.y}%`;
            
            // Adjust coverage size for mobile
            const coverageSize = isMobile ? (isSmallMobile ? '60px' : '70px') : '80px';
            coverageArea.style.width = coverageSize;
            coverageArea.style.height = coverageSize;
            
            scene.appendChild(coverageArea);
            
            // Create the quadruped element
            const quadEl = document.createElement('div');
            quadEl.className = 'quadruped';
            quadEl.id = quad.id;
            quadEl.style.left = `${quad.x}%`;
            quadEl.style.top = `${quad.y}%`;
            scene.appendChild(quadEl);
            
            // Create the icon container
            const iconContainer = document.createElement('div');
            iconContainer.className = 'robot-icon-container quadruped-icon'; // Adding a specific class for quadruped icons
            iconContainer.id = `${quad.id}-icon`;
            iconContainer.style.left = `${quad.x}%`;
            iconContainer.style.top = `${quad.y}%`;
            
            // Create the icon image
            const iconImg = document.createElement('img');
            iconImg.className = 'robot-icon';
            iconImg.src = 'assets/icons/quadruped.png'; // Update with your actual path
            iconImg.alt = 'Quadruped';
            
            // Append image to container, and container to scene
            iconContainer.appendChild(iconImg);
            scene.appendChild(iconContainer);
        });

        

        // Create drones
        drones.forEach(drone => {
            const coverageArea = document.createElement('div');
            coverageArea.className = 'drone-coverage';
            coverageArea.id = `${drone.id}-coverage`;
            coverageArea.style.left = `${drone.x}%`;
            coverageArea.style.top = `${drone.y}%`;
            
            // Adjust coverage size for mobile
            const coverageSize = isMobile ? (isSmallMobile ? '70px' : '85px') : '100px';
            coverageArea.style.width = coverageSize;
            coverageArea.style.height = coverageSize;
            
            scene.appendChild(coverageArea);

            const droneEl = document.createElement('div');
            droneEl.className = 'drone';
            droneEl.id = drone.id;
            droneEl.style.left = `${drone.x}%`;
            droneEl.style.top = `${drone.y}%`;
            scene.appendChild(droneEl);
            
            // Add this new code to create the icon container
            const iconContainer = document.createElement('div');
            iconContainer.className = 'robot-icon-container';
            iconContainer.id = `${drone.id}-icon`;
            iconContainer.style.left = `${drone.x}%`;
            iconContainer.style.top = `${drone.y}%`;
            
            // Create the icon image
            const iconImg = document.createElement('img');
            iconImg.className = 'robot-icon';
            iconImg.src = 'assets/icons/drone.png'; // Updated with the correct path
            iconImg.alt = 'Drone';
            
            // Append image to container, and container to scene
            iconContainer.appendChild(iconImg);
            scene.appendChild(iconContainer);
        });

        // Create connection lines
        const createConnectionLine = (source, target) => {
            const sourceEl = document.getElementById(source);
            const targetEl = document.getElementById(target);

            if (!sourceEl || !targetEl) return;

            const sourceRect = sourceEl.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();

            const sourceCenter = {
                x: sourceRect.left + sourceRect.width / 2,
                y: sourceRect.top + sourceRect.height / 2
            };

            const targetCenter = {
                x: targetRect.left + targetRect.width / 2,
                y: targetRect.top + targetRect.height / 2
            };

            const distance = Math.sqrt(
                Math.pow(targetCenter.x - sourceCenter.x, 2) +
                Math.pow(targetCenter.y - sourceCenter.y, 2)
            );

            const angle = Math.atan2(
                targetCenter.y - sourceCenter.y,
                targetCenter.x - sourceCenter.x
            ) * 180 / Math.PI;

            const line = document.createElement('div');
            line.className = 'connection-line';
            line.style.width = `${distance}px`;
            line.style.left = `${sourceCenter.x}px`;
            line.style.top = `${sourceCenter.y}px`;
            line.style.transform = `rotate(${angle}deg)`;

            scene.appendChild(line);
            return line;
        };

        // Animation for tactical scene
        function animateScene() {
            // Animate drones
            drones.forEach((drone, index) => {
                const droneEl = document.getElementById(drone.id);
                const iconEl = document.getElementById(`${drone.id}-icon`);
                const coverageEl = document.getElementById(`${drone.id}-coverage`); // Get coverage element
                
                if (!droneEl || !iconEl || !coverageEl) return; // Check if all elements exist

                // Create circular motion with different phases
                const time = Date.now() / 1000;
                const angle = time * 30 + (index * 90);
                
                // Adjust animation radius for mobile
                const radius = isMobile ? (isSmallMobile ? 6 : 8) : 10;
                
                const newX = drone.x + Math.sin(angle * Math.PI / 180) * radius;
                const newY = drone.y + Math.cos(angle * Math.PI / 180) * radius;

                // Update positions of all elements
                droneEl.style.left = `${newX}%`;
                droneEl.style.top = `${newY}%`;
                
                iconEl.style.left = `${newX}%`;
                iconEl.style.top = `${newY}%`;
                
                coverageEl.style.left = `${newX}%`; // Update coverage area position
                coverageEl.style.top = `${newY}%`;

                // Show info panels when drones are near casualties
                casualties.forEach((cas, casIndex) => {
                    const infoPanel = document.getElementById(`info${casIndex}`);
                    const casualtyEl = document.getElementById(`casualty${casIndex}`);

                    if (!infoPanel || !casualtyEl) return;

                    const dx = Math.abs(newX - cas.x);
                    const dy = Math.abs(newY - cas.y);
                    const distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < 15) {
                        infoPanel.style.display = 'block';

                        // Create pulse effect
                        const pulse = document.createElement('div');
                        pulse.className = 'pulse-circle';
                        pulse.style.left = casualtyEl.style.left;
                        pulse.style.top = casualtyEl.style.top;
                        pulse.style.width = '40px';
                        pulse.style.height = '40px';
                        scene.appendChild(pulse);

                        // Remove pulse after animation
                        setTimeout(() => {
                            if (pulse && pulse.parentNode) {
                                pulse.remove();
                            }
                        }, 2000);
                    } else if (distance >= 20) {
                        // Only hide if all drones are far enough
                        let shouldHide = true;
                        drones.forEach(otherDrone => {
                            if (otherDrone.id !== drone.id) {
                                const otherDroneEl = document.getElementById(otherDrone.id);
                                if (!otherDroneEl) return;

                                const otherX = parseFloat(otherDroneEl.style.left);
                                const otherY = parseFloat(otherDroneEl.style.top);
                                const otherDx = Math.abs(otherX - cas.x);
                                const otherDy = Math.abs(otherY - cas.y);
                                const otherDistance = Math.sqrt(otherDx*otherDx + otherDy*otherDy);

                                if (otherDistance < 15) {
                                    shouldHide = false;
                                }
                            }
                        });

                        if (shouldHide) {
                            infoPanel.style.display = 'none';
                        }
                    }
                });
            });

            // Animate quadrupeds
            quadrupeds.forEach((quad, index) => {
                const quadEl = document.getElementById(quad.id);
                const iconEl = document.getElementById(`${quad.id}-icon`);
                const coverageEl = document.getElementById(`${quad.id}-coverage`);
                
                if (!quadEl || !iconEl || !coverageEl) return; // Check if all elements exist

                // Move quadrupeds towards nearest casualty based on time
                const targetCasualty = casualties[index % casualties.length];
                const time = Date.now() / 8000; // Slower movement
                const progress = (Math.sin(time) + 1) / 2; // Oscillate between 0 and 1

                const newX = quad.x + (targetCasualty.x - quad.x) * progress;
                const newY = quad.y + (targetCasualty.y - quad.y) * progress;

                // Update positions of all elements
                quadEl.style.left = `${newX}%`;
                quadEl.style.top = `${newY}%`;
                
                iconEl.style.left = `${newX}%`;
                iconEl.style.top = `${newY}%`;
                
                coverageEl.style.left = `${newX}%`;
                coverageEl.style.top = `${newY}%`;
            });

            // Remove old connection lines
            document.querySelectorAll('.connection-line').forEach(line => {
                line.remove();
            });

            // Create new connection lines
            drones.forEach((drone, i) => {
                // Connect drones to each other
                drones.forEach((otherDrone, j) => {
                    if (i !== j) {
                        createConnectionLine(drone.id, otherDrone.id);
                    }
                });

                // Connect drones to quadrupeds
                quadrupeds.forEach(quad => {
                    createConnectionLine(drone.id, quad.id);
                });
            });

            // Continue animation
            requestAnimationFrame(animateScene);
        }

        // Start the animation
        animateScene();
    }

    // Sponsor Carousel Implementation
    function initSponsorCarousel() {
        const carouselTrack = document.getElementById('carousel-track');
        if (!carouselTrack) return;

        // Get all slides
        const originalSlides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
        if (originalSlides.length === 0) return;

        // Clone slides and append to create circular effect
        originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            carouselTrack.appendChild(clone);
        });

        // Variables
        const totalSlides = originalSlides.length;
        let currentPosition = 0;
        let animationFrame;
        let isPaused = false;
        
        // Function to calculate slide widths
        function getSlideWidth(index) {
            return originalSlides[index % totalSlides].offsetWidth + 
                parseInt(window.getComputedStyle(originalSlides[index % totalSlides]).paddingLeft) +
                parseInt(window.getComputedStyle(originalSlides[index % totalSlides]).paddingRight);
        }
        
        // Calculate total width of all original slides
        function getTotalWidth() {
            let width = 0;
            for (let i = 0; i < totalSlides; i++) {
                width += getSlideWidth(i);
            }
            return width;
        }
        
        // Animate function for smooth scrolling
        function animate() {
            if (!isPaused) {
                // Move by a small pixel amount each frame for smooth scrolling
                currentPosition += 0.5;
                
                // If we've moved past the first set of slides
                if (currentPosition >= getTotalWidth()) {
                    // Reset to start
                    currentPosition = 0;
                }
                
                // Apply the transform
                carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
            }
            
            animationFrame = requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Pause on hover
        carouselTrack.parentElement.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        carouselTrack.parentElement.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Add sponsor names that appear on hover
        document.querySelectorAll('.carousel-slide').forEach(slide => {
            if (!slide.querySelector('.sponsor-name')) {
                const img = slide.querySelector('img');
                if (img && img.alt) {
                    const sponsorName = document.createElement('span');
                    sponsorName.className = 'sponsor-name';
                    sponsorName.textContent = img.alt;
                    slide.appendChild(sponsorName);
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Recalculate slide widths if window size changes
            if (currentPosition >= getTotalWidth()) {
                currentPosition = 0;
                carouselTrack.style.transform = `translateX(0)`;
            }
        });

        // Clean up function
        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }

    // Call positionSponsorSection after initialization
    window.addEventListener('load', positionSponsorSection);
    // Also adjust on window resize
    window.addEventListener('resize', positionSponsorSection);


});