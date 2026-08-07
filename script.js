// Smooth scrolling untuk link navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Hanya terapkan untuk link hash di halaman yang sama
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

// Animasi Reveal saat Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 120; // Jarak sebelum elemen muncul

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

// Pasang event listener untuk scroll
window.addEventListener('scroll', revealOnScroll);

// Jalankan sekali saat load agar elemen yang sudah terlihat langsung muncul
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Modal Logic
const modalOverlay = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLive = document.getElementById('modal-live');
const modalGithub = document.getElementById('modal-github');

// Tambahkan event listener ke setiap kartu proyek
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        // Ambil data dari atribut dataset
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const imageClass = card.getAttribute('data-image');
        const github = card.getAttribute('data-github');
        const live = card.getAttribute('data-live');
        const problem = card.getAttribute('data-problem');
        
        const modalProblemContainer = document.getElementById('modal-problem-container');
        const modalProblemText = document.getElementById('modal-problem');
        
        // Isi modal dengan data
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        
        if (problem) {
            modalProblemText.textContent = problem;
            modalProblemContainer.style.display = 'block';
        } else {
            modalProblemContainer.style.display = 'none';
        }
        
        // Reset kelas background img lalu tambahkan yang sesuai
        modalImg.className = 'modal-img ' + imageClass;
        
        // Setup tombol Live Demo
        if (live && live !== '#') {
            modalLive.style.display = 'inline-flex';
            modalLive.href = live;
        } else {
            modalLive.style.display = 'none';
        }
        
        // Setup tombol GitHub
        if (github && github !== '#') {
            modalGithub.style.display = 'inline-flex';
            modalGithub.href = github;
        } else {
            modalGithub.style.display = 'none';
        }
        
        // Tampilkan modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // cegah background scrolling
    });
});

// Fungsi tutup modal
const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // kembalikan scrolling
};

modalClose.addEventListener('click', closeModal);

// Tutup modal jika user mengklik area luar konten
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// --- Canvas Interactive Background ---
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let width, height;
    let dots = [];
    const mouse = { x: null, y: null, radius: 120 }; // Radius penyebaran
    // Palet warna gradasi Biru & Ungu untuk bintang
    const colors = ['#00f0ff', '#8a2be2', '#3b82f6', '#a855f7', '#ffffff', '#e0e7ff'];

    const initCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        dots = [];
        
        // Buat sebaran bintang acak
        const totalStars = Math.floor((width * height) / 5000); // Kerapatan bintang
        for (let i = 0; i < totalStars; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            let radius = Math.random() * 1.5 + 0.5; // Ukuran acak 0.5 hingga 2px
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
                speed: Math.random() * 0.5 + 0.1, // Floating speed
                twinkle: Math.random() * 0.05 // Twinkle speed
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
            // Melayang pelan ke atas (Outer space float effect)
            dot.baseY -= dot.speed;
            
            // Efek parallax: jika bintang keluar batas atas layar, munculkan lagi dari bawah
            if (dot.baseY < -50) {
                dot.baseY = height + 50;
                dot.baseX = Math.random() * width;
                dot.x = dot.baseX;
                dot.y = dot.baseY;
            }

            let dx = mouse.x - dot.x;
            let dy = mouse.y - dot.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            // Tolakan dari kursor mouse
            if (mouse.x != null && distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                
                let force = (mouse.radius - distance) / mouse.radius;
                
                let directionX = forceDirectionX * force * -5;
                let directionY = forceDirectionY * force * -5;
                
                dot.vx += directionX;
                dot.vy += directionY;
            }
            
            // Gaya pegas (Spring) ke posisi melayang (base)
            let dxBase = dot.baseX - dot.x;
            let dyBase = dot.baseY - dot.y;
            
            dot.vx += dxBase * 0.03; // Lebih lemah agar terasa mengambang
            dot.vy += dyBase * 0.03;
            
            // Gesekan/Friction
            dot.vx *= 0.85;
            dot.vy *= 0.85;
            
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Efek Twinkle (Kelap Kelip)
            let currentAlpha = Math.abs(Math.sin(Date.now() * dot.twinkle * 0.01));
            ctx.globalAlpha = 0.2 + (currentAlpha * 0.8);
            
            // Atur warna dan pendaran
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

// --- Preloader Logic ---
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1500); // 1.5 detik animasi
    });
}

// --- Custom Sci-Fi Cursor Logic ---
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
        
        // Dot langsung mengikuti posisi kursor (fixed frame)
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Animasi cincin mengikuti dot dengan efek perlambatan (easing)
    const animateRing = () => {
        let dx = mouseX - ringX;
        let dy = mouseY - ringY;
        
        ringX += dx * 0.2; // kecepatan mengikuti
        ringY += dy * 0.2;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateRing);
    };
    animateRing();

    // Efek membesar (hover) saat menyentuh elemen interaktif
    const hoverElements = document.querySelectorAll('a, button, .project-card, .gallery-item, .glass-card, .timeline-content');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-effect'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-effect'));
    });
}

// --- Contact Form AJAX Submission (Formspree) ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah reload halaman
        
        const form = e.target;
        const data = new FormData(form);
        const url = form.action;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const originalBg = submitBtn.style.background;
        const originalColor = submitBtn.style.color;
        
        // State loading
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
                // Jika sukses
                submitBtn.textContent = 'Sent! ✔️';
                submitBtn.style.background = '#00f0ff'; // Neon cyan
                submitBtn.style.color = '#000000'; // Teks hitam
                form.reset(); // Kosongkan form
                
                // Kembalikan tombol seperti semula setelah 3 detik
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.style.color = originalColor;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                // Jika gagal validasi dari Formspree
                alert('Oops! An error occurred while sending your message.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            // Jika koneksi terputus
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

    // Periksa jumlah item
    const items = grid.children;
    if (items.length <= 6) {
        // Sembunyikan tombol jika item tidak lebih dari 6
        btn.parentElement.classList.add('hidden');
        return;
    }

    btn.addEventListener('click', () => {
        grid.classList.toggle('show-all');
        
        if (grid.classList.contains('show-all')) {
            btn.textContent = 'Show Less ⬆️';
        } else {
            btn.textContent = 'Show More ⬇️';
            // Gulir kembali ke atas grid sedikit agar pengguna tahu elemennya menyusut
            grid.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });
};

// Inisialisasi untuk Projects dan Gallery
document.addEventListener('DOMContentLoaded', () => {
    setupPagination('.project-grid', 'load-more-projects');
    setupPagination('.gallery-grid', 'load-more-gallery');
    
    // Auto Horizontal Scroll with Mouse Wheel
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        let scrollTimeout;
        projectGrid.addEventListener('wheel', (e) => {
            const isScrollable = projectGrid.scrollWidth > projectGrid.clientWidth;
            
            if (isScrollable) {
                const atStart = projectGrid.scrollLeft <= 0 && e.deltaY < 0;
                const atEnd = Math.ceil(projectGrid.scrollLeft) >= (projectGrid.scrollWidth - projectGrid.clientWidth) && e.deltaY > 0;
                
                // Mencegah scroll vertikal halaman jika masih bisa scroll horizontal
                if (!atStart && !atEnd) {
                    e.preventDefault();
                    
                    // Menggunakan scrollBy bawaan browser untuk animasi sangat mulus
                    projectGrid.scrollBy({
                        left: e.deltaY * 4, // Dikali 4 agar sangat gesit dan responsif
                        behavior: 'smooth'
                    });
                }
            }
        }, { passive: false });
    }
});
