// --- Data Rendering Functions ---
function renderExperience() {

    const container = document.getElementById('experience-container');

    if (!container) return;

    let html = '';

    experienceData.forEach(exp => {

        html += `

        <div class="timeline-item ${exp.position}">

            <div class="timeline-content glass-card">

                <h3 style="font-size: 1.5rem;">${exp.title}</h3>

                <p class="date highlight">${exp.subtitle}</p>

                <p>${exp.description}</p>

            </div>

        </div>`;

    });

    container.innerHTML = html;

}

function renderGallery() {

    const container = document.getElementById('gallery-container');

    if (!container) return;

    let html = '';

    galleryData.forEach((item, index) => {

        html += `

        <div class="gallery-item" style="background-image: url('${item.imageClass}');">

            <div class="gallery-overlay">${item.caption}</div>

        </div>`;

    });

    container.innerHTML = html;

}

renderExperience();

renderProjects();

renderGallery();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (targetId.startsWith('#')) {

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                targetElement.scrollIntoView({

                    behavior: 'smooth'

                });

            }

        }

    });

});

const revealElements = document.querySelectorAll('.reveal');

// --- Scroll Reveal Animations ---
const revealOnScroll = () => {

    const windowHeight = window.innerHeight;

    const elementVisible = 120; 

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {

            element.classList.add('active');

        }

    });

};

window.addEventListener('scroll', revealOnScroll);

document.addEventListener('DOMContentLoaded', revealOnScroll);

// --- Modal Popup Logic ---
const modalOverlay = document.getElementById('project-modal');

const modalClose = document.querySelector('.modal-close');

const modalImg = document.getElementById('modal-img');

const modalTitle = document.getElementById('modal-title');

const modalDesc = document.getElementById('modal-desc');

const modalLive = document.getElementById('modal-live');

const modalGithub = document.getElementById('modal-github');

document.querySelectorAll('.project-card').forEach(card => {

    card.addEventListener('click', () => {

        const title = card.getAttribute('data-title');

        const desc = card.getAttribute('data-desc');

        const imageClass = card.getAttribute('data-image');

        const github = card.getAttribute('data-github');

        const live = card.getAttribute('data-live');

        const problem = card.getAttribute('data-problem');

        const modalProblemContainer = document.getElementById('modal-problem-container');

        const modalProblemText = document.getElementById('modal-problem');

        modalTitle.textContent = title;

        modalDesc.textContent = desc;

        if (problem) {

            modalProblemText.textContent = problem;

            modalProblemContainer.style.display = 'block';

        } else {

            modalProblemContainer.style.display = 'none';

        }

        modalImg.className = 'modal-img';

        modalImg.style.backgroundImage = `url('${imageClass}')`;

        if (live && live !== '#') {

            modalLive.style.display = 'inline-flex';

            modalLive.href = live;

        } else {

            modalLive.style.display = 'none';

        }

        if (github && github !== '#') {

            modalGithub.style.display = 'inline-flex';

            modalGithub.href = github;

        } else {

            modalGithub.style.display = 'none';

        }

        modalOverlay.classList.add('active');

        document.body.style.overflow = 'hidden'; 

    });

});

const closeModal = () => {

    modalOverlay.classList.remove('active');

    document.body.style.overflow = 'auto'; 

    // Reset all zooming images when modal closes
    document.querySelectorAll('.project-img.zooming-out').forEach(img => {
        img.classList.remove('zooming-out');
    });

};

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {

    if (e.target === modalOverlay) {

        closeModal();

    }

});

const canvas = document.getElementById('bg-canvas');

