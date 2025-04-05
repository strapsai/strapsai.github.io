/**
 * News Card Generator
 * Automatically generates news cards for YouTube videos and articles
 */

// Array of news items - update this with your news items
const newsItems = [
    {
        type: 'video',
        url: 'https://youtu.be/tiPbo0PGmyg?si=MKh2VLWqIluKl11M',
        title: 'Researchers at CMU and Pitt developing robots to help first responders',
        date: 'March 24, 2025',
        excerpt: 'When disaster strikes, every second counts. CMU and Pitt researchers are developing new robotic technology that can be first on the scene to assess injuries quicker, potentially saving lives in mass casualty events.',
        thumbnail: '' // YouTube thumbnail will be auto-generated
    },
    {
        type: 'article',
        url: 'https://www.axios.com/local/pittsburgh/2025/03/24/pittsburgh-robotics-cmu-darpa-emergency-response',
        title: 'CMU, Pitt robots race to save lives in DARPA contest',
        date: 'March 24, 2025',
        excerpt: 'Researchers at Carnegie Mellon University and the University of Pittsburgh are teaming up to compete in a Department of Defense contest to use robotics and AI to help advance global emergency response efforts.',
        thumbnail: 'assets/news/CMU, Pitt robots race to save lives in DARPA contest.webp'
    },
    {
        type: 'article',
        url: 'https://blueskypit.com/pits-fire-training-facility-serves-as-a-testing-ground-for-life-saving-technology/',
        title: 'PIT\'s Fire Training Facility Serves as a Testing Ground for Life-Saving Technology',
        date: 'March 24, 2025',
        excerpt: 'Pittsburgh International Airport\'s ARFF Training Facility recently hosted autonomous robots and drones from CMU and Pitt that can identify human injuries from up to 10 meters away, notifying first responders about victims who need immediate triage.',
        thumbnail: 'assets/news/PIT’s Fire Training Facility Serves as a Testing Ground for Life-Saving Technology.webp'
    }
];

/**
 * Initializes the news section with cards generated from newsItems
 */
function initNewsSection() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    // Clear existing news cards
    newsGrid.innerHTML = '';

    // Generate news cards based on the newsItems array
    newsItems.forEach(item => {
        const newsCard = createNewsCard(item);
        newsGrid.appendChild(newsCard);
    });

    // Add click handlers for video cards
    document.querySelectorAll('.video-card .play-button, .video-card .news-link').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const linkElement = this.closest('.news-card').querySelector('.news-link');
            const videoUrl = linkElement.getAttribute('href');
            openVideoModal(videoUrl);
        });
    });
}

/**
 * Creates a news card element from a news item object
 * @param {Object} item - The news item data
 * @returns {HTMLElement} - The created card element
 */
function createNewsCard(item) {
    const card = document.createElement('div');
    card.className = `news-card ${item.type}-card`;

    // Determine if it's a YouTube URL and extract video ID
    let videoId = extractVideoId(item.url);

    // Create thumbnail section
    const thumbnailHTML = `
    <div class="news-thumbnail">
        <img src="${item.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : 'assets/news/default-thumbnail.webp')}" 
            onerror="this.onerror=null; this.src='assets/news/default-thumbnail.webp';"
            alt="${item.title}" class="thumbnail-img">
        ${item.type === 'video' ? '<div class="play-button"><div class="play-icon"></div></div>' : ''}
    </div>
    `;

    // Create content section
    const contentHTML = `
        <div class="news-content">
            <span class="news-date">${item.date}</span>
            <h3 class="news-title">${item.title}</h3>
            <p class="news-excerpt">${item.excerpt}</p>
            <a href="${item.url}" class="news-link" data-type="${item.type}">
                ${item.type === 'video' ? 'Watch Video' : 'Read More'}
            </a>
        </div>
    `;

    card.innerHTML = thumbnailHTML + contentHTML;
    return card;
}

/**
 * Extracts a YouTube video ID from a URL
 * @param {string} url - The YouTube URL
 * @returns {string} - The extracted video ID or empty string
 */
