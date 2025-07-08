// Main JavaScript

// Wait for DOM Content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', function() {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Typing effect for the changing text
  const changingTextElement = document.getElementById('changing-text');
  const texts = [
    'innovative solutions',
    'AR/VR experiences',
    'IoT systems',
    'smart automation',
    'robotics projects'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      changingTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      changingTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  setTimeout(typeText, 1000);

  // Mobile Navigation Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile nav when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  });

  // Project filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 300);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Project details toggle
  const detailsBtns = document.querySelectorAll('.project-details-btn');
  
  detailsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const projectId = this.getAttribute('data-project');
      const details = document.getElementById(`${projectId}-details`);
      
      if (details.style.display === 'block') {
        details.style.display = 'none';
      } else {
        details.style.display = 'block';
      }
    });
  });

  // Form Input Animation
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Sending...';
      
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent!';
        submitBtn.classList.add('success');
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message';
          submitBtn.classList.remove('success');
        }, 3000);
      }, 1500);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button functionality
  const backToTopBtn = document.querySelector('.back-to-top a');
  
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  // Add hover effect for project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('gradient-border');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('gradient-border');
    });
  });
});