if (canvas) {

    const ctx = canvas.getContext('2d');

    let width, height;

    let dots = [];

    const mouse = { x: null, y: null, radius: 120 }; 

    const colors = ['#00f0ff', '#8a2be2', '#3b82f6', '#a855f7', '#ffffff', '#e0e7ff'];

    const initCanvas = () => {

        width = canvas.width = window.innerWidth;

        height = canvas.height = window.innerHeight;

        dots = [];

        const totalStars = Math.floor((width * height) / 5000); 

        for (let i = 0; i < totalStars; i++) {

            let x = Math.random() * width;

            let y = Math.random() * height;

            let radius = Math.random() * 1.5 + 0.5; 

            let color = colors[Math.floor(Math.random() * colors.length)];

            dots.push({

                x: x,

                y: y,

                baseX: x,

                baseY: y,

                vx: 0,

                vy: 0,

                radius: radius,

                color: color,

                speed: Math.random() * 0.5 + 0.1, 

                twinkle: Math.random() * 0.05 

            });

        }

    };

    window.addEventListener('resize', initCanvas);

    window.addEventListener('mousemove', (e) => {

        mouse.x = e.x;

        mouse.y = e.y;

    });

    window.addEventListener('mouseout', () => {

        mouse.x = null;

        mouse.y = null;

    });

    const animateCanvas = () => {

        ctx.clearRect(0, 0, width, height);

        ctx.shadowBlur = 8;

        dots.forEach(dot => {

            dot.baseY -= dot.speed;

            if (dot.baseY < -50) {

                dot.baseY = height + 50;

                dot.baseX = Math.random() * width;

                dot.x = dot.baseX;

                dot.y = dot.baseY;

            }

            let dx = mouse.x - dot.x;

            let dy = mouse.y - dot.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (mouse.x != null && distance < mouse.radius) {

                let forceDirectionX = dx / distance;

                let forceDirectionY = dy / distance;

                let force = (mouse.radius - distance) / mouse.radius;

                let directionX = forceDirectionX * force * -5;

                let directionY = forceDirectionY * force * -5;

                dot.vx += directionX;

                dot.vy += directionY;

            }

            let dxBase = dot.baseX - dot.x;

            let dyBase = dot.baseY - dot.y;

            dot.vx += dxBase * 0.03; 

            dot.vy += dyBase * 0.03;

            dot.vx *= 0.85;

            dot.vy *= 0.85;

            dot.x += dot.vx;

            dot.y += dot.vy;

            let currentAlpha = Math.abs(Math.sin(Date.now() * dot.twinkle * 0.01));

            ctx.globalAlpha = 0.2 + (currentAlpha * 0.8);

            ctx.fillStyle = dot.color;

            ctx.shadowColor = dot.color;

            ctx.beginPath();

            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

            ctx.fill();

        });

        ctx.globalAlpha = 1.0;

        requestAnimationFrame(animateCanvas);

    };

    initCanvas();

    animateCanvas();

}

const preloader = document.getElementById('preloader');

if (preloader) {

    window.addEventListener('load', () => {
        setTimeout(() => {
            const profile = document.querySelector('.preloader-profile');
            if(profile) {
                profile.classList.add('zoom-fade-anim');
            }
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800); // Wait for zoom animation to finish
        }, 800); // Initial delay before zoom starts
    });

}

const cursorDot = document.getElementById('cursor-dot');

const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing) {

    let mouseX = window.innerWidth / 2;

    let mouseY = window.innerHeight / 2;

    let ringX = window.innerWidth / 2;

    let ringY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {

        mouseX = e.clientX;

        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';

        cursorDot.style.top = mouseY + 'px';

    });

    const animateRing = () => {

        let dx = mouseX - ringX;

        let dy = mouseY - ringY;

        ringX += dx * 0.2; 

        ringY += dy * 0.2;

        cursorRing.style.left = ringX + 'px';

        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateRing);

    };

    animateRing();

    const hoverElements = document.querySelectorAll('a, button, .project-card, .gallery-item, .glass-card, .timeline-content');

    hoverElements.forEach(el => {

        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-effect'));

        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-effect'));

    });

}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault(); 

        const form = e.target;

        const data = new FormData(form);

        const url = form.action;

        const submitBtn = form.querySelector('button[type="submit"]');

        const originalText = submitBtn.textContent;

        const originalBg = submitBtn.style.background;

        const originalColor = submitBtn.style.color;

        submitBtn.textContent = 'Sending... 🚀';

        submitBtn.disabled = true;

        try {

            const response = await fetch(url, {

                method: 'POST',

                body: data,

                headers: {

                    'Accept': 'application/json'

                }

            });

            if (response.ok) {

                submitBtn.textContent = 'Sent! ✔️';

                submitBtn.style.background = '#00f0ff'; 

                submitBtn.style.color = '#000000'; 

                form.reset(); 

                setTimeout(() => {

                    submitBtn.textContent = originalText;

                    submitBtn.style.background = originalBg;

                    submitBtn.style.color = originalColor;

                    submitBtn.disabled = false;

                }, 3000);

            } else {

                alert('Oops! An error occurred while sending your message.');

                submitBtn.textContent = originalText;

                submitBtn.disabled = false;

            }

        } catch (error) {

            alert('Oops! Failed to connect to the server.');

            submitBtn.textContent = originalText;

            submitBtn.disabled = false;

        }

    });

}

