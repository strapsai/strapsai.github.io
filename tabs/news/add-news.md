# News Section Integration Guide

This guide will help you add the autonomous news card section to your Chiron website. The news section will automatically generate appropriate cards for YouTube videos or article links.

## File Structure

First, create the following file structure:

```
tabs/
  └── news/
      ├── news.html
      ├── news.css
      └── news.js
```

## Integration Steps

### 1. Add CSS Link to Head

In your main HTML file, add this link to the `<head>` section:

```html
<head>
    <!-- Your existing head content -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="tabs/news/news.css">
</head>
```

### 2. Add JavaScript Link

Add this before the closing `</body>` tag:

```html
<script src="script.js"></script>
<script src="tabs/news/news.js"></script>
```

### 3. Insert the News Section HTML

Insert the news section HTML between your tactical scene and sponsors section:

```html
<!-- Tactical Scene Section -->
...

<!-- News Section -->
<section class="news-section" id="news">
    <div class="section-container">
        <div class="section-header">
            <h2>Latest News</h2>
            <div class="divider"></div>
        </div>
        
        <div class="news-grid">
            <!-- News cards will be generated here dynamically -->
        </div>
        
        <div class="more-news">
            <a href="#all-news" class="more-news-button">View All News</a>
        </div>
    </div>
</section>

<!-- Sponsors Section -->
...
```

### 4. Create Assets Folder

Create a folder for news thumbnails:

```
assets/
  └── news/
      └── default-thumbnail.webp
```

Add a default-thumbnail.webp image to this folder for articles without specific thumbnails.

## Usage Guide

### Adding News Items

You can add news items in two ways:

#### Option 1: Edit the newsItems Array (Recommended)

In `tabs/news/news.js`, update the `newsItems` array:

```javascript
const newsItems = [
    {
        type: 'video',
        url: 'https://youtube.com/watch?v=YOUR_VIDEO_ID',
        title: 'Your Video Title',
        date: 'April 2, 2025',
        excerpt: 'Your video description',
        thumbnail: '' // Leave empty for YouTube videos - thumbnails are auto-fetched
    },
    {
        type: 'article',
        url: 'https://example.com/your-article',
        title: 'Your Article Title',
        date: 'March 15, 2025',
        excerpt: 'Your article description',
        thumbnail: 'assets/news/your-thumbnail.jpg'
    }
];
```

#### Option 2: Use the generateNewsCardFromUrl() Function

In JavaScript, you can add news items dynamically:

```javascript
// Add a YouTube video
generateNewsCardFromUrl(
    'https://youtube.com/watch?v=YOUR_VIDEO_ID',
    'New DARPA Challenge Results',
    'See how our autonomous drones performed in the latest challenge.'
);

// Add an article
generateNewsCardFromUrl(
    'https://example.com/your-article',
    'New Research Publication',
    'Our team's latest findings on autonomous triage systems.'
);
```

### YouTube Video Features

The system will:
- Automatically extract video thumbnails
- Show a play button overlay
- Open videos in a modal window (users stay on your site)
- Support both regular YouTube URLs and shortened youtu.be links

### Customization Options

To customize the appearance, edit the CSS variables in `tabs/news/news.css`. Key areas to customize:

- Card colors and borders
- Animation speeds
- Thumbnail size ratios
- Typography

## Testing

After integration, test the component by:

1. Adding different YouTube links to verify thumbnails load correctly
2. Clicking video cards to ensure the modal opens properly
3. Testing on different screen sizes to verify responsiveness
4. Adding and removing news items using both methods

## Troubleshooting

If videos don't display correctly:
- Ensure YouTube URLs are complete and valid
- Check browser console for JavaScript errors

If styles don't apply:
- Verify the CSS path is correct
- Check for CSS conflicts with your main stylesheet
