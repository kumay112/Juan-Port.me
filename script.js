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

function renderProjects() {

    const container = document.getElementById('project-container');

    if (!container) return;

    let html = '';

    projectsData.forEach((proj, index) => {

        const displayStyle = index >= 6 ? 'style="display: none;"' : '';

        const hiddenClass = index >= 6 ? 'hidden-project' : '';

        let links = '';

        if (proj.live && proj.live !== "#") {

            links += `<a href="${proj.live}" target="_blank" class="card-link" onclick="event.stopPropagation()">&#8599; Live Demo</a>`;

        }

        if (proj.github && proj.github !== "#") {

            links += `<a href="${proj.github}" target="_blank" class="card-link" onclick="event.stopPropagation()">&lt;/&gt; GitHub</a>`;

        }

        html += `

        <div class="project-card" data-title="${proj.title}" data-image="${proj.image}" data-desc="${proj.desc}" data-problem="${proj.problem}" data-github="${proj.github}" data-live="${proj.live}">

            <div class="project-img" style="background-image: url('${proj.image}');"></div>

            <div class="project-info">

                <h3>${proj.title}</h3>

                <p>${proj.desc.substring(0, 100)}...</p>

                <div class="card-links">

                    ${links}

                </div>

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

            preloader.style.opacity = '0';

            preloader.style.visibility = 'hidden';

        }, 1500); 

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

    const projectGrid = document.querySelector('.project-grid');

    if (projectGrid) {

        let scrollTimeout;

        projectGrid.addEventListener('wheel', (e) => {

            const isScrollable = projectGrid.scrollWidth > projectGrid.clientWidth;

            if (isScrollable) {

                const atStart = projectGrid.scrollLeft <= 0 && e.deltaY < 0;

                const atEnd = Math.ceil(projectGrid.scrollLeft) >= (projectGrid.scrollWidth - projectGrid.clientWidth) && e.deltaY > 0;

                if (!atStart && !atEnd) {

                    e.preventDefault();

                    projectGrid.scrollBy({

                        left: e.deltaY * 4, 

                        behavior: 'smooth'

                    });

                }

            }

        }, { passive: false });

    }

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