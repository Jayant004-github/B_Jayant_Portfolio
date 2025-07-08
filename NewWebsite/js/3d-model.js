// 3D Model JavaScript for interacting with the Spline model

document.addEventListener('DOMContentLoaded', function() {
  // Function to check if the Spline iframe has loaded
  function checkSplineLoaded() {
    const splineIframe = document.querySelector('.hero-model iframe');
    
    if (!splineIframe) return;
    
    // Add loading class to the hero model container
    const heroModel = document.querySelector('.hero-model');
    heroModel.classList.add('loading');
    
    // Listen for the iframe to load
    splineIframe.addEventListener('load', function() {
      // Remove loading class when loaded
      heroModel.classList.remove('loading');
      
      // Try to interact with the Spline API if available
      try {
        // Check if we can access the iframe content
        if (splineIframe.contentWindow) {
          console.log('Spline iframe loaded successfully');
          
          // Add a small delay before attempting to interact with the model
          setTimeout(() => {
            interactWithSplineModel(splineIframe);
          }, 2000);
        }
      } catch (error) {
        console.log('Unable to interact with Spline model due to cross-origin restrictions');
      }
    });
  }
  
  // Function to attempt interaction with the Spline model
  function interactWithSplineModel(iframe) {
    try {
      // This might not work due to cross-origin restrictions
      const iframeWindow = iframe.contentWindow;
      
      // Check if we can access the Spline API
      if (iframeWindow.spline) {
        console.log('Spline API accessible');
        
        // Potential interaction with the model
        // Note: This depends on the specific Spline model's API
      }
    } catch (error) {
      console.log('Cross-origin restrictions prevent direct model interaction');
      
      // Alternative: Use postMessage if the Spline model supports it
      iframe.contentWindow.postMessage({
        type: 'spline-interaction',
        action: 'rotate',
        data: { x: 0, y: 1, z: 0 }
      }, '*');
    }
  }
  
  // Check if Spline has loaded
  checkSplineLoaded();
  
  // Add CSS for loading animation
  const style = document.createElement('style');
  style.textContent = `
    .hero-model.loading::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }
    
    .hero-model.loading::after {
      content: 'Loading 3D Model...';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 1rem;
      z-index: 2;
    }
  `;
  document.head.appendChild(style);
  
  // Handle scroll-based model animation
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.getElementById('hero');
    
    if (!heroSection) return;
    
    const heroHeight = heroSection.offsetHeight;
    const scrollPercentage = Math.min(scrollPosition / heroHeight, 1);
    
    // Apply scroll-based transformations to the model
    const heroModel = document.querySelector('.hero-model');
    if (heroModel) {
      // Rotate and scale based on scroll
      const rotateY = scrollPercentage * 180; // Rotate up to 180 degrees
      const scale = 1 - (scrollPercentage * 0.3); // Scale down to 70%
      
      heroModel.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
    }
  });
  
  // Handle fallback if iframe fails to load
  const iframe = document.querySelector('.hero-model iframe');
  if (iframe) {
    iframe.onerror = function() {
      const heroModel = document.querySelector('.hero-model');
      heroModel.innerHTML = `
        <div class="model-fallback">
          <div class="model-placeholder">
            <i class="fas fa-robot"></i>
            <p>3D Model could not be loaded</p>
          </div>
        </div>
      `;
    };
    
    // Set a timeout for loading
    setTimeout(() => {
      if (document.querySelector('.hero-model.loading')) {
        const heroModel = document.querySelector('.hero-model');
        heroModel.classList.remove('loading');
        
        // Add a retry button
        const retryButton = document.createElement('button');
        retryButton.className = 'retry-button';
        retryButton.innerHTML = 'Retry Loading Model';
        heroModel.appendChild(retryButton);
        
        retryButton.addEventListener('click', function() {
          // Reload the iframe
          iframe.src = iframe.src;
          heroModel.classList.add('loading');
          this.remove();
        });
      }
    }, 10000); // 10 second timeout
  }
  
  // Add CSS for fallback
  const fallbackStyle = document.createElement('style');
  fallbackStyle.textContent = `
    .model-fallback {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      border-radius: var(--border-radius);
    }
    
    .model-placeholder {
      text-align: center;
      color: white;
    }
    
    .model-placeholder i {
      font-size: 5rem;
      margin-bottom: 1rem;
    }
    
    .retry-button {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      z-index: 3;
    }
    
    .retry-button:hover {
      background-color: var(--secondary-color);
    }
  `;
  document.head.appendChild(fallbackStyle);
});

// Message handler for potential communication with the Spline model
window.addEventListener('message', function(event) {
  // Check the origin for security
  const allowedOrigins = ['https://app.spline.design'];
  
  if (allowedOrigins.includes(event.origin)) {
    // Handle messages from the Spline model
    if (event.data && event.data.type === 'spline-event') {
      console.log('Received message from Spline model:', event.data);
      
      // Handle different event types
      switch (event.data.action) {
        case 'loaded':
          console.log('Spline model has loaded successfully');
          break;
        
        case 'interaction':
          console.log('User interacted with the Spline model');
          break;
        
        case 'error':
          console.error('Error in Spline model:', event.data.message);
          break;
      }
    }
  }
});