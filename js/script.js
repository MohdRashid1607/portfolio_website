/* ========== MENU ICON NAVBAR ========== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/* ========== SCROLL SECTIONS ACTIVE LINK ========== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let target = document.querySelector('header nav a[href*=' + id + ']');
                if (target) target.classList.add('active');
            });
        }
    });

    /* ========== STICKY NAVBAR ========== */
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* ========== REMOVE MENU ON SCROLL ========== */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    /* ========== SCROLL PROGRESS BAR ========== */
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + '%';

    /* ========== SKILL BARS ANIMATION ========== */
    animateSkillBars();

    /* ========== COUNTER ANIMATION ========== */
    animateCounters();
};


/* ========== SWIPER ========== */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


/* ========== DARK / LIGHT MODE ========== */
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Persist dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.add('bx-sun');
}


/* ========== SCROLL REVEAL ========== */
ScrollReveal({
    distance: '60px',
    duration: 1800,
    delay: 150,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
});

ScrollReveal().reveal('.home-content, .heading, .section-eyebrow', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact-wrapper', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.process-step', { origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.skills-wrapper', { origin: 'bottom' });
ScrollReveal().reveal('.skill-item', { origin: 'left', interval: 100 });


/* ========== TYPING ANIMATION ========== */
const roles = [
    'responsive web apps.',
    'Python applications.',
    'UI/UX experiences.',
    'interactive games.',
    'API integrations.',
    'creative digital projects.'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
    if (!typedEl) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 110);
}

setTimeout(typeEffect, 800);


/* ========== COUNTER ANIMATION ========== */
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    // target either the new inline stats or old home-stats
    const countersSection = document.querySelector('.home-stats-inline, .home-stats');
    if (!countersSection) return;

    const rect = countersSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
        countersAnimated = true;
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const increment = target / 50;

            const update = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }
}


/* ========== SKILL BARS ========== */
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-fill').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
}

// Initial check on load
animateSkillBars();
animateCounters();


/* ========== PORTFOLIO FILTER ========== */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioBoxes.forEach(box => {
            const category = box.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                box.style.display = '';
                box.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                box.style.display = 'none';
            }
        });
    });
});


/* ========== CONTACT FORM ========== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.btn-submit');

        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            if (response.status == 200) {
                if (formSuccess) formSuccess.classList.add('show');
                contactForm.reset();
            }
        })
        .catch(error => {
            console.error("Error sending message:", error);
        })
        .finally(() => {
            submitBtn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
            submitBtn.style.opacity = '1';
            setTimeout(() => {
                if (formSuccess) formSuccess.classList.remove('show');
            }, 5000);
        });
    });
}


/* ========== SMOOTH SCROLL FOR NAV LINKS ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* ========== FADE IN ANIMATION ========== */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

/* ========== CERTIFICATES SWIPER ========== */
var certSwiper = new Swiper(".cert-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    speed: 800,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".cert-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".cert-btn-next",
        prevEl: ".cert-btn-prev",
    },
    breakpoints: {
        640:  { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1400: { slidesPerView: 4, spaceBetween: 24 },
    },
});