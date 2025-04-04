// Simulates loading of mission data with progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.getElementById('progress-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const medicCircle = document.querySelector('.medic-circle');

    let progress = 0;
    const totalDuration = 1500; // Total loading time in milliseconds (reduced from 3000)
    const interval = 20; // Update interval in milliseconds (reduced from 30)

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

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        // Calculate next progress step (non-linear but faster overall)
        let increment;

        if (progress < 20) {
            increment = 1.4; // Start faster (doubled)
        } else if (progress < 50) {
            increment = 1.2; // Doubled
        } else if (progress < 70) {
            increment = 0.8; // Doubled
        } else if (progress < 90) {
            increment = 0.6; // Doubled
        } else {
            increment = 0.4; // Doubled but still slower at the end
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
                    initCarousel();
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
        const buttonNav = document.querySelector('.button-nav');
        const scene = document.getElementById('scene');

        // Set "About Us" as initially active
        if (navButtons.length > 0) {
            navButtons[0].classList.add('active');
        }

        // Handle button clicks
        navButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');
            });
        });

        // Handle scroll to change navigation background
        window.addEventListener('scroll', function() {
            // Get the position of the scene
            if (scene) {
                const sceneRect = scene.getBoundingClientRect();

                // If scene is scrolled out of view (top of scene is above the window)
                if (sceneRect.bottom <= 0) {
                    buttonNav.classList.add('scrolled');
                } else {
                    buttonNav.classList.remove('scrolled');
                }
            }
        });
    }



    // Tactical scene logic
    function initTacticalScene() {
        const scene = document.getElementById('scene');

        // Only proceed if scene element exists
        if (!scene) return;

        // Casualties data
        const casualties = [
            { x: 35, y: 60, severity: 'high' },
            { x: 70, y: 40, severity: 'medium' },
            { x: 25, y: 80, severity: 'low' },
            { x: 60, y: 70, severity: 'high' },
            { x: 80, y: 60, severity: 'medium' }
        ];

        // Robots initial positions
        const drones = [
            { x: 20, y: 20, id: 'drone1' },
            { x: 80, y: 20, id: 'drone2' },
            { x: 20, y: 80, id: 'drone3' },
            { x: 80, y: 80, id: 'drone4' }
        ];

        const quadrupeds = [
            { x: 50, y: 30, id: 'quad1' },
            { x: 50, y: 70, id: 'quad2' }
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

        // Create drones
        drones.forEach(drone => {
            const droneEl = document.createElement('div');
            droneEl.className = 'drone';
            droneEl.id = drone.id;
            droneEl.style.left = `${drone.x}%`;
            droneEl.style.top = `${drone.y}%`;
            scene.appendChild(droneEl);
        });

        // Create quadrupeds
        quadrupeds.forEach(quad => {
            const quadEl = document.createElement('div');
            quadEl.className = 'quadruped';
            quadEl.id = quad.id;
            quadEl.style.left = `${quad.x}%`;
            quadEl.style.top = `${quad.y}%`;
            scene.appendChild(quadEl);
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
                if (!droneEl) return;

                // Create circular motion with different phases
                const time = Date.now() / 1000;
                const angle = time * 30 + (index * 90);
                const radius = 10;
                const newX = drone.x + Math.sin(angle * Math.PI / 180) * radius;
                const newY = drone.y + Math.cos(angle * Math.PI / 180) * radius;

                droneEl.style.left = `${newX}%`;
                droneEl.style.top = `${newY}%`;

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
                if (!quadEl) return;

                // Move quadrupeds towards nearest casualty based on time
                const targetCasualty = casualties[index % casualties.length];
                const time = Date.now() / 8000; // Slower movement
                const progress = (Math.sin(time) + 1) / 2; // Oscillate between 0 and 1

                const newX = quad.x + (targetCasualty.x - quad.x) * progress;
                const newY = quad.y + (targetCasualty.y - quad.y) * progress;

                quadEl.style.left = `${newX}%`;
                quadEl.style.top = `${newY}%`;
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

    // Carousel auto-rotation function
    function initCarousel() {
        const carouselTrack = document.getElementById('carousel-track');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Check if carousel elements exist
        if (!carouselTrack || !prevBtn || !nextBtn) return;

        // Get all slides
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;

        // Calculate the width of one slide (including margins)
        const slideWidth = slides[0].offsetWidth + 20; // 20px for margins (10px on each side)

        // Variables to track position
        let position = 0;
        const visibleSlides = 3; // Number of slides visible at once
        const totalSlides = slides.length;

        // Function to move to next slide
        function moveToNextSlide() {
            position++;
            // Reset to beginning when reaching the end
            if (position >= totalSlides - visibleSlides + 1) {
                position = 0;
            }
            carouselTrack.style.transform = `translateX(-${position * slideWidth}px)`;
        }

        // Set up auto-rotation at 300ms interval
        const autoRotateInterval = setInterval(moveToNextSlide, 800);

        // Manual control buttons
        prevBtn.addEventListener('click', function() {
            clearInterval(autoRotateInterval); // Stop auto-rotation when manual control is used
            position--;
            if (position < 0) {
                position = totalSlides - visibleSlides;
            }
            carouselTrack.style.transform = `translateX(-${position * slideWidth}px)`;
        });

        nextBtn.addEventListener('click', function() {
            clearInterval(autoRotateInterval); // Stop auto-rotation when manual control is used
            moveToNextSlide();
        });
    }

});