// This is a React component for a web environment
// You'll need to have React installed in your project
// npm install react

import React, { useRef, useEffect, useState } from 'react';

export const SliderApp = () => {
  const iframeRef = useRef(null);
  const [isLoading, setLoading] = useState(true);

  // HTML content for the slider
  const sliderHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }
        .slider-container {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .slider {
          display: flex;
          transition: transform 0.3s ease-out;
          height: 100%;
        }
        .slide {
          min-width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .slide img {
          max-width: 100%;
          max-height: 90%;
          object-fit: contain;
        }
        .slide-selector {
          position: fixed;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 10;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #bbb;
          margin: 0 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .dot.active {
          background-color: #2196F3;
        }
      </style>
    </head>
    <body>
      <div class="slider-container">
        <div class="slider" id="slider">
          <div class="slide">
            <img src="https://picsum.photos/800/600?random=1" alt="Slide 1">
          </div>
          <div class="slide">
            <img src="https://picsum.photos/800/600?random=2" alt="Slide 2">
          </div>
          <div class="slide">
            <img src="https://picsum.photos/800/600?random=3" alt="Slide 3">
          </div>
          <div class="slide">
            <img src="https://picsum.photos/800/600?random=4" alt="Slide 4">
          </div>
          <div class="slide">
            <img src="https://picsum.photos/800/600?random=5" alt="Slide 5">
          </div>
        </div>
        <div class="slide-selector" id="slideSelector"></div>
      </div>

      <script>
        const slider = document.getElementById('slider');
        const slideSelector = document.getElementById('slideSelector');
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        let startX, moveX;
        let isDragging = false;

        // Create dots for each slide
        slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          slideSelector.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
          currentSlide = index;
          slider.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
          updateDots();
        }

        function updateDots() {
          dots.forEach((dot, index) => {
            if (index === currentSlide) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }

        function handleTouchStart(e) {
          startX = e.touches ? e.touches[0].clientX : e.clientX;
          isDragging = true;
        }

        function handleTouchMove(e) {
          if (!isDragging) return;
          moveX = e.touches ? e.touches[0].clientX : e.clientX;
          const diff = moveX - startX;
          const translateX = -currentSlide * 100 + (diff / slider.clientWidth) * 100;
          slider.style.transform = \`translateX(\${translateX}%)\`;
        }

        function handleTouchEnd() {
          if (!isDragging) return;
          isDragging = false;
          const diff = moveX - startX;
          if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide > 0) {
              currentSlide--;
            } else if (diff < 0 && currentSlide < slides.length - 1) {
              currentSlide++;
            }
          }
          slider.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
          updateDots();
        }

        // Add support for both touch and mouse events
        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchmove', handleTouchMove);
        slider.addEventListener('touchend', handleTouchEnd);
        
        // Add mouse support for desktop
        slider.addEventListener('mousedown', handleTouchStart);
        slider.addEventListener('mousemove', handleTouchMove);
        slider.addEventListener('mouseup', handleTouchEnd);
        slider.addEventListener('mouseleave', handleTouchEnd);

        // Notify parent React component when loaded
        window.parent.postMessage('loaded', '*');
      </script>
    </body>
    </html>
  `;

  useEffect(() => {
    // Listen for the "loaded" message from the iframe
    const handleMessage = (event) => {
      if (event.data === 'loaded') {
        setLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1
        }}>
          <div className="loader" style={{
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 2s linear infinite'
          }}></div>
          <style>
            {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            `}
          </style>
        </div>
      )}
      <iframe
        ref={iframeRef}
        srcDoc={sliderHTML}
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Image Slider"
        sandbox="allow-scripts"
      />
    </div>
  );
};

// For a complete React app, you would wrap this in an App component
// const SliderApp = () => {
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <SliderApp />
//     </div>
//   );
// };