// --- Pagination / View More Logic ---
const setupPagination = (gridSelector, btnId) => {

    const grid = document.querySelector(gridSelector);

    const btn = document.getElementById(btnId);

    if (!grid || !btn) return;

    const items = grid.children;

    if (items.length <= 6) {

        btn.parentElement.classList.add('hidden');

        return;

    }

    btn.addEventListener('click', () => {

        grid.classList.toggle('show-all');

        if (grid.classList.contains('show-all')) {

            btn.textContent = 'Show Less ▲';

        } else {

            btn.textContent = 'Show More ▼';

            grid.scrollIntoView({ behavior: 'smooth', block: 'end' });

        }

    });

};

document.addEventListener('DOMContentLoaded', () => {

    setupPagination('.project-grid', 'load-more-projects');

    setupPagination('.gallery-grid', 'load-more-gallery');

    // Horizontal scroll removed

});

document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger-menu');

    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {

        hamburger.addEventListener('click', () => {

            hamburger.classList.toggle('active');

            navLinks.classList.toggle('active');

        });

        document.querySelectorAll('.nav-links li a').forEach(link => {

            link.addEventListener('click', () => {

                hamburger.classList.remove('active');

                navLinks.classList.remove('active');

            });

        });

    }

});






// Modal Delegation
document.addEventListener('click', (e) => {
    // If the user was just dragging the carousel, don't open the modal!
    if (isDragging) {
        // Reset dragging state but ignore the click
        isDragging = false;
        return;
    }
    
    const card = e.target.closest('.project-card');
    if (!card) return;
    
    // Ignore clicks on links inside the card
    if (e.target.closest('a')) return;

    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const imageClass = card.getAttribute('data-image');
    const github = card.getAttribute('data-github');
    const live = card.getAttribute('data-live');
    const problem = card.getAttribute('data-problem');
    
    const modalProblemContainer = document.getElementById('modal-problem-container');
    const modalProblemText = document.getElementById('modal-problem');
    
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = desc;
    
    if (problem) {
        modalProblemText.textContent = problem;
        modalProblemContainer.style.display = 'block';
    } else {
        modalProblemContainer.style.display = 'none';
    }
    
    const modalImg = document.getElementById('modal-img');
    modalImg.className = 'modal-img';
    modalImg.style.backgroundImage = `url('${imageClass}')`;
    
    const modalLive = document.getElementById('modal-live');
    if (live && live !== '#') {
        modalLive.style.display = 'inline-flex';
        modalLive.href = live;
    } else {
        modalLive.style.display = 'none';
    }
    
    const modalGithub = document.getElementById('modal-github');
    if (github && github !== '#') {
        modalGithub.style.display = 'inline-flex';
        modalGithub.href = github;
    } else {
        modalGithub.style.display = 'none';
    }
    
    const modalOverlay = document.getElementById('project-modal');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
});


// --- 3D Hover Tilt Effect ---
// Completely removed as requested by user to revert to CSS-only animations and prevent jitter.

let currentProjIndex = 0;

