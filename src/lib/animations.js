// Advanced animation utilities for enhanced interactivity
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Enhanced parallax system
export class ParallaxController {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Register parallax elements
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0.5);
      const direction = el.dataset.direction || 'vertical';

      this.elements.push({ el, speed, direction });
    });

    // Setup scroll-based parallax
    this.setupScrollParallax();
  }

  setupScrollParallax() {
    this.elements.forEach(({ el, speed, direction }) => {
      gsap.fromTo(el,
        { [direction === 'vertical' ? 'y' : 'x']: 0 },
        {
          [direction === 'vertical' ? 'y' : 'x']: () => window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }
}

// Advanced magnetic attraction system - Enhanced for better cursor interaction
export class MagneticSystem {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const strength = parseFloat(el.dataset.magneticStrength || 0.4);
      const distance = parseFloat(el.dataset.magneticDistance || 120);

      this.setupMagneticEffect(el, strength, distance);
    });
  }

  setupMagneticEffect(element, strength = 0.4, maxDistance = 120) {
    let isHovering = false;
    let currentX = 0;
    let currentY = 0;

    element.addEventListener('mouseenter', () => {
      isHovering = true;
      gsap.to(element, {
        scale: 1.08,
        duration: 0.25,
        ease: "power2.out"
      });
      
      // Add subtle glow effect
      element.style.transition = 'box-shadow 0.25s ease-out';
      element.style.boxShadow = '0 8px 24px rgba(91, 155, 213, 0.2)';
    });

    element.addEventListener('mouseleave', () => {
      isHovering = false;
      currentX = 0;
      currentY = 0;
      
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)"
      });
      
      // Remove glow effect
      element.style.boxShadow = '';
    });

    element.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      // Enhanced magnetic formula with smoother falloff
      const falloff = 1 - normalizedDistance;
      const magneticStrength = strength * falloff * falloff; // Quadratic falloff for smoother effect

      const targetX = deltaX * magneticStrength;
      const targetY = deltaY * magneticStrength;
      
      // Smooth interpolation for buttery smooth movement
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      gsap.to(element, {
        x: currentX,
        y: currentY,
        duration: 0.2,
        ease: "power1.out"
      });
      
      // Dynamic scale based on proximity
      const proximityScale = 1.08 + (1 - normalizedDistance) * 0.05;
      gsap.to(element, {
        scale: proximityScale,
        duration: 0.2,
        ease: "power1.out"
      });
    });
  }
}

