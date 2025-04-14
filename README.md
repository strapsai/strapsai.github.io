# Team Chiron Website

[![Team Chiron Logo](assets/logo/chiron/png/CMU_TeamChiron_RedWht.png)](https://teamchiron.ai)

This repository contains the source code for the [Team Chiron website](https://teamchiron.ai), a team developing novel robotic technologies that combine unmanned aerial and ground vehicles with advanced AI for casualty detection and triage assessment in high-risk environments.

## Table of Contents

- [Introduction](#introduction)
- [Website Structure](#website-structure)
- [Updating Guidelines](#updating-guidelines)
  - [How to Add/Update Publications](#how-to-addupdate-publications)
  - [How to Add/Update Team Members](#how-to-addupdate-team-members)
  - [How to Add/Update Sponsors](#how-to-addupdate-sponsors)
  - [How to Add/Update News](#how-to-addupdate-news)
  - [How to Add/Update Testimonials](#how-to-addupdate-testimonials)
- [Development](#development)
- [License](#license)

## Introduction

Team Chiron is developing novel robotic technologies that combine unmanned aerial and ground vehicles with advanced AI to detect casualties, assess vital signs, and provide critical information to medical responders—potentially saving lives in scenarios ranging from battlefield injuries to natural disasters.

## Website Structure

The website is organized into several sections:
- Home page (`index.html`)
- Tech & Research (`tabs/tech_and_research/`)
- Team (`tabs/team/`)
- Robots (`tabs/robots/`)
- News (`tabs/news/`)
- Sponsors (`tabs/sponsors/`)

## Updating Guidelines

### How to Add/Update Publications

Publications are managed in the Tech & Research section:

1. Open `/tabs/tech_and_research/tech_and_research.html`
2. Locate the publications section
3. Add a new publication entry following the existing format:
   ```html
   <div class="publication-card">
       <div class="publication-image">
           <img src="path/to/thumbnail.jpg" alt="Publication Title">
       </div>
       <div class="publication-info">
           <h3>Publication Title</h3>
           <p class="authors">Author 1, Author 2, Author 3</p>
           <p class="venue">Conference/Journal Name, Year</p>
           <div class="publication-links">
               <a href="link-to-paper" target="_blank" class="publication-link">Paper</a>
               <a href="link-to-code" target="_blank" class="publication-link">Code</a>
               <a href="link-to-video" target="_blank" class="publication-link">Video</a>
           </div>
       </div>
   </div>
   ```
4. Add any new publication thumbnails to `/tabs/tech_and_research/assets/publications/`

### How to Add/Update Team Members

Team members are managed in the Team section:

1. Open `/tabs/team/team.html`
2. Locate the team members section
3. Add a new team member card following the existing format:
   ```html
   <div class="team-member">
       <div class="member-photo">
           <img src="assets/member-name.jpg" alt="Member Name">
       </div>
       <div class="member-info">
           <h3>Member Name</h3>
           <p class="member-title">Position/Title</p>
           <p class="member-affiliation">Affiliation</p>
           <div class="member-social">
               <a href="https://linkedin.com/in/profile" target="_blank"><i class="fab fa-linkedin"></i></a>
               <a href="https://github.com/username" target="_blank"><i class="fab fa-github"></i></a>
               <a href="https://website.com" target="_blank"><i class="fas fa-globe"></i></a>
           </div>
       </div>
   </div>
   ```
4. Add the team member's photo to `/tabs/team/assets/` (recommended size: 400x400px)

### How to Add/Update Sponsors

Sponsors are managed in the Sponsors section:

1. Open `/tabs/sponsors/sponsor.html`
2. Locate the sponsors section
3. Add a new sponsor to the appropriate tier:
   ```html
   <div class="sponsor-card tier-X">
       <img src="../../assets/logo/sponsors/logo_sponsor.png" alt="Sponsor Name">
       <div class="sponsor-info">
           <h3>Sponsor Name</h3>
           <p>Brief description of the sponsor</p>
           <a href="https://sponsor-website.com" target="_blank" class="sponsor-link">Visit Website</a>
       </div>
   </div>
   ```
   Where `tier-X` is one of: `tier-1`, `tier-2`, or `tier-3`
4. Add the sponsor's logo to `/assets/logo/sponsors/` (use transparent PNG if possible)
5. Update the carousel in the main page by adding the sponsor to the appropriate tier in `/index.html`:
   ```html
   <div class="carousel-slide tier-X">
       <img src="assets/logo/sponsors/logo_sponsor.png" alt="Sponsor Name">
   </div>
   ```

### How to Add/Update News

News items are managed in the News section:

1. Open `/tabs/news/news.js`
2. Add a new news item to the `newsItems` array:
   ```javascript
   {
       type: 'video', // or 'article'
       url: 'https://youtube.com/watch?v=YOUR_VIDEO_ID', // or article URL
       title: 'Your News Title',
       date: 'April 15, 2025',
       excerpt: 'Brief description of the news item',
       thumbnail: '' // Leave empty for YouTube videos - thumbnails are auto-fetched
                     // For articles, use path like 'assets/news/your-thumbnail.jpg'
   }
   ```
3. For article thumbnails, add the image to `/assets/news/`
4. News items are displayed in the order they appear in the array, with the most recent first

### How to Add/Update Testimonials

Testimonials are managed in the main page:

1. Open `/index.html`
2. Locate the testimonials section (around line 235)
3. Add a new testimonial card following the existing format:
   ```html
   <div class="testimonial-card">
       <div class="testimonial-image">
           <img src="tabs/team/assets/person-name.jpg" alt="Person Name">
       </div>
       <div class="testimonial-text">
           <p>"Testimonial quote goes here."</p>
           <div class="testimonial-author">
               <strong>Person Name</strong>
               <span>Title/Position</span>
           </div>
       </div>
   </div>
   ```
4. Make sure the person's photo exists in `/tabs/team/assets/`

## Development

To run the website locally, simply open the `index.html` file in a web browser or use a local server:

```bash
# Using Python's built-in HTTP server
python -m http.server

# Or using Node.js with http-server
npx http-server
```

## License

All rights reserved. 