function renderProjects() {
    const container = document.getElementById('project-container');
    if (!container) return;
    
    let html = '';
    projectsData.forEach((proj, index) => {
        let activeClass = index === 0 ? 'active' : 'flipped-right';
        html += `
            <div class="project-card ${activeClass}" data-index="${index}" data-title="${proj.title}" data-image="${proj.image}" data-desc="${proj.desc}" data-problem="${proj.problem}" data-github="${proj.github}" data-live="${proj.live}">
                <img src="${proj.image}" alt="${proj.title}" class="project-img" loading="lazy">
                <div class="project-overlay">
                    <h3 class="front-title">${proj.title}</h3>
                </div>
                <div class="view-details-hint">View Details <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Create pagination dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    let dotsHtml = '';
    projectsData.forEach((_, idx) => {
        dotsHtml += `<div class="dot ${idx === 0 ? 'active' : ''}" data-target="${idx}"></div>`;
    });
    dotsContainer.innerHTML = dotsHtml;
    // Insert dots after the slider wrapper
    const wrapper = document.querySelector('.slider-wrapper');
    if(wrapper && !document.querySelector('.carousel-dots')) {
        wrapper.parentNode.insertBefore(dotsContainer, wrapper.nextSibling);
    }
    
    initPageTurnLogic();
    attachModalClick();
}

function initPageTurnLogic() {
    const prevBtn = document.getElementById('proj-prev');
    const nextBtn = document.getElementById('proj-next');
    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.dot');
    
    function showProject(newIndex, direction = 'next') {
        if (newIndex === currentProjIndex) return;
        
        const currentCard = cards[currentProjIndex];
        const nextCard = cards[newIndex];
        
        // Remove active from old card
        currentCard.classList.remove('active');
        // If moving next, old card flips to left. If moving prev, old card flips to right.
        if (direction === 'next') {
            currentCard.style.transformOrigin = 'left center';
            currentCard.classList.add('flipped-left');
            currentCard.classList.remove('flipped-right');
            
            nextCard.style.transformOrigin = 'right center';
            nextCard.classList.remove('flipped-left');
            nextCard.classList.add('flipped-right');
        } else {
            currentCard.style.transformOrigin = 'right center';
            currentCard.classList.add('flipped-right');
            currentCard.classList.remove('flipped-left');
            
            nextCard.style.transformOrigin = 'left center';
            nextCard.classList.remove('flipped-right');
            nextCard.classList.add('flipped-left');
        }
        
        // Force reflow
        void nextCard.offsetWidth;
        
        // Bring in new card
        nextCard.classList.add('active');
        nextCard.classList.remove('flipped-left', 'flipped-right');
        
        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        dots[newIndex].classList.add('active');
        
        currentProjIndex = newIndex;
    }
    
    
    // Mousewheel to flip
    const sliderWrapper = document.querySelector('.slider-wrapper');
    let isWheeling = false;
    
    if (sliderWrapper) {
        sliderWrapper.addEventListener('wheel', (e) => {
            e.preventDefault(); // Mencegah halaman turun
            
            if (isWheeling) return;
            isWheeling = true;
            
            if (e.deltaY > 0) {
                // Scroll down -> Next
                let nextIdx = currentProjIndex + 1;
                if (nextIdx >= cards.length) nextIdx = 0;
                showProject(nextIdx, 'next');
            } else {
                // Scroll up -> Prev
                let nextIdx = currentProjIndex - 1;
                if (nextIdx < 0) nextIdx = cards.length - 1;
                showProject(nextIdx, 'prev');
            }
            
            // Throttle wheel event to prevent rapid flipping
            setTimeout(() => {
                isWheeling = false;
            }, 1000); // 1 detik cooldown
        }, { passive: false });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            let nextIdx = currentProjIndex - 1;
            if (nextIdx < 0) nextIdx = cards.length - 1; // loop
            showProject(nextIdx, 'prev');
        });
        
        nextBtn.addEventListener('click', () => {
            let nextIdx = currentProjIndex + 1;
            if (nextIdx >= cards.length) nextIdx = 0; // loop
            showProject(nextIdx, 'next');
        });
    }
    
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            if (idx > currentProjIndex) showProject(idx, 'next');
            else if (idx < currentProjIndex) showProject(idx, 'prev');
        });
    });
}

function attachModalClick() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const modal = document.getElementById('project-modal');
            const modalImg = document.getElementById('modal-img');
            const modalTitle = document.getElementById('modal-title');
            const modalDesc = document.getElementById('modal-desc');
            const modalProblem = document.getElementById('modal-problem');
            const modalLive = document.getElementById('modal-live');
            const modalGithub = document.getElementById('modal-github');
            
            if (!modal) return;
            
            modalImg.style.backgroundImage = `url('${card.getAttribute('data-image')}')`;
            modalTitle.textContent = card.getAttribute('data-title');
            modalDesc.textContent = card.getAttribute('data-desc');
            
            const prob = card.getAttribute('data-problem');
            if (prob && prob !== "undefined") {
                modalProblem.innerHTML = `<strong>Problem Solved:</strong> ${prob}`;
                modalProblem.style.display = 'block';
            } else {
                modalProblem.style.display = 'none';
            }
            
            const live = card.getAttribute('data-live');
            if (live && live !== "#" && live !== "undefined") {
                modalLive.href = live;
                modalLive.style.display = 'inline-block';
            } else {
                modalLive.style.display = 'none';
            }
            
            const github = card.getAttribute('data-github');
            if (github && github !== "#" && github !== "undefined") {
                modalGithub.href = github;
                modalGithub.style.display = 'inline-block';
            } else {
                modalGithub.style.display = 'none';
            }
            
            // Add zooming animation to the image
            const imgElement = card.querySelector('.project-img');
            if (imgElement) {
                imgElement.classList.add('zooming-out');
            }
            
            // Delay modal appearance by 800ms for the slower animation
            setTimeout(() => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 800);
        });
    });
}


// --- Autonomous Comets Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const cometConfigs = [
        { color: 'rgba(0, 240, 255, 0.8)', size: 35 },    // Ice Comet (Cyan) - Medium
        { color: 'rgba(255, 100, 50, 0.8)', size: 50 },   // Fire Comet (Orange) - Big
        { color: 'rgba(200, 50, 255, 0.8)', size: 20 }    // Plasma Comet (Purple) - Small
    ];

    const svgTemplate = `
        <svg class="comet-svg" viewBox="0 0 24 24" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1">
            <path d="M10,2 L18,5 L22,12 L19,20 L11,22 L3,17 L2,9 L6,3 Z"></path>
            <circle cx="8" cy="10" r="2" fill="#64748b"></circle>
            <circle cx="16" cy="14" r="3" fill="#64748b"></circle>
            <circle cx="12" cy="18" r="1.5" fill="#64748b"></circle>
        </svg>
    `;

    cometConfigs.forEach((config, index) => {
        // Create Comet Container
        const comet = document.createElement('div');
        comet.className = 'comet-container';
        comet.innerHTML = svgTemplate;
        
        // Apply size
        comet.style.width = `${config.size}px`;
        comet.style.height = `${config.size}px`;
        
        // Apply glow color
        const svgElement = comet.querySelector('.comet-svg');
        svgElement.style.filter = `drop-shadow(0 0 10px ${config.color})`;
        
        document.body.appendChild(comet);
        
        // Give them staggered starting positions and delays
        let currentX = (window.innerWidth / 4) * (index + 1);
        let currentY = 100 + (index * 50);
        
        // Set initial position immediately without transition
        comet.style.transition = 'none';
        comet.style.transform = `translate(${currentX}px, ${currentY}px)`;
        
        // Force reflow so transition applies to next move
        comet.offsetHeight; 
        comet.style.transition = 'transform 10s ease-in-out';
        
        // Start emitting smoke continuously
        setInterval(() => {
            // Get CURRENT computed position of comet for smoke
            const rect = comet.getBoundingClientRect();
            // Get actual scroll position to place smoke absolutely on document
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollX = window.scrollX || window.pageXOffset;
            
            const smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            
            // Scale smoke relative to comet size
            smoke.style.width = `${config.size / 2.5}px`;
            smoke.style.height = `${config.size / 2.5}px`;
            
            // Tint the smoke slightly with the comet's color using a box-shadow or background
            // Background is radial gradient in CSS, we can overwrite it inline
            // To make it look good, we mix white with the comet's color
            const rawColor = config.color.replace('0.8)', '0.4)'); // Make it more transparent
            smoke.style.background = `radial-gradient(circle, ${rawColor} 0%, rgba(255,255,255,0) 70%)`;
            
            // Place at center of comet
            smoke.style.left = (rect.left + scrollX + rect.width / 2) + 'px';
            smoke.style.top = (rect.top + scrollY + rect.height / 2) + 'px';
            
            document.body.appendChild(smoke);
            
            // Remove smoke after animation finishes (2s)
            setTimeout(() => {
                if (smoke.parentNode) {
                    smoke.parentNode.removeChild(smoke);
                }
            }, 2000);
        }, 300); // emit smoke every 300ms
        
        function moveComet() {
            // Find bounds
            const aboutSection = document.getElementById('about');
            const maxY = aboutSection ? aboutSection.offsetTop + 200 : window.innerHeight; // Don't go below asteroids
            const maxX = window.innerWidth - 100;
            
            // Pick new random target
            const targetX = Math.random() * maxX + 50;
            const targetY = Math.random() * maxY;
            
            // Calculate angle to target
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            
            // 0 is right, PI/2 is down.
            let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Move the comet!
            comet.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${angleDeg}deg)`;
            
            currentX = targetX;
            currentY = targetY;
            
            // Schedule next movement immediately when this one finishes (10s)
            setTimeout(moveComet, 10000);
        }
        
        // Start movement with staggered delay based on index
        setTimeout(moveComet, 100 + (index * 2000));
    });
});



