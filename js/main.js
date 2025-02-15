// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize Sliders
function initializeSlider(containerClass) {
    const container = document.querySelector(`.${containerClass}-container`);
    const prevBtn = container.parentElement.querySelector('.prev-btn');
    const nextBtn = container.parentElement.querySelector('.next-btn');
    const dots = container.parentElement.querySelectorAll('.dot');
    let currentSlide = 0;
    const slidesPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const slideCount = Math.ceil(container.children.length / slidesPerView);

    function updateSlider() {
        const slideWidth = 100 / slidesPerView;
        container.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    return { slidesPerView };
}

// Initialize both sliders
const doctorsSlider = initializeSlider('doctors');
const testimonialsSlider = initializeSlider('testimonials');

// Handle window resize for both sliders
window.addEventListener('resize', () => {
    const newSlidesPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    if (newSlidesPerView !== doctorsSlider.slidesPerView || 
        newSlidesPerView !== testimonialsSlider.slidesPerView) {
        location.reload();
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero .dot');
    const prevBtn = document.querySelector('.hero .prev-btn');
    const nextBtn = document.querySelector('.hero .next-btn');
    const sliderContainer = document.querySelector('.hero-slider-container');
    let currentSlide = 0;
    let slideInterval;
    let isHovered = false;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    // Event Listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
            resetInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
            resetInterval();
        });
    }

    function startSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(() => {
            if (!isHovered) {
                nextSlide();
            }
        }, 3000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        isHovered = true;
        stopSlideShow();
    });

    sliderContainer.addEventListener('mouseleave', () => {
        isHovered = false;
        startSlideShow();
    });

    // Start the slideshow
    startSlideShow();
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);

// Add this to your existing JavaScript
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get the current scroll position
    const scrollPosition = window.scrollY + 100; // Offset for header

    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveSection);

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveSection); 