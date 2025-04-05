// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initSmoothScrolling();
    initFormValidation();
    initScrollAnimations();
    initMobileMenu();
    initLazyLoading();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        let isValid = true;

        // Name validation
        if (name.value.length < 3) {
            showError(name, 'Please enter a valid name (at least 3 characters)');
            isValid = false;
        } else {
            clearError(name);
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }

        // Phone validation (optional)
        if (phone.value && !/^[\d\s\-()+]{8,}$/.test(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phone);
        }

        if (isValid) {
            // Form is valid - could send to server here
            alert('Thank you for your inquiry! We will contact you soon.');
            this.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.closest('.mb-4');
    if (!formGroup) return;
    
    let error = formGroup.querySelector('.error-message');
    if (!error) {
        error = document.createElement('p');
        error.className = 'error-message text-red-600 text-sm mt-1';
        formGroup.appendChild(error);
    }
    error.textContent = message;
    input.classList.add('border-red-500');
}

function clearError(input) {
    const formGroup = input.closest('.mb-4');
    if (!formGroup) return;
    
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.classList.remove('border-red-500');
}

// Scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.classList.toggle('open');
        });
    }
}

// Image lazy loading
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    lazyLoadObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
}

// Current year in footer
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}