// --- Autonomous Satellites Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // We need SVGs for two types of satellites
    const svgSputnik = `
        <svg class="satellite-svg" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" fill="#94a3b8"></circle>
            <path d="M12 8V2" />
            <path d="M12 16v6" />
            <path d="M8 12H2" />
            <path d="M16 12h6" />
            <path d="M9.17 9.17L4.93 4.93" />
            <path d="M14.83 14.83l4.24 4.24" />
            <path d="M14.83 9.17l4.24-4.24" />
            <path d="M9.17 14.83l-4.24 4.24" />
        </svg>
    `;

    const svgModern = `
        <svg class="satellite-svg" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linejoin="round">
            <!-- Solar panel left -->
            <rect x="2" y="9" width="5" height="6" fill="#1e293b" stroke="#64748b"></rect>
            <!-- Solar panel right -->
            <rect x="17" y="9" width="5" height="6" fill="#1e293b" stroke="#64748b"></rect>
            <!-- Body -->
            <rect x="9" y="7" width="6" height="10" rx="1" fill="#94a3b8"></rect>
            <!-- Antennas -->
            <path d="M12 7V3" />
            <path d="M10 3h4" />
            <!-- Connections -->
            <path d="M7 12h2" />
            <path d="M15 12h2" />
        </svg>
    `;

    const satelliteConfigs = [
        { type: 'sputnik', size: 30, svg: svgSputnik },
        { type: 'modern', size: 55, svg: svgModern }
    ];

    satelliteConfigs.forEach((config, index) => {
        // Wait a bit to ensure dividers are fully rendered before calculating bounds
        setTimeout(() => {
            const expSection = document.getElementById('experience');
            const galSection = document.getElementById('gallery');
            const minY = expSection ? expSection.offsetTop : 1000;
            const maxY = galSection ? galSection.offsetTop : 3000;
            const maxX = window.innerWidth - 100;
            
            // If the section is too small, abort
            if (maxY <= minY) return;

            // Create Satellite Container
            const satellite = document.createElement('div');
            satellite.className = 'satellite-container';
            satellite.innerHTML = config.svg;
            
            // Apply size
            satellite.style.width = `${config.size}px`;
            satellite.style.height = `${config.size}px`;
            
            document.body.appendChild(satellite);
            
            // Give them staggered starting positions
            let currentX = (window.innerWidth / 3) * (index + 1);
            let currentY = minY + ((maxY - minY) / 2) + (index * 100);
            
            // Set initial position immediately without transition
            satellite.style.transition = 'none';
            satellite.style.transform = `translate(${currentX}px, ${currentY}px)`;
            
            // Force reflow
            satellite.offsetHeight; 
            satellite.style.transition = 'transform 20s linear';
            
            function moveSatellite() {
                // Re-calculate bounds in case window resized
                const currentExp = document.getElementById('experience');
                const currentGal = document.getElementById('gallery');
                const safeMinY = currentExp ? currentExp.offsetTop : 1000;
                const safeMaxY = currentGal ? currentGal.offsetTop : 3000;
                const safeMaxX = window.innerWidth - 80;
                
                // Pick new random target within bounds
                const targetX = Math.random() * safeMaxX + 40;
                const targetY = safeMinY + (Math.random() * (safeMaxY - safeMinY));
                
                // Move the satellite
                satellite.style.transform = `translate(${targetX}px, ${targetY}px)`;
                
                currentX = targetX;
                currentY = targetY;
                
                // Schedule next movement immediately when this one finishes (20s)
                setTimeout(moveSatellite, 20000);
            }
            
            // Start movement
            setTimeout(moveSatellite, 100 + (index * 5000));
        }, 1000); // 1s delay to let DOM stabilize
    });
});

