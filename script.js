// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== FORM SUBMISSION HANDLING =====
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn');
  const originalText = btn.textContent;
  
  // Show loading state
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    btn.style.background = 'var(--gradient-secondary)';
    
    // Reset button after 2 seconds
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = 'var(--gradient-primary)';
      this.reset();
    }, 2000);
  }, 1000);
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ===== DYNAMIC BACKGROUND ANIMATION =====
const bgAnimation = document.querySelector('.bg-animation');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Create subtle mouse-following effect
  if (bgAnimation) {
    bgAnimation.style.transform = `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)`;
  }
});

// ===== PARALLAX EFFECT FOR HERO IMAGE =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector('.hero-img img');
  
  if (heroImg) {
    heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// ===== SKILL CIRCLE ANIMATION =====
function animateSkillCircles() {
  const skillCircles = document.querySelectorAll('.skill-circle');
  
  skillCircles.forEach(circle => {
    const percentage = circle.textContent;
    const numericValue = parseInt(percentage);
    
    // Add animation when circle comes into view
    const circleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCircle(entry.target, numericValue);
          circleObserver.unobserve(entry.target);
        }
      });
    });
    
    circleObserver.observe(circle);
  });
}

function animateCircle(circle, targetValue) {
  let currentValue = 0;
  const increment = targetValue / 50; // Animation duration control
  
  const animation = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(animation);
    }
    circle.textContent = Math.round(currentValue) + '%';
  }, 30);
}

// ===== PORTFOLIO CARD HOVER EFFECTS =====
function addPortfolioEffects() {
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = 'var(--shadow-glow)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'var(--shadow-soft)';
    });
  });
}

// ===== TYPING EFFECT FOR HERO TEXT =====
function typingEffect() {
  const heroText = document.querySelector('.highlight');
  if (!heroText) return;
  
  const text = heroText.textContent;
  heroText.textContent = '';
  
  let i = 0;
  const typeWriter = setInterval(() => {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeWriter);
    }
  }, 100);
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 46, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'var(--secondary-bg)';
      header.style.backdropFilter = 'none';
    }
  });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function improveAccessibility() {
  // Add keyboard navigation for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.click();
      }
    });
  });
  
  // Add focus indicators
  const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
  focusableElements.forEach(el => {
    el.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--primary-accent)';
      this.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });
}

// ===== LAZY LOADING FOR IMAGES =====
function lazyLoadImages() {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  animateSkillCircles();
  addPortfolioEffects();
  handleNavbarScroll();
  improveAccessibility();
  lazyLoadImages();
  
  // Add typing effect with delay
  setTimeout(() => {
    typingEffect();
  }, 500);
   // Console welcome message
  console.log('🎨 Welcome to Alex Rivera\'s Portfolio!');
});