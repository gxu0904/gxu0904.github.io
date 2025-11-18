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

// Advanced magnetic attraction system
export class MagneticSystem {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const strength = parseFloat(el.dataset.magneticStrength || 0.3);
      const distance = parseFloat(el.dataset.magneticDistance || 100);

      this.setupMagneticEffect(el, strength, distance);
    });
  }

  setupMagneticEffect(element, strength = 0.3, maxDistance = 100) {
    let isHovering = false;

    element.addEventListener('mouseenter', () => {
      isHovering = true;
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      isHovering = false;
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
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

      const x = deltaX * strength * (1 - normalizedDistance);
      const y = deltaY * strength * (1 - normalizedDistance);

      gsap.to(element, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out"
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
    this.trailLength = 8;

    // Only initialize if cursor element exists
    if (this.cursor) {
      this.init();
    }
  }

  init() {
    // Show cursor on desktop only
    if (window.matchMedia('(pointer: fine)').matches) {
      gsap.set(this.cursor, { opacity: 0.4 });

      // Create cursor trail
      this.createTrail();

      document.addEventListener('mousemove', (e) => {
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
      trailDot.style.cssText = `
        position: fixed;
        width: ${16 - i * 1.5}px;
        height: ${16 - i * 1.5}px;
        background: rgba(30, 58, 95, ${0.3 - i * 0.03});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        will-change: transform;
      `;
      document.body.appendChild(trailDot);
      this.trail.push({ element: trailDot, x: 0, y: 0 });
    }
  }

  updateTrail() {
    // Update trail positions with faster easing
    this.trail.forEach((dot, index) => {
      const ease = 0.15 + index * 0.03; // Faster from 0.1 + 0.02
      dot.x += (this.mouseX - dot.x) * ease;
      dot.y += (this.mouseY - dot.y) * ease;

      gsap.set(dot.element, {
        x: dot.x - dot.element.offsetWidth / 2,
        y: dot.y - dot.element.offsetHeight / 2
      });
    });
  }

  animate() {
    const ease = 0.25; // Faster from 0.18
    this.cursorX += (this.mouseX - this.cursorX) * ease;
    this.cursorY += (this.mouseY - this.cursorY) * ease;

    if (this.cursor) {
      gsap.set(this.cursor, {
        x: this.cursorX - 20,
        y: this.cursorY - 20
      });
    }

    requestAnimationFrame(() => this.animate());
  }

  setupHoverEffects() {
    // Enhanced cursor interactions with glow
    document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(this.cursor, {
          scale: 2.5,
          opacity: 0.8,
          backgroundColor: 'rgba(30, 58, 95, 0.2)',
          border: '2px solid rgba(30, 58, 95, 0.4)',
          duration: 0.2, // Faster from 0.3
          ease: "power2.out"
        });

        // Pulse effect on trail - faster
        this.trail.forEach((dot, i) => {
          gsap.to(dot.element, {
            scale: 1.5,
            duration: 0.2, // Faster from 0.3
            delay: i * 0.01, // Faster from 0.02
            ease: "power2.out"
          });
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(this.cursor, {
          scale: 1,
          opacity: 0.4,
          backgroundColor: 'transparent',
          border: '1px solid rgba(30, 58, 95, 0.2)',
          duration: 0.2, // Faster from 0.3
          ease: "power2.out"
        });

        this.trail.forEach((dot) => {
          gsap.to(dot.element, {
            scale: 1,
            duration: 0.2, // Faster from 0.3
            ease: "power2.out"
          });
        });
      });
    });
  }

  setupClickEffects() {
    document.addEventListener('click', (e) => {
      this.createSmoothRing(e.clientX, e.clientY);
      this.createSmoothParticles(e.clientX, e.clientY);
    });
  }

  createSmoothRing(x, y) {
    // Create multiple expanding rings for depth
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.className = 'cursor-ripple';
      ring.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        border: 2px solid rgba(30, 58, 95, ${0.6 - i * 0.15});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(ring);

      gsap.to(ring, {
        width: 120 + i * 20,
        height: 120 + i * 20,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power2.out",
        onComplete: () => ring.remove()
      });
    }
  }

  createSmoothParticles(x, y) {
    // Smooth circular particle wave
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-smooth-particle';
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, rgba(30, 58, 95, 0.8), rgba(42, 77, 124, 0.6));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        box-shadow: 0 0 10px rgba(30, 58, 95, 0.3);
      `;
      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      gsap.to(particle, {
        x: tx,
        y: ty,
        opacity: 0,
        scale: 0.3,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  createSpotlight() {
    const spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(30, 58, 95, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      will-change: transform;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    const updateSpotlight = () => {
      gsap.to(spotlight, {
        x: this.mouseX - 200,
        y: this.mouseY - 200,
        duration: 0.3, // Faster from 0.5
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