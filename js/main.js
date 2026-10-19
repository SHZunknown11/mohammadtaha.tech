/**
 * Mohammad Taha - Official Portfolio Script
 * Motion Graphics: GSAP + ScrollTrigger
 * Canvas Physics: Vanilla JS Particle / Constellation Engine
 * Interactive FX: 3D Tilt, Magnetic Hover, Custom Cursor, Typewriter
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. DYNAMIC YEAR
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. SCROLL PROGRESS INDICATOR
  const progressBar = document.getElementById('progressBar');
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // 3. STICKY NAVBAR GLOW
  const mainHeader = document.getElementById('mainHeader');
  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // 4. MOBILE DRAWER NAVIGATION
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileNav = (open) => {
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
    if (isOpen) {
      menuToggle.classList.add('active');
      mobileMenu.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMobileNav());
  }
  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', () => toggleMobileNav(false));
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      toggleMobileNav(false);
    }
  });

  // 5. ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 6. BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. CUSTOM INTERACTIVE CURSOR
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    const renderCursorRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursorRing);
    };
    requestAnimationFrame(renderCursorRing);

    // Interactive elements hover enlargement
    const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-pill, .stat-card, .faq-question');
    hoverables.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursorRing.classList.add('cursor-active');
      });
      elem.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('cursor-active');
      });
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  // 8. TYPEWRITER EFFECT IN HERO
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'Full Stack Web Applications',
      'Intelligent AI Chatbots & NLP',
      'Smart IoT Telemetry Systems',
      'High-Speed Telegram Bots',
      'Robust Cybersecurity Tools'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 80;

    const typeRole = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 40;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeDelay = 1800; // Pause when complete
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400; // Pause before next word
      }

      setTimeout(typeRole, typeDelay);
    };

    setTimeout(typeRole, 600);
  }

  // 9. VANILLA JS CANVAS PARTICLE CONSTELLATION (HERO)
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    const resizeCanvas = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.baseRadius = Math.random() * 2 + 1.2;
        this.radius = this.baseRadius;
        this.alpha = Math.random() * 0.6 + 0.3;
        // Theme palette colors
        const colors = [
          'rgba(99, 102, 241, ',   // Indigo
          'rgba(59, 130, 246, ',   // Blue
          'rgba(6, 182, 212, ',    // Cyan
          'rgba(139, 92, 246, '    // Purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (gentle repulsion)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 2.5;
            this.y -= Math.sin(angle) * force * 2.5;
            this.radius = this.baseRadius * 1.5;
          } else {
            this.radius = this.baseRadius;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.shadowColor = `${this.color}0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      // Calculate particle density based on screen dimensions
      const count = Math.min(Math.floor((width * height) / 12000), 90);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawConstellation = () => {
      const maxDist = 125;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animateCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConstellation();
      animationFrameId = requestAnimationFrame(animateCanvas);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Touch support for mobile canvas interaction
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animateCanvas();
  }

  // 10. MAGNETIC HOVER EFFECT FOR BUTTONS
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.gsap) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.32,
          y: y * 0.32,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  // 11. 3D TILT EFFECT ON PROJECT CARDS (VANILLA JS)
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    tiltCards.forEach(card => {
      const shine = card.querySelector('.card-glass-shine');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((mouseY - centerY) / centerY) * 10;
        const rotateY = ((mouseX - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;

        if (shine) {
          const moveX = (mouseX / rect.width) * 100;
          const moveY = (mouseY / rect.height) * 100;
          shine.style.background = `radial-gradient(circle at ${moveX}% ${moveY}%, rgba(255, 255, 255, 0.18), transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        card.style.transition = 'transform 0.5s ease-out';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // 12. STATS COUNTER ANIMATION
  let statsAnimated = false;
  const initStatsCounter = () => {
    const counterElements = document.querySelectorAll('.stat-counter');
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      let count = 0;
      const duration = 2000;
      const stepTime = Math.max(Math.floor(duration / target), 20);

      const timer = setInterval(() => {
        count += Math.ceil(target / (duration / stepTime));
        if (count >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = count;
        }
      }, stepTime);
    });
  };

  // 13. FAQ ACCORDION LOGIC
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all other open items
      document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const otherBtn = item.querySelector('.faq-question');
          const otherAns = item.querySelector('.faq-answer');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        faqItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        faqItem.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });

  // 14. CONTACT FORM VALIDATION & MAILTO FALLBACK
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      const messageVal = messageInput.value.trim();

      let isValid = true;

      // Validate Name
      const nameGroup = nameInput.closest('.form-group');
      if (nameVal.length < 2) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput.closest('.form-group');
      if (messageVal.length < 10) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (!isValid) {
        formStatus.textContent = 'Please fill out all required fields properly.';
        formStatus.className = 'form-status error';
        return;
      }

      // Success message & Mailto fallback trigger
      formStatus.textContent = 'Preparing your message... Opening your default email client.';
      formStatus.className = 'form-status success';

      const emailSubject = encodeURIComponent(subjectVal || `Portfolio Contact from ${nameVal}`);
      const emailBody = encodeURIComponent(
        `Hello Mohammad Taha,\n\n${messageVal}\n\n---\nSender: ${nameVal}\nEmail: ${emailVal}`
      );
      const mailtoUrl = `mailto:contact@mohammadtaha.tech?subject=${emailSubject}&body=${emailBody}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
        setTimeout(() => {
          formStatus.textContent = 'Thank you! If your email client did not launch, please email directly to contact@mohammadtaha.tech';
        }, 2000);
      }, 600);
    });
  }

  // 15. GSAP MOTION GRAPHICS & SCROLL REVEALS
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // A. Hero Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl.from('.nav-brand', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
          .from('.nav-links li', { opacity: 0, y: -15, stagger: 0.08, duration: 0.6 }, '-=0.5')
          .from('.nav-actions', { opacity: 0, x: 20, duration: 0.6 }, '-=0.4')
          .from('.gsap-fade-up', { opacity: 0, y: 30, stagger: 0.14, duration: 0.85 }, '-=0.3')
          .from('.scroll-down-indicator', { opacity: 0, y: 15, duration: 0.8 }, '-=0.2');

    // B. ScrollTrigger Animations for Sections
    if (typeof ScrollTrigger !== 'undefined') {

      // Section Headings Reveal
      gsap.utils.toArray('.reveal-heading').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out'
        });
      });

      // Left Column Reveals
      gsap.utils.toArray('.reveal-left').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: -50,
          duration: 0.9,
          ease: 'power3.out'
        });
      });

      // Right Column Reveals
      gsap.utils.toArray('.reveal-right').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: 50,
          duration: 0.9,
          ease: 'power3.out'
        });
      });

      // Staggered Up Reveals (Cards, Skills, Stats)
      gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Staggered Project Cards Entrance
      ScrollTrigger.batch('.project-card', {
        start: 'top 85%',
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            y: 60,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out'
          });
        },
        once: true
      });

      // Staggered Skill Pills Entrance
      ScrollTrigger.batch('.skill-pill', {
        start: 'top 90%',
        onEnter: batch => {
          gsap.from(batch, {
            opacity: 0,
            scale: 0.85,
            stagger: 0.04,
            duration: 0.5,
            ease: 'back.out(1.5)'
          });
        },
        once: true
      });

      // Stats Counters Trigger
      ScrollTrigger.create({
        trigger: '.stats-counter-grid',
        start: 'top 85%',
        onEnter: () => {
          if (!statsAnimated) {
            initStatsCounter();
            statsAnimated = true;
          }
        },
        once: true
      });

      // Timeline Nodes Stagger
      gsap.utils.toArray('.timeline-item').forEach((item, idx) => {
        const node = item.querySelector('.timeline-node');
        const card = item.querySelector('.timeline-content-card');

        gsap.from(node, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)'
        });

        gsap.from(card, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          x: idx % 2 === 0 ? 30 : -30,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1
        });
      });

      // Parallax subtle shifts for background ambient glows
      gsap.to('.glow-1', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5
        },
        y: 200,
        x: -50
      });

      gsap.to('.glow-2', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2
        },
        y: -300,
        x: 60
      });

      gsap.to('.glow-3', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8
        },
        y: -150
      });

    }
  } else {
    // Fallback if GSAP is blocked: trigger stats counter on scroll
    window.addEventListener('scroll', () => {
      const statsGrid = document.querySelector('.stats-counter-grid');
      if (statsGrid && !statsAnimated) {
        const rect = statsGrid.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          initStatsCounter();
          statsAnimated = true;
        }
      }
    });
  }
});
