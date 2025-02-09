// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add active class to current section
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const formEntries = Object.fromEntries(formData);
        console.log('Form submitted:', formEntries);
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInElements = document.querySelectorAll('.project-card, .skill-tag');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Initialize Three.js Scene
let scene, camera, renderer, particles;

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 1000;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
        color: 0x3498db,
        size: 2,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 500;
}

function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Parallax Background Effect
function initParallax() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const background = document.createElement('div');
    background.className = 'parallax-background';
    hero.insertBefore(background, content);
    
    // AI/ML related icons
    const icons = [
        '<svg class="tech-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>', // Neural Network
        '<svg class="tech-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H8v-2h4V7h2v10z"/></svg>', // Data
        '<svg class="tech-icon" viewBox="0 0 24 24"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"/></svg>', // ML Algorithm
        '<svg class="tech-icon" viewBox="0 0 24 24"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"/></svg>', // AI
        '<svg class="tech-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.6 14.2L6.4 17l1.1-11 11 1.1-1.1 11z"/></svg>' // Deep Learning
    ];
    
    // Create floating tech icons
    for (let i = 0; i < 15; i++) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'tech-icon-wrapper parallax-element';
        iconWrapper.innerHTML = icons[i % icons.length];
        
        // Random position
        iconWrapper.style.left = `${Math.random() * 100}%`;
        iconWrapper.style.top = `${Math.random() * 100}%`;
        
        // Random size between 20px and 40px
        const size = Math.random() * 20 + 20;
        iconWrapper.style.width = `${size}px`;
        iconWrapper.style.height = `${size}px`;
        
        // Random rotation
        iconWrapper.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random opacity
        iconWrapper.style.opacity = Math.random() * 0.15 + 0.05;
        
        background.appendChild(iconWrapper);
    }

    // Create small floating elements
    for (let i = 0; i < 30; i++) {
        const element = document.createElement('div');
        element.className = 'parallax-element';
        
        // Randomly assign shapes
        if (Math.random() > 0.5) {
            element.classList.add('circle');
        } else {
            element.classList.add('square');
        }
        
        // Smaller random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random opacity between 0.05 and 0.15
        element.style.opacity = Math.random() * 0.1 + 0.05;
        
        background.appendChild(element);
    }

    // Move background on mouse move
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Move the entire background
        const moveX = (clientX - centerX) * 0.05;
        const moveY = (clientY - centerY) * 0.05;
        
        gsap.to(background, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Move content slightly for parallax effect
        gsap.to(content, {
            x: moveX * 0.02,
            y: moveY * 0.02,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.texts = [
            'Machine Learning',
            'Deep Learning',
            'Computer Vision',
            'Natural Language Processing',
            'Data Science'
        ];
        this.typedTextSpan = document.querySelector('.typed-text');
        this.cursorSpan = document.querySelector('.cursor');
        
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typingDelay = 100;
        this.erasingDelay = 50;
        this.newTextDelay = 2000;
        
        if (this.typedTextSpan && this.cursorSpan) {
            this.type();
        }
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        const shouldType = !this.isDeleting;
        
        const text = shouldType 
            ? currentText.substring(0, this.charIndex + 1)
            : currentText.substring(0, this.charIndex - 1);

        if (this.typedTextSpan) {
            this.typedTextSpan.textContent = text;
        }

        let typeSpeed = shouldType ? this.typingDelay : this.erasingDelay;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.newTextDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        this.charIndex = shouldType ? this.charIndex + 1 : this.charIndex - 1;

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Add cursor blink animation
const styles = `
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingAnimation();
    init3D();
    initParallax();
});

// Glitch effect on hover
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseover', () => {
        glitchText.style.animation = 'glitch 200ms infinite';
    });
    
    glitchText.addEventListener('mouseout', () => {
        glitchText.style.animation = 'glitch 500ms infinite';
    });
    
    glitchText.addEventListener('click', () => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'glitch 500ms infinite';
        }, 50);
    });
}

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 100;
        this.connectionDistance = 150;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseInCanvas = false;
        
        this.init();
        this.animate();
        
        // Track mouse position
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        // Track mouse enter/leave
        this.canvas.addEventListener('mouseenter', () => {
            this.isMouseInCanvas = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isMouseInCanvas = false;
        });
        
        window.addEventListener('resize', () => this.updateCanvasSize());
    }
    
    init() {
        this.updateCanvasSize();
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    updateCanvasSize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
        
        // Recreate particles
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
        };
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(100, 181, 246, 0.8)';
            this.ctx.fill();
            
            // Connect to nearby particles
            this.connectParticles(particle, this.particles.slice(index + 1));
            
            // Connect to mouse if it's in canvas
            if (this.isMouseInCanvas) {
                const mouseDistance = Math.hypot(particle.x - this.mouseX, particle.y - this.mouseY);
                if (mouseDistance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouseX, this.mouseY);
                    const opacity = 1 - (mouseDistance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(100, 181, 246, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    connectParticles(particle, otherParticles) {
        otherParticles.forEach(otherParticle => {
            const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);
            
            if (distance < this.connectionDistance) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(otherParticle.x, otherParticle.y);
                const opacity = 1 - (distance / this.connectionDistance);
                this.ctx.strokeStyle = `rgba(100, 181, 246, ${opacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
});
