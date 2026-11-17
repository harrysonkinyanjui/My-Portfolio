// 1. Dynamic Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Typing Effect in Hero Section
const roles = [
    "Web Developer",
    "Python Programmer",
    "C & C++ Enthusiast",
    "Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typingText');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// 3. Dark / Light Theme Toggle with LocalStorage
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 4. Mobile Navigation Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 5. Scroll Reveal Animation
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));

// 6. Contact Form Handling (Redirects to WhatsApp with pre-filled message)
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) {
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please enter a valid name.';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please enter a valid email address.';
        return;
    }

    if (message.length < 5) {
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please enter a slightly longer message.';
        return;
    }

    formFeedback.style.color = '#0d9488';
    formFeedback.textContent = `Thanks ${name}! Opening WhatsApp to send your message...`;

    // Format WhatsApp message for 0792123186 (+254792123186)
    const whatsappText = `Hello Harrison, my name is ${name} (${email}). ${message}`;
    const whatsappURL = `https://wa.me/254792123186?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        contactForm.reset();
    }, 1000);
});