function extractVideoId(url) {
    try {
        let videoId = '';
        
        // Check if URL is valid
        if (!url || typeof url !== 'string') {
            return '';
        }
        
        // Handle full youtube.com URLs
        if (url.includes('youtube.com/watch')) {
            try {
                const urlObj = new URL(url);
                videoId = urlObj.searchParams.get('v');
            } catch (e) {
                // Try regex as fallback
                const match = url.match(/[?&]v=([^&#]*)/);
                videoId = match && match[1] ? match[1] : '';
            }
        } 
        // Handle shortened youtu.be URLs
        else if (url.includes('youtu.be/')) {
            const parts = url.split('youtu.be/');
            if (parts.length > 1) {
                videoId = parts[1].split('?')[0].split('&')[0];
            }
        }
        
        console.log("Extracted video ID:", videoId, "from URL:", url);
        return videoId;
    } catch (e) {
        console.error('Error extracting video ID:', e, 'from URL:', url);
        return '';
    }
}

/**
 * Opens a modal with a YouTube video player
 * @param {string} videoUrl - The YouTube video URL
 */
function openVideoModal(videoUrl) {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        console.error("Could not extract video ID from URL:", videoUrl);
        window.open(videoUrl, '_blank'); // Fallback to opening in new tab
        return;
    }

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-container">
            <button class="modal-close">&times;</button>
            <div class="modal-content">
                <iframe width="100%" height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;

    // Debugging
    console.log("Opening video modal with ID:", videoId);
    console.log("Full iframe URL:", `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);

    // Add modal to page
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Add event listeners for closing
    modal.querySelector('.modal-overlay').addEventListener('click', closeVideoModal);
    modal.querySelector('.modal-close').addEventListener('click', closeVideoModal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * Closes the video modal with animation
 */
function closeVideoModal() {
    const modal = document.querySelector('.video-modal');
    if (!modal) return;

    modal.classList.remove('active');
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = ''; // Restore scrolling
    }, 300);
}

/**
 * Generates a news card from a URL (YouTube or article)
 * @param {string} url - The URL to the content
 * @param {string} title - The title for the news item (optional)
 * @param {string} excerpt - The excerpt/description for the news item (optional)
 */
function generateNewsCardFromUrl(url, title = '', excerpt = '') {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    // Determine if it's a YouTube URL
    const isYouTube = url.includes('youtube.com/watch') || url.includes('youtu.be/');
    const videoId = isYouTube ? extractVideoId(url) : '';
    
    // Create a new news item
    const newItem = {
        type: isYouTube ? 'video' : 'article',
        url: url,
        title: title || (isYouTube ? 'Latest Project Video' : 'Recent Project Update'),
        date: formattedDate,
        excerpt: excerpt || (isYouTube ? 'Watch our latest project update video.' : 'Read about the latest developments in our project.'),
        thumbnail: isYouTube && videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 'assets/news/default-thumbnail.webp'
    };
    
    // Add to news items array (at the beginning)
    newsItems.unshift(newItem);
    
    // Rebuild the news grid
    initNewsSection();
    
    return newItem; // Return the created item for potential further use
}

// Make sure initialization happens properly
function initializeNewsContent() {
    console.log("Initializing news content...");
    
    const newsSection = document.querySelector('.news-section');
    if (!newsSection) {
        console.warn("News section not found in the DOM");
        return;
    }
    
    const newsGrid = newsSection.querySelector('.news-grid');
    if (!newsGrid) {
        console.warn("News grid not found within news section");
        return;
    }
    
    // Initialize news section
    initNewsSection();
    console.log("News section initialized successfully");
}

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded, checking for news section...");
    // Initialize immediately if content is already visible
    initializeNewsContent();
});

// Also try to initialize after full page load (for any dynamic content)
window.addEventListener('load', function() {
    console.log("Window loaded, checking news section again...");
    setTimeout(initializeNewsContent, 500); // Small delay to ensure dynamic content is ready
});

// News Alert functionality
function initNewsAlert() {
    // Just adjust positioning of navigation and scene to accommodate news alert bar
    adjustLayoutForNewsTicker();
}

function adjustLayoutForNewsTicker() {
    const newsTicker = document.getElementById('news-ticker');
    const buttonNav = document.querySelector('.button-nav');
    const scene = document.querySelector('.tactical-scene');
    
    if (newsTicker && buttonNav && scene) {
        const newsTickerHeight = newsTicker.offsetHeight;
        
        // Adjust navigation position
        buttonNav.style.top = `${newsTickerHeight}px`;
        
        // Adjust scene padding to account for both nav and ticker
        scene.style.paddingTop = `${60 + newsTickerHeight}px`;
    }
}

// Add news alert initialization to the existing code
document.addEventListener('DOMContentLoaded', function() {
    // Original code remains the same
    
    // Add this to the window.onload event or existing load event
    window.addEventListener('load', function() {
        adjustLayoutForNewsTicker();
        initNewsAlert();
        
        // Also adjust on window resize
        window.addEventListener('resize', function() {
            adjustLayoutForNewsTicker();
        });
    });
});

// News Alert functionality 
function adjustLayoutForNewsTicker() {
    const newsTicker = document.getElementById('news-ticker');
    const buttonNav = document.querySelector('.button-nav');
    const scene = document.querySelector('.tactical-scene');
    
    if (newsTicker && buttonNav && scene) {
        const newsTickerHeight = newsTicker.offsetHeight;
        
        // Adjust navigation position
        buttonNav.style.top = `${newsTickerHeight}px`;
        
        // Adjust scene padding to account for both nav and ticker
        scene.style.paddingTop = `${60 + newsTickerHeight}px`;
    }
}