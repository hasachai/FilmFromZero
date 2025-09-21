// Film From Zero - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Animated film strip frames
    const frames = document.querySelectorAll('.frame');
    let currentFrame = 3; // Start with the 4th frame active (index 3)
    
    function animateFrames() {
        frames.forEach(frame => frame.classList.remove('active'));
        frames[currentFrame].classList.add('active');
        currentFrame = (currentFrame + 1) % frames.length;
    }
    
    // Start animation
    setInterval(animateFrames, 2000);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll(
        '.curriculum-card, .showcase-item, .portfolio-card, .ecosystem-card, .tool-item, .room-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }

        // Update active section in navigation
        updateActiveSection();
        
        lastScrollY = currentScrollY;
    });

    // Update active navigation based on scroll position
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos <= bottom) {
                const activeNavLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (activeNavLink) {
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    activeNavLink.classList.add('active');
                }
            }
        });
    }

    // Interactive showcase thumbnails
    const showcaseThumbnails = document.querySelectorAll('.showcase-thumbnail');
    showcaseThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const playButton = this.querySelector('.play-button');
            playButton.innerHTML = '⏸';
            
            // Simulate video playing
            setTimeout(() => {
                playButton.innerHTML = '▶';
            }, 3000);
        });
    });

    // Glossary search functionality (basic simulation)
    const glossaryItems = document.querySelectorAll('.glossary-item');
    let glossarySearchActive = false;

    // Add search input to glossary section
    const glossaryPreview = document.querySelector('.glossary-preview');
    if (glossaryPreview) {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search glossary...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 10px;
            margin-bottom: 1rem;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            font-family: inherit;
        `;
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            glossaryItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
        
        glossaryPreview.insertBefore(searchInput, glossaryPreview.firstChild);
    }

    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Portfolio hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.portfolio-avatar');
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.portfolio-avatar');
            avatar.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Studio room interaction
    const roomItems = document.querySelectorAll('.room-item');
    roomItems.forEach(room => {
        room.addEventListener('click', function() {
            const roomName = this.querySelector('h4').textContent;
            // Simulate joining room
            this.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = 'var(--bg-card)';
                this.style.color = '';
            }, 2000);
        });
    });

    // Ecosystem card animations
    const ecosystemCards = document.querySelectorAll('.ecosystem-card');
    ecosystemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.ecosystem-logo');
            logo.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.ecosystem-logo');
            logo.style.transform = 'rotateY(0deg)';
        });
    });

    // Add transition styles for ecosystem logos
    document.querySelectorAll('.ecosystem-logo').forEach(logo => {
        logo.style.transition = 'transform 0.6s ease';
    });

    // Add transition styles for portfolio avatars
    document.querySelectorAll('.portfolio-avatar').forEach(avatar => {
        avatar.style.transition = 'transform 0.3s ease';
    });

    console.log('Film From Zero website loaded successfully!');
});

// Handle responsive navigation for mobile
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

// Add mobile navigation styles if needed
if (window.innerWidth <= 768) {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            flex-direction: column;
            padding: 1rem;
            border-top: 1px solid var(--border-color);
            display: none;
        }
        
        .nav-menu.mobile-active {
            display: flex;
        }
        
        .nav-container::after {
            content: '☰';
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        }
    `;
    document.head.appendChild(style);
}