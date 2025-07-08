// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal-top, .reveal-bottom, .reveal-left, .reveal-right, .reveal-line');
  
  function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      // Apply delay for staggered animation if specified
      const delay = revealElements[i].getAttribute('data-delay');
      
      if (elementTop < windowHeight - elementVisible) {
        setTimeout(() => {
          revealElements[i].classList.add('active');
        }, delay || 0);
      }
    }
  }
  
  // Run on load
  revealOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', revealOnScroll);

  // Parallax effect for shapes and sections
  const parallaxElements = document.querySelectorAll('.shape');
  
  function parallaxEffect() {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05);
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  window.addEventListener('scroll', parallaxEffect);

  // Tilt effect for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const cardRect = this.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      const maxRotation = 10; // Maximum rotation in degrees
      const rotateX = (mouseY / (cardRect.height / 2)) * -maxRotation;
      const rotateY = (mouseX / (cardRect.width / 2)) * maxRotation;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // 3D card effect for about card
  const aboutCard = document.querySelector('.about-card');
  
  if (aboutCard) {
    aboutCard.addEventListener('mousemove', function(e) {
      const cardRect = this.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      const maxRotation = 5; // Maximum rotation in degrees
      const rotateX = (mouseY / (cardRect.height / 2)) * -maxRotation;
      const rotateY = (mouseX / (cardRect.width / 2)) * maxRotation;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Add shine effect
      const shine = this.querySelector('.shine');
      if (shine) {
        const x = (e.clientX - cardRect.left) / cardRect.width * 100;
        const y = (e.clientY - cardRect.top) / cardRect.height * 100;
        shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
      }
    });
    
    aboutCard.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      
      const shine = this.querySelector('.shine');
      if (shine) {
        shine.style.background = 'none';
      }
    });
  }

  // Scroll-triggered fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in-scroll');
  
  function fadeInOnScroll() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll(); // Run on page load

  // Animated progress bars for skills (optional)
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-progress');
      bar.style.width = '0';
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = targetWidth + '%';
            }, 300);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(bar);
    });
  }
  
  animateProgressBars();

  // Particles animation for hero background
  function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (!heroParticles) return;
    
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random particle properties
      const size = Math.random() * 5 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      // Random color
      const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
      const colorIndex = Math.floor(Math.random() * colors.length);
      particle.style.backgroundColor = colors[colorIndex];
      
      heroParticles.appendChild(particle);
    }
  }
  
  createParticles();

  // Add custom cursor effect (optional)
  function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
      });
    });
  }
  
  // Uncomment to enable custom cursor
  // createCustomCursor();

  // Add CSS variable for scroll position
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / maxScroll) * 100;
    
    document.documentElement.style.setProperty('--scroll', scrollPosition + 'px');
    document.documentElement.style.setProperty('--scroll-percent', scrollPercentage + '%');
  });

  // Animate timeline on scroll
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function animateTimeline() {
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (itemTop < windowHeight - 100) {
        item.classList.add('animated');
      }
    });
  }
  
  window.addEventListener('scroll', animateTimeline);
  animateTimeline();

  // Add scroll-triggered counter animation for numbers
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let count = 0;
            const updateCounter = () => {
              const increment = target / 100;
              if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCounter, 20);
              } else {
                counter.textContent = target;
              }
            };
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(counter);
    });
  }
  
  animateCounters();
});

// Add CSS styles for particles
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.5;
      pointer-events: none;
      animation: float-particle linear infinite;
    }
    
    @keyframes float-particle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 0.5;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100vh) translateX(100px);
        opacity: 0;
      }
    }
    
    .custom-cursor {
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, border-color 0.3s;
      z-index: 9999;
      opacity: 0.6;
    }
    
    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background-color: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 10000;
      transition: transform 0.1s;
    }
    
    .custom-cursor.hover {
      width: 60px;
      height: 60px;
      border-color: var(--secondary-color);
      background-color: rgba(0, 229, 255, 0.1);
    }
    
    .cursor-dot.hover {
      background-color: var(--secondary-color);
      transform: translate(-50%, -50%) scale(1.5);
    }
  `;
  document.head.appendChild(style);
});