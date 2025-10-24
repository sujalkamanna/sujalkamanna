// Main initialization
document.addEventListener('DOMContentLoaded', initializeWebsite);

function initializeWebsite() {
    // Cache DOM elements
    const elements = {
        header: document.querySelector('.header'),
        menuToggle: document.querySelector('.menu-toggle'),
        navList: document.querySelector('.nav-list'),
        navLinks: document.querySelectorAll('.nav-link'),
        sections: document.querySelectorAll('section[id]')
    };

    // Initialize all features
    initScrollHeader(elements.header);
    initMobileMenu(elements.menuToggle, elements.navList);
    initSectionObserver(elements.navLinks);
    initSmoothScroll(elements);
}

// Scroll Header Effect
function initScrollHeader(header) {
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
            // Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile Menu Handling
function initMobileMenu(menuToggle, navList) {
    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(menuToggle, navList);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
            closeMenu(menuToggle, navList);
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu(menuToggle, navList);
        }
    });
}

function toggleMenu(menuToggle, navList) {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
    // Toggle aria-expanded
    menuToggle.setAttribute(
        'aria-expanded',
        menuToggle.classList.contains('active')
    );
}

function closeMenu(menuToggle, navList) {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

// Section Observer for Active Link
function initSectionObserver(navLinks) {
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveLink(id, navLinks);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });
}

function updateActiveLink(sectionId, navLinks) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll Implementation
function initSmoothScroll(elements) {
    const { navLinks, menuToggle, navList, header } = elements;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleLinkClick(e, link, { menuToggle, navList, header });
        });
    });
}

function handleLinkClick(e, link, elements) {
    const { menuToggle, navList, header } = elements;
    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
            closeMenu(menuToggle, navList);
            scrollToSection(targetSection, header);
        }
    }
}

function scrollToSection(targetSection, header) {
    const headerOffset = header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerOffset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Optional: Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Optional: Add scroll to top button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typewriter effect using Typed.js
document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add your form submission logic here
    // Example: Send to email service or backend
    
    // Show success message
    alert('Message sent successfully!');
    this.reset();
});