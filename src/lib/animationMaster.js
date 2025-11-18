// Global animation initializer - loads after DOM is ready
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initializeAnimationSystems } from './animations.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class AnimationMaster {
  constructor() {
    this.lenis = null;
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize smooth scrolling
    this.initSmoothScroll();

    // Initialize all animation systems
    initializeAnimationSystems();

    // Setup global event listeners
    this.setupGlobalEventListeners();

    // Create entrance animation
    this.createEntranceAnimation();

    // Setup performance optimizations
    this.setupPerformanceOptimizations();

    this.isInitialized = true;
  }

  initSmoothScroll() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Use requestAnimationFrame for smooth updates
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);
  }

  setupGlobalEventListeners() {
    // Reduced motion preference handling
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => this.handleReducedMotion(e.matches));

    // Resize handler for responsive animations
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        this.handleResize();
      }, 250);
    });

    // Visibility change handler to pause/resume animations
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    });
  }

  handleReducedMotion(isReduced) {
    if (isReduced) {
      // Disable complex animations
      gsap.set('*', { animation: 'none', transition: 'none' });
      this.lenis?.destroy();
    } else {
      // Re-enable animations if not already disabled
      if (!this.lenis) {
        this.initSmoothScroll();
      }
    }
  }

  handleResize() {
    // Recalculate particle systems
    const particleContainers = document.querySelectorAll('[data-particles]');
    particleContainers.forEach(container => {
      // Trigger particle system update if needed
      const event = new CustomEvent('resize-particles');
      container.dispatchEvent(event);
    });
  }

  createEntranceAnimation() {
    const tl = gsap.timeline({ delay: 0.5 });

    // Page entrance sequence
    tl.fromTo('body',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo('header',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0.2
    )
    .fromTo('main > section:first-child',
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      0.4
    );
  }

  setupPerformanceOptimizations() {
    // Optimize ScrollTrigger performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true
    });

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Custom scroll event handling
        document.dispatchEvent(new CustomEvent('optimizedScroll'));
      }, 16); // ~60fps
    }, { passive: true });

    // Intersection Observer for performance-critical animations
    const observerOptions = {
      rootMargin: '50px 0px',
      threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Trigger custom animations
          const customEvent = new CustomEvent('elementInView', {
            detail: { element: entry.target }
          });
          document.dispatchEvent(customEvent);
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('[data-animate], [data-parallax], [data-magnetic]').forEach(el => {
      animationObserver.observe(el);
    });

    // Memory management for large animations
    this.setupMemoryManagement();
  }

  setupMemoryManagement() {
    // Clean up completed animations
    gsap.registerEffect({
      name: "autoCleanup",
      effect: (_targets, _config) => {
        const tl = gsap.timeline({
          onComplete: () => {
            // Clean up references
            tl.kill();
          }
        });
        return tl;
      }
    });

    // Monitor and clean up ScrollTrigger instances
    let scrollTriggerCount = 0;
    const originalCreate = ScrollTrigger.create;
    ScrollTrigger.create = function(...args) {
      scrollTriggerCount++;
      const instance = originalCreate.apply(this, args);

      // Auto-cleanup after a certain threshold
      if (scrollTriggerCount > 100) {
        // High ScrollTrigger count detected, consider cleanup
      }

      return instance;
    };
  }

  // Utility methods for external use
  static createRevealAnimation(element, options = {}) {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    };

    return gsap.fromTo(element,
      { y: defaults.y, opacity: defaults.opacity, ...options.from },
      { y: 0, opacity: 1, duration: defaults.duration, ease: defaults.ease, ...options.to }
    );
  }

  static createFloatingAnimation(element, options = {}) {
    const defaults = {
      y: 10,
      duration: 2,
      ease: "power2.inOut"
    };

    return gsap.to(element, {
      y: defaults.y,
      duration: defaults.duration,
      ease: defaults.ease,
      yoyo: true,
      repeat: -1,
      ...options
    });
  }

  static createPulseAnimation(element, options = {}) {
    const defaults = {
      scale: 1.05,
      duration: 1,
      ease: "power2.inOut"
    };

    return gsap.to(element, {
      scale: defaults.scale,
      duration: defaults.duration,
      ease: defaults.ease,
      yoyo: true,
      repeat: -1,
      ...options
    });
  }

  // Public API for external control
  pause() {
    gsap.globalTimeline.pause();
    this.lenis?.stop();
  }

  resume() {
    gsap.globalTimeline.resume();
    this.lenis?.start();
  }

  destroy() {
    gsap.globalTimeline.clear();
    ScrollTrigger.killAll();
    this.lenis?.destroy();
    this.isInitialized = false;
  }
}

// Initialize the animation master
const animationMaster = new AnimationMaster();

// Export for external use
export default animationMaster;
export { AnimationMaster };