// Particle system for enhanced visual effects - now interactive!
export class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      count: 50,
      size: { min: 1, max: 3 },
      speed: { min: 0.5, max: 2 },
      color: '#00A8E8',
      opacity: { min: 0.3, max: 0.8 },
      interactive: true,
      interactionRadius: 100,
      ...options
    };

    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();

    if (this.options.interactive) {
      this.setupMouseInteraction();
    }
  }

  setupMouseInteraction() {
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;

      this.particles.forEach(particle => {
        const dx = this.mouseX - parseFloat(particle.element.style.left);
        const dy = this.mouseY - parseFloat(particle.element.style.top);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.interactionRadius) {
          const force = (this.options.interactionRadius - distance) / this.options.interactionRadius;
          const angle = Math.atan2(dy, dx);

          gsap.to(particle.element, {
            x: `+=${-Math.cos(angle) * force * 30}`,
            y: `+=${-Math.sin(angle) * force * 30}`,
            scale: 1 + force * 0.5,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    this.container.addEventListener('mouseleave', () => {
      this.particles.forEach(particle => {
        gsap.to(particle.element, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  }

  createParticles() {
    for (let i = 0; i < this.options.count; i++) {
      const particle = this.createParticle();
      this.particles.push(particle);
      this.container.appendChild(particle.element);
    }
  }

  createParticle() {
    const element = document.createElement('div');
    element.className = 'particle absolute rounded-full pointer-events-none';
    element.style.willChange = 'transform, opacity';

    const size = this.randomBetween(this.options.size.min, this.options.size.max);
    const x = this.randomBetween(0, 100);
    const y = this.randomBetween(0, 100);
    const speed = this.randomBetween(this.options.speed.min, this.options.speed.max);
    const opacity = this.randomBetween(this.options.opacity.min, this.options.opacity.max);

    element.style.left = `${x}%`;
    element.style.top = `${y}%`;

    gsap.set(element, {
      width: size,
      height: size,
      backgroundColor: this.options.color,
      opacity: opacity
    });

    return {
      element,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size,
      opacity
    };
  }

  animate() {
    this.particles.forEach(particle => {
      gsap.to(particle.element, {
        x: `+=${particle.vx * 100}`,
        y: `+=${particle.vy * 100}`,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Scale pulsing
      gsap.to(particle.element, {
        scale: this.randomBetween(0.5, 1.5),
        duration: this.randomBetween(2, 5),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    });
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
}

// Text animation system
export class TextAnimations {
  // Word-by-word reveal - Browser Company inspired
  static revealByWords(element, options = {}) {
    const defaults = {
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0,
      y: 50,
      blur: 10
    };

    const opts = { ...defaults, ...options };

    const text = element.textContent;
    const words = text.split(' ');

    element.innerHTML = words.map(word =>
      `<span class="inline-block word-wrapper" style="overflow: hidden; display: inline-flex;">
        <span class="word inline-block">${word}&nbsp;</span>
      </span>`
    ).join('');

    const wordElements = element.querySelectorAll('.word');

    gsap.fromTo(wordElements,
      {
        y: opts.y,
        opacity: 0,
        filter: `blur(${opts.blur}px)`,
        rotationX: 15
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        rotationX: 0,
        duration: opts.duration,
        stagger: opts.stagger,
        ease: opts.ease,
        delay: opts.delay,
        clearProps: "all"
      }
    );
  }

  // Character-by-character reveal
  static revealByChars(element, options = {}) {
    const defaults = {
      duration: 0.6,
      stagger: 0.02,
      ease: "power2.out",
      delay: 0,
      y: 30
    };

    const opts = { ...defaults, ...options };

    const text = element.textContent;
    const chars = text.split('');

    element.innerHTML = chars.map(char =>
      char === ' ' ? ' ' : `<span class="inline-block char-reveal">${char}</span>`
    ).join('');

    const spans = element.querySelectorAll('.char-reveal');

    gsap.fromTo(spans,
      {
        y: opts.y,
        opacity: 0,
        rotationX: -90,
        filter: 'blur(8px)'
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: opts.duration,
        stagger: opts.stagger,
        ease: opts.ease,
        delay: opts.delay,
        clearProps: "all"
      }
    );
  }

  // Line-by-line reveal with mask effect
  static revealByLines(element, options = {}) {
    const defaults = {
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0
    };

    const opts = { ...defaults, ...options };

    // Split text into lines
    const text = element.innerHTML;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    tempDiv.style.cssText = window.getComputedStyle(element).cssText;
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    document.body.appendChild(tempDiv);

    const words = tempDiv.textContent.split(' ');
    let lines = [];
    let currentLine = [];
    let testElement = tempDiv.cloneNode();
    document.body.appendChild(testElement);

    words.forEach((word, i) => {
      testElement.textContent = currentLine.concat(word).join(' ');
      if (testElement.offsetHeight > tempDiv.offsetHeight && currentLine.length) {
        lines.push(currentLine.join(' '));
        currentLine = [word];
      } else {
        currentLine.push(word);
      }
      if (i === words.length - 1) lines.push(currentLine.join(' '));
    });

    document.body.removeChild(tempDiv);
    document.body.removeChild(testElement);

    element.innerHTML = lines.map(line =>
      `<div class="line-wrapper" style="overflow: hidden;">
        <div class="line">${line}</div>
      </div>`
    ).join('');

    const lineElements = element.querySelectorAll('.line');

    gsap.fromTo(lineElements,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: opts.duration,
        stagger: opts.stagger,
        ease: opts.ease,
        delay: opts.delay
      }
    );
  }

  static typeWriter(element, phrases, options = {}) {
    const defaults = {
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000,
      cursor: '|',
      loop: true
    };

    const opts = { ...defaults, ...options };
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.textContent = opts.cursor;
    element.appendChild(cursor);

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      element.appendChild(cursor);

      let speed = isDeleting ? opts.deleteSpeed : opts.typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = opts.pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    type();
  }

  static glitchEffect(element, options = {}) {
    const defaults = {
      intensity: 0.1,
      duration: 50,
      interval: 100
    };

    const opts = { ...defaults, ...options };
    const originalText = element.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    setInterval(() => {
      if (Math.random() < opts.intensity) {
        let glitchedText = '';

        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.1) {
            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitchedText += originalText[i];
          }
        }

        element.textContent = glitchedText;

        setTimeout(() => {
          element.textContent = originalText;
        }, opts.duration);
      }
    }, opts.interval);
  }
}

// 3D Tilt Effect System - inspired by modern portfolio sites
export class TiltEffect {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      this.setupTilt(el);
    });
  }

  setupTilt(element) {
    let bounds;

    const updateBounds = () => {
      bounds = element.getBoundingClientRect();
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    element.addEventListener('mouseenter', () => {
      updateBounds();
      gsap.to(element, {
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const percentX = (mouseX - centerX) / (bounds.width / 2);
      const percentY = (mouseY - centerY) / (bounds.height / 2);

      const maxTilt = 8;
      const tiltY = percentX * maxTilt;
      const tiltX = -percentY * maxTilt;

      gsap.to(element, {
        duration: 0.5,
        rotationY: tiltY,
        rotationX: tiltX,
        transformPerspective: 1000,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.6,
        rotationY: 0,
        rotationX: 0,
        ease: "elastic.out(1, 0.5)"
      });
    });
  }
}

// Animated Gradient Mesh Background
export class GradientMesh {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      colors: [
        'rgba(30, 58, 95, 0.08)',
        'rgba(42, 77, 124, 0.08)',
        'rgba(91, 107, 127, 0.05)'
      ],
      speed: 30,
      ...options
    };
    this.init();
  }

  init() {
    const canvas = document.createElement('div');
    canvas.className = 'gradient-mesh absolute inset-0 pointer-events-none';
    canvas.style.willChange = 'transform';

    for (let i = 0; i < this.options.colors.length; i++) {
      const blob = document.createElement('div');
      blob.className = 'gradient-blob absolute rounded-full blur-3xl';
      blob.style.background = this.options.colors[i];
      blob.style.width = '40%';
      blob.style.height = '40%';
      blob.style.willChange = 'transform';

      canvas.appendChild(blob);

      // Animate each blob
      gsap.to(blob, {
        x: `random(-20%, 20%)`,
        y: `random(-20%, 20%)`,
        scale: `random(0.8, 1.3)`,
        duration: this.options.speed + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    this.container.appendChild(canvas);
  }
}

// Scroll-based animation system
export class ScrollAnimations {
  static setupBatchAnimations() {
    // Enhanced blur-to-focus scroll reveals
    ScrollTrigger.batch("[data-animate]", {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          {
            y: 80,
            opacity: 0,
            scale: 0.92,
            rotationX: 20,
            filter: 'blur(15px)'
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "all"
          }
        );
      },
      start: "top 90%",
      once: false
    });

    // Word-by-word text reveals
    ScrollTrigger.batch("[data-text-reveal]", {
      onEnter: (elements) => {
        elements.forEach(el => TextAnimations.revealByWords(el, {
          stagger: 0.05,
          duration: 0.8
        }));
      },
      start: "top 85%",
      once: true
    });

    // Character reveals for smaller text
    ScrollTrigger.batch("[data-char-reveal]", {
      onEnter: (elements) => {
        elements.forEach(el => TextAnimations.revealByChars(el));
      },
      start: "top 85%",
      once: true
    });

    // Scale animations
    ScrollTrigger.batch("[data-scale]", {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.4)",
            clearProps: "all"
          }
        );
      },
      start: "top 90%"
    });

    // Hover lift effect
    document.querySelectorAll('[data-hover-lift]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: -8,
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y: 0,
          boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  // Smooth scroll progress indicator
  static createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] z-50 origin-left';
    progressBar.style.willChange = 'transform';
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left" });
  }
}

// Enhanced cursor system with advanced interactions
export class EnhancedCursor {
  constructor() {
    this.cursor = document.getElementById('cursor-aura');
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.trail = [];
    this.trailLength = 10;
    this.velocity = { x: 0, y: 0 };
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.lastTime = Date.now();
    this.isHovering = false;
    this.currentHoverElement = null;

    // Only initialize if cursor element exists
    if (this.cursor) {
      this.init();
    }
  }

  init() {
    // Show cursor on desktop only
    if (window.matchMedia('(pointer: fine)').matches) {
      gsap.set(this.cursor, { opacity: 0.5, scale: 1 });

      // Create cursor trail
      this.createTrail();

      document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        const deltaTime = Math.max(1, now - this.lastTime);
        
        // Calculate velocity
        this.velocity.x = (e.clientX - this.lastMouseX) / deltaTime * 16;
        this.velocity.y = (e.clientY - this.lastMouseY) / deltaTime * 16;
        
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.lastTime = now;
        
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.updateTrail();
      });

      this.animate();
      this.setupHoverEffects();
      this.setupClickEffects();
      this.createSpotlight();
    } else {
      // Hide cursor on touch devices
      gsap.set(this.cursor, { opacity: 0, display: 'none' });
    }
  }

  createTrail() {
    for (let i = 0; i < this.trailLength; i++) {
      const trailDot = document.createElement('div');
      trailDot.className = 'cursor-trail';
      const size = 12 - i * 0.8;
      const opacity = 0.4 - i * 0.03;
      trailDot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(91, 155, 213, ${opacity}) 0%, rgba(30, 58, 95, ${opacity * 0.5}) 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        will-change: transform;
        box-shadow: 0 0 ${size * 0.5}px rgba(91, 155, 213, ${opacity * 0.3});
      `;
      document.body.appendChild(trailDot);
      this.trail.push({ element: trailDot, x: 0, y: 0, scale: 1 });
    }
  }

  updateTrail() {
    // Calculate speed for dynamic trail effects
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    const speedMultiplier = Math.min(speed / 10, 1.5);
    
    // Update trail positions with dynamic easing based on speed
    this.trail.forEach((dot, index) => {
      const baseEase = 0.2 + index * 0.02;
      const dynamicEase = baseEase * (1 + speedMultiplier * 0.3);
      
      dot.x += (this.mouseX - dot.x) * dynamicEase;
      dot.y += (this.mouseY - dot.y) * dynamicEase;
      
      // Dynamic scale based on speed
      const targetScale = 1 + speedMultiplier * 0.2;
      dot.scale += (targetScale - dot.scale) * 0.1;

      gsap.set(dot.element, {
        x: dot.x - dot.element.offsetWidth / 2,
        y: dot.y - dot.element.offsetHeight / 2,
        scale: dot.scale
      });
    });
  }

  animate() {
    // Calculate speed for dynamic cursor response
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    const dynamicEase = Math.max(0.15, 0.3 - speed / 100); // Faster when moving fast
    
    this.cursorX += (this.mouseX - this.cursorX) * dynamicEase;
    this.cursorY += (this.mouseY - this.cursorY) * dynamicEase;

    if (this.cursor) {
      // Dynamic scale based on speed
      const speedScale = 1 + Math.min(speed / 20, 0.3);
      const hoverScale = this.isHovering ? 1.8 : 1;
      const finalScale = speedScale * hoverScale;
      
      gsap.set(this.cursor, {
        x: this.cursorX - 20,
        y: this.cursorY - 20,
        scale: finalScale
      });
    }

    requestAnimationFrame(() => this.animate());
  }

  setupHoverEffects() {
    // Enhanced cursor interactions with different states for different elements
    const interactiveSelectors = [
      'a', 
      'button', 
      '[data-magnetic]', 
      '[role="button"]',
      '.interactive-button',
      '[data-hover-lift]',
      'input',
      'textarea',
      'select'
    ];
    
    interactiveSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Determine element type for different effects
        const isButton = el.tagName === 'BUTTON' || el.classList.contains('interactive-button');
        const isLink = el.tagName === 'A';
        const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
        const hasMagnetic = el.hasAttribute('data-magnetic');
        
        el.addEventListener('mouseenter', () => {
          this.isHovering = true;
          this.currentHoverElement = el;
          
          // Different effects based on element type
          if (isButton) {
            gsap.to(this.cursor, {
              scale: 2.2,
              opacity: 0.9,
              backgroundColor: 'rgba(91, 155, 213, 0.25)',
              border: '2px solid rgba(91, 155, 213, 0.5)',
              duration: 0.15,
              ease: "power2.out"
            });
          } else if (isLink) {
            gsap.to(this.cursor, {
              scale: 1.8,
              opacity: 0.7,
              backgroundColor: 'rgba(30, 58, 95, 0.15)',
              border: '2px solid rgba(30, 58, 95, 0.4)',
              duration: 0.15,
              ease: "power2.out"
            });
          } else if (isInput) {
            gsap.to(this.cursor, {
              scale: 0.8,
              opacity: 0.6,
              backgroundColor: 'rgba(91, 155, 213, 0.2)',
              border: '1.5px solid rgba(91, 155, 213, 0.4)',
              duration: 0.15,
              ease: "power2.out"
            });
          } else {
            gsap.to(this.cursor, {
              scale: 1.6,
              opacity: 0.75,
              backgroundColor: 'rgba(30, 58, 95, 0.2)',
              border: '2px solid rgba(30, 58, 95, 0.4)',
              duration: 0.15,
              ease: "power2.out"
            });
          }

          // Enhanced trail pulse effect
          this.trail.forEach((dot, i) => {
            gsap.to(dot.element, {
              scale: 1.4 + (hasMagnetic ? 0.3 : 0),
              opacity: 0.6 + i * 0.02,
              duration: 0.15,
              delay: i * 0.008,
              ease: "power2.out"
            });
          });
          
          // Add magnetic pull effect
          if (hasMagnetic) {
            this.setupMagneticPull(el);
          }
        });

        el.addEventListener('mouseleave', () => {
          this.isHovering = false;
          this.currentHoverElement = null;
          
          gsap.to(this.cursor, {
            scale: 1,
            opacity: 0.5,
            backgroundColor: 'transparent',
            border: '1px solid rgba(30, 58, 95, 0.2)',
            duration: 0.2,
            ease: "power2.out"
          });

          this.trail.forEach((dot) => {
            gsap.to(dot.element, {
              scale: 1,
              opacity: 0.4 - (this.trail.indexOf(dot) * 0.03),
              duration: 0.2,
              ease: "power2.out"
            });
          });
        });
      });
    });
    
    // Add hover effects for cards and project items
    document.querySelectorAll('[data-project-card], .glass, .hover-lift').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!this.isHovering) {
          gsap.to(this.cursor, {
            scale: 1.4,
            opacity: 0.65,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
      
      el.addEventListener('mouseleave', () => {
        if (!this.isHovering) {
          gsap.to(this.cursor, {
            scale: 1,
            opacity: 0.5,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    });
  }
  
  setupMagneticPull(element) {
    const handleMouseMove = (e) => {
      if (!this.isHovering || this.currentHoverElement !== element) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const strength = 0.15 * (1 - distance / maxDistance);
        const pullX = deltaX * strength;
        const pullY = deltaY * strength;
        
        // Pull cursor towards element
        this.cursorX += pullX;
        this.cursorY += pullY;
      }
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', () => {
      element.removeEventListener('mousemove', handleMouseMove);
    }, { once: true });
  }

  setupClickEffects() {
    document.addEventListener('mousedown', (e) => {
      // Cursor shrink on click
      gsap.to(this.cursor, {
        scale: 0.7,
        duration: 0.1,
        ease: "power2.out"
      });
      
      // Trail compression
      this.trail.forEach((dot, i) => {
        gsap.to(dot.element, {
          scale: 0.6,
          duration: 0.1,
          delay: i * 0.01,
          ease: "power2.out"
        });
      });
    });
    
    document.addEventListener('mouseup', () => {
      // Cursor bounce back
      const targetScale = this.isHovering ? 1.8 : 1;
      gsap.to(this.cursor, {
        scale: targetScale,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Trail bounce back
      this.trail.forEach((dot, i) => {
        gsap.to(dot.element, {
          scale: 1,
          duration: 0.3,
          delay: i * 0.01,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
    
    document.addEventListener('click', (e) => {
      this.createSmoothRing(e.clientX, e.clientY);
      this.createSmoothParticles(e.clientX, e.clientY);
    });
  }

  createSmoothRing(x, y) {
    // Create multiple expanding rings with better visual design
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.className = 'cursor-ripple';
      const color = i === 0 ? 'rgba(91, 155, 213, 0.6)' : 
                    i === 1 ? 'rgba(125, 184, 232, 0.4)' : 
                    'rgba(30, 58, 95, 0.3)';
      ring.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        border: 2px solid ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px ${color};
      `;
      document.body.appendChild(ring);

      gsap.to(ring, {
        width: 100 + i * 30,
        height: 100 + i * 30,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: "power2.out",
        onComplete: () => ring.remove()
      });
    }
  }

  createSmoothParticles(x, y) {
    // Enhanced particle burst with better colors
    const particleCount = 12;
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    const distance = 50 + Math.min(speed / 2, 30);
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-smooth-particle';
      const hue = (i / particleCount) * 60 + 200; // Blue range
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, rgba(91, 155, 213, 0.9), rgba(30, 58, 95, 0.6));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        box-shadow: 0 0 12px rgba(91, 155, 213, 0.6);
      `;
      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / particleCount;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      gsap.to(particle, {
        x: tx,
        y: ty,
        opacity: 0,
        scale: 0.2,
        duration: 0.6,
        delay: i * 0.02,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  createSpotlight() {
    const spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    const size = 300 + Math.min(speed * 2, 200);
    spotlight.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(91, 155, 213, 0.06) 0%, rgba(30, 58, 95, 0.03) 50%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      will-change: transform;
      mix-blend-mode: screen;
      filter: blur(20px);
    `;
    document.body.appendChild(spotlight);

    const updateSpotlight = () => {
      const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
      const dynamicSize = 300 + Math.min(speed * 2, 200);
      
      gsap.to(spotlight, {
        x: this.mouseX - dynamicSize / 2,
        y: this.mouseY - dynamicSize / 2,
        width: dynamicSize,
        height: dynamicSize,
        duration: 0.2,
        ease: "power2.out"
      });
      requestAnimationFrame(updateSpotlight);
    };
    updateSpotlight();
  }
}

// Floating Accent Shapes - decorative animated elements
export class FloatingShapes {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      count: 5,
      shapes: ['circle', 'square', 'triangle'],
      ...options
    };
    this.init();
  }

  init() {
    for (let i = 0; i < this.options.count; i++) {
      const shape = this.createShape(i);
      this.container.appendChild(shape);
      this.animateShape(shape, i);
    }
  }

  createShape(index) {
    const shape = document.createElement('div');
    shape.className = 'floating-shape absolute pointer-events-none';

    const size = gsap.utils.random(30, 80);
    const shapeType = gsap.utils.random(this.options.shapes);

    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.opacity = '0.04';
    shape.style.willChange = 'transform';

    // Random position
    shape.style.left = `${gsap.utils.random(0, 100)}%`;
    shape.style.top = `${gsap.utils.random(0, 100)}%`;

    // Shape styles
    if (shapeType === 'circle') {
      shape.style.borderRadius = '50%';
      shape.style.background = 'var(--primary)';
    } else if (shapeType === 'square') {
      shape.style.borderRadius = '8px';
      shape.style.background = 'var(--accent)';
    } else {
      shape.style.width = '0';
      shape.style.height = '0';
      shape.style.borderLeft = `${size/2}px solid transparent`;
      shape.style.borderRight = `${size/2}px solid transparent`;
      shape.style.borderBottom = `${size}px solid var(--primary)`;
      shape.style.opacity = '0.03';
    }

    return shape;
  }

  animateShape(shape, index) {
    // Floating animation
    gsap.to(shape, {
      y: `random(-50, 50)`,
      x: `random(-50, 50)`,
      rotation: `random(-180, 180)`,
      duration: gsap.utils.random(15, 25),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.5
    });

    // Subtle scale pulse
    gsap.to(shape, {
      scale: gsap.utils.random(0.8, 1.3),
      duration: gsap.utils.random(8, 12),
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }
}

// Initialize all systems
export function initializeAnimationSystems() {
  // Initialize all animation systems
  new ParallaxController();
  new MagneticSystem();
  new EnhancedCursor();
  new TiltEffect();

  ScrollAnimations.setupBatchAnimations();
  ScrollAnimations.createScrollProgress();

  // Add particle systems to specific containers
  const particleContainers = document.querySelectorAll('[data-particles]');
  particleContainers.forEach(container => {
    const count = parseInt(container.dataset.particleCount || '30');
    const color = container.dataset.particleColor || '#00A8E8';

    new ParticleSystem(container, { count, color });
  });

  // Add gradient meshes
  const meshContainers = document.querySelectorAll('[data-gradient-mesh]');
  meshContainers.forEach(container => {
    new GradientMesh(container);
  });

  // Add floating shapes
  const shapeContainers = document.querySelectorAll('[data-floating-shapes]');
  shapeContainers.forEach(container => {
    const count = parseInt(container.dataset.shapeCount || '5');
    new FloatingShapes(container, { count });
  });
}