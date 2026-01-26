// Team page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoading();

    // Handle navigation scroll effects
    handleNavScroll();

    // Populate team grid, then apply scroll animations
    loadTeamMembers()
        .catch((error) => {
            console.error('Failed to load team members:', error);
        })
        .finally(() => {
            initScrollAnimations();
        });
});

const MEMBER_TYPE_ORDER = [
    'PI',
    'Scientist',
    'Staff',
    'PhD',
    'Master',
    'Undergrad',
    'Sponsor'
];

async function loadTeamMembers() {
    const teamGroups = document.querySelector('[data-team-groups]');
    if (!teamGroups) {
        return;
    }

    const response = await fetch('team.json');
    if (!response.ok) {
        throw new Error(`Failed to load team.json: ${response.status}`);
    }

    const members = await response.json();
    const fragment = document.createDocumentFragment();

    const groupedMembers = groupMembersByType(members);
    const orderedGroups = orderMemberGroups(groupedMembers);

    orderedGroups.forEach(({ type, members: groupMembers }) => {
        fragment.appendChild(createMemberGroup(type, groupMembers));
    });

    teamGroups.innerHTML = '';
    teamGroups.appendChild(fragment);
}

function groupMembersByType(members) {
    return members.reduce((groups, member) => {
        if (!toBoolean(member.displayed, true)) {
            return groups;
        }
        const rawType = member.memberType || 'Other';
        const type = normalizeMemberType(rawType);
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(member);
        return groups;
    }, {});
}

function normalizeMemberType(type) {
    if (type === 'Scientist' || type === 'Staff' || type === 'Postdoc') {
        return 'Scientist & Staff';
    }
    if (type === 'PhD' || type === 'Master') {
        return 'PhD & Master';
    }
    return type;
}

function toBoolean(value, defaultValue = false) {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (normalized === 'true') {
            return true;
        }
        if (normalized === 'false') {
            return false;
        }
    }
    return defaultValue;
}

function orderMemberGroups(groups) {
    const ordered = [];
    const typeMap = {
        Scientist: 'Scientist & Staff',
        Staff: 'Scientist & Staff',
        Postdoc: 'Scientist & Staff',
        PhD: 'PhD & Master',
        Master: 'PhD & Master'
    };

    MEMBER_TYPE_ORDER.forEach((type) => {
        const groupKey = typeMap[type] || type;
        if (groups[groupKey]) {
            ordered.push({ type: groupKey, members: groups[groupKey] });
            delete groups[groupKey];
        }
    });

    Object.keys(groups).forEach((type) => {
        ordered.push({ type, members: groups[type] });
    });

    return ordered;
}

function createMemberGroup(type, members) {
    const group = document.createElement('div');
    group.className = 'team-group';

    const title = document.createElement('h2');
    title.className = 'team-group-title';
    title.textContent = getGroupDisplayName(type);

    const grid = document.createElement('div');
    grid.className = 'team-grid';

    const sortedMembers = [...members].sort((a, b) => {
        const aCurrent = toBoolean(a.currentMember, true);
        const bCurrent = toBoolean(b.currentMember, true);
        if (aCurrent === bCurrent) {
            return 0;
        }
        return aCurrent ? -1 : 1;
    });

    sortedMembers.forEach((member) => {
        grid.appendChild(createTeamMember(member));
    });

    group.appendChild(title);
    group.appendChild(grid);

    return group;
}

function getGroupDisplayName(type) {
    if (type === 'Undergrad') {
        return 'Amazing Undergrad';
    }
    return type;
}

function createTeamMember(member) {
    const teamMember = document.createElement('div');
    teamMember.className = 'team-member';

    const card = document.createElement('div');
    card.className = 'member-card';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'member-image';

    const image = document.createElement('img');
    image.src = member.image;
    image.alt = member.name || '';

    if (member.imageLink) {
        const imageLink = document.createElement('a');
        imageLink.href = member.imageLink;
        imageLink.target = '_blank';
        imageLink.rel = 'noopener noreferrer';
        imageLink.appendChild(image);
        imageWrapper.appendChild(imageLink);
    } else {
        imageWrapper.appendChild(image);
    }

    const info = document.createElement('div');
    info.className = 'member-info';

    const name = document.createElement('h3');
    name.textContent = member.name || '';

    const role = document.createElement('div');
    role.className = 'member-role';
    role.textContent = member.role || '';

    const position = document.createElement('div');
    position.className = 'member-position';
    position.textContent = member.position || '';

    const affiliation = document.createElement('div');
    affiliation.className = 'member-affiliation';
    affiliation.textContent = member.affiliation || '';

    const social = document.createElement('div');
    social.className = 'member-social';

    (member.social || []).forEach((link) => {
        if (!link || !link.url) {
            return;
        }

        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';

        const icon = document.createElement('i');
        icon.className = getSocialIconClass(link.type);

        anchor.appendChild(icon);
        social.appendChild(anchor);
    });

    info.appendChild(name);
    info.appendChild(role);
    info.appendChild(position);
    info.appendChild(affiliation);
    info.appendChild(social);

    card.appendChild(imageWrapper);
    card.appendChild(info);
    teamMember.appendChild(card);

    return teamMember;
}

function getSocialIconClass(type) {
    switch (type) {
        case 'linkedin':
            return 'fab fa-linkedin';
        case 'github':
            return 'fab fa-github';
        case 'globe':
            return 'fas fa-globe';
        default:
            return 'fas fa-link';
    }
}

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