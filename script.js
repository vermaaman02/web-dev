// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");
  const loadingProgress = document.querySelector(".loading-progress");
  const loadingPercent = document.querySelector(".loading-percent");

  let progress = 0;
  const preloaderInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress > 100) progress = 100;

    loadingProgress.style.width = `${progress}%`;
    loadingPercent.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.style.display = "none";
          document.body.classList.add("loaded");
        }, 500);
      }, 500);
    }
  }, 100);

  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Use setTimeout for smoother follower movement
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 50);
  });

  // Hide cursor when leaving the window
  document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
  });

  document.addEventListener("mouseover", () => {
    cursor.style.display = "block";
    cursorFollower.style.display = "block";
  });

  // Custom cursor interactions
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .event-card, .gallery-image, .social-link"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorFollower.style.width = "60px";
      cursorFollower.style.height = "60px";
      cursor.style.transform = "scale(0.5)";
    });

    element.addEventListener("mouseleave", () => {
      cursorFollower.style.width = "40px";
      cursorFollower.style.height = "40px";
      cursor.style.transform = "scale(1)";
    });
  });

  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Close navigation when clicking a link (mobile)
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Countdown Timer
  const countdownDate = new Date("April 12, 2025 00:00:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Add leading zeros
    daysEl.textContent = days < 10 ? "0" + days : days;
    hoursEl.textContent = hours < 10 ? "0" + hours : hours;
    minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;

    // If countdown is over
    if (distance < 0) {
      clearInterval(countdownInterval);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      document.querySelector(".countdown-title").textContent =
        "Event Has Started!";
    }
  }

  // Update countdown every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Gallery Slider
  const galleryTrack = document.querySelector(".gallery-track");
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  const galleryDots = document.querySelector(".gallery-dots");

  let currentSlide = 0;
  const slideWidth = 100; // percentage

  // Set up dots
  gallerySlides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("gallery-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    galleryDots.appendChild(dot);
  });

  const dots = document.querySelectorAll(".gallery-dot");

  function goToSlide(index) {
    currentSlide = index;
    galleryTrack.style.transform = `translateX(-${slideWidth * currentSlide}%)`;

    // Update dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  galleryPrev.addEventListener("click", () => {
    currentSlide =
      currentSlide === 0 ? gallerySlides.length - 1 : currentSlide - 1;
    goToSlide(currentSlide);
  });

  galleryNext.addEventListener("click", () => {
    currentSlide =
      currentSlide === gallerySlides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
  });

  // Auto-advance gallery
  let galleryInterval = setInterval(() => {
    currentSlide =
      currentSlide === gallerySlides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
  }, 5000);

  // Pause auto-advance on hover
  galleryTrack.addEventListener("mouseenter", () => {
    clearInterval(galleryInterval);
  });

  galleryTrack.addEventListener("mouseleave", () => {
    galleryInterval = setInterval(() => {
      currentSlide =
        currentSlide === gallerySlides.length - 1 ? 0 : currentSlide + 1;
      goToSlide(currentSlide);
    }, 5000);
  });

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Simple validation
      if (name === "" || email === "" || subject === "" || message === "") {
        showFormError("Please fill in all fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormError("Please enter a valid email address");
        return;
      }

      // If validation passes, simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';

      // Simulate sending (would be replaced with actual AJAX in production)
      setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span>';
        contactForm.reset();

        // Reset button after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }, 3000);
      }, 2000);
    });

    function showFormError(message) {
      // Create or use existing error message element
      let errorEl = document.querySelector(".form-error");

      if (!errorEl) {
        errorEl = document.createElement("div");
        errorEl.className = "form-error";
        errorEl.style.color = "var(--error)";
        errorEl.style.marginBottom = "2rem";
        errorEl.style.textAlign = "center";
        errorEl.style.fontFamily = "var(--font-special)";
        contactForm.prepend(errorEl);
      }

      errorEl.textContent = message;

      // Clear error after 3 seconds
      setTimeout(() => {
        errorEl.textContent = "";
      }, 3000);
    }
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip if the link is just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Typing Animation for Hero Subtitle
  const typingText = document.querySelector(".typing-text");

  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing animation after preloader finishes
    setTimeout(typeWriter, 1500);
  }

  // Scroll Animations with Intersection Observer
  const animatedElements = document.querySelectorAll(
    ".section-title, .event-card, .contact-card, .about-text p, .developer-portrait, .hero-cta, .countdown-container"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add initial classes and start observing
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(element);
  });

  // Custom class for fade-in animation
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `
  );

  // Particles.js initialization
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#00f3ff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00f3ff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }

  // Dynamic year for copyright
  const copyrightYear = document.querySelector(".copyright p");
  if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = copyrightYear.textContent.replace(
      "2025",
      currentYear + 1
    );
  }

  // AOS-like scroll animations for events
  const eventCards = document.querySelectorAll(".event-card");
  eventCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Intersection Observer for staggered animations
  const staggerObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  eventCards.forEach((card) => {
    staggerObserver.observe(card);
  });

  // Form input animations
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  formInputs.forEach((input) => {
    // Check if input has value on load
    if (input.value.trim() !== "") {
      input.parentElement.classList.add("input-focused");
    }

    // Add focused class on focus
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("input-focused");
    });

    // Remove focused class if no value
    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.parentElement.classList.remove("input-focused");
      }
    });
  });

  // Add input-focused styles
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            .input-focused label {
                transform: translateY(-20px);
                font-size: 1.2rem;
                color: var(--primary);
            }
        </style>
    `
  );

  // Dark mode toggle (optional feature)
  const createDarkModeToggle = () => {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "theme-toggle";
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.setAttribute("aria-label", "Toggle Dark/Light Mode");

    toggleBtn.style.position = "fixed";
    toggleBtn.style.bottom = "20px";
    toggleBtn.style.right = "20px";
    toggleBtn.style.zIndex = "90";
    toggleBtn.style.width = "50px";
    toggleBtn.style.height = "50px";
    toggleBtn.style.borderRadius = "50%";
    toggleBtn.style.backgroundColor = "var(--surface)";
    toggleBtn.style.color = "var(--primary)";
    toggleBtn.style.border = "1px solid var(--primary)";
    toggleBtn.style.fontSize = "2rem";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.display = "flex";
    toggleBtn.style.alignItems = "center";
    toggleBtn.style.justifyContent = "center";
    toggleBtn.style.transition = "all 0.3s ease";

    document.body.appendChild(toggleBtn);

    let isDarkMode = true; // Start with dark mode as default

    toggleBtn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;

      if (isDarkMode) {
        document.body.classList.remove("light-theme");
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.body.classList.add("light-theme");
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  };

  // Uncomment to enable dark mode toggle
  // createDarkModeToggle();

  // Interactive event cards with 3D tilt effect
  const tiltCards = document.querySelectorAll(".event-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", handleTilt);
    card.addEventListener("mouseleave", resetTilt);
  });

  function handleTilt(e) {
    const cardInner = this.querySelector(".event-card-inner");
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = ((x - centerX) / centerX) * 10; // max 10 degrees tilt
    const deltaY = ((y - centerY) / centerY) * 10; // max 10 degrees tilt

    // Don't apply tilt if card is flipped
    if (getComputedStyle(cardInner).transform.includes("matrix3d")) {
      return;
    }

    cardInner.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;

    // Add shine effect
    const shine = this.querySelector(".shine") || document.createElement("div");
    if (!this.querySelector(".shine")) {
      shine.classList.add("shine");
      shine.style.position = "absolute";
      shine.style.top = "0";
      shine.style.left = "0";
      shine.style.right = "0";
      shine.style.bottom = "0";
      shine.style.backgroundImage =
        "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)";
      shine.style.zIndex = "5";
      shine.style.opacity = "0";
      shine.style.transition = "opacity 0.3s ease";
      shine.style.pointerEvents = "none";
      this.appendChild(shine);
    }

    // Calculate shine position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    shine.style.backgroundPosition = `${shineX}% ${shineY}%`;
    shine.style.opacity = "1";
  }

  function resetTilt() {
    const cardInner = this.querySelector(".event-card-inner");
    const shine = this.querySelector(".shine");

    // Don't reset if card is flipped
    if (getComputedStyle(cardInner).transform.includes("matrix3d")) {
      return;
    }

    cardInner.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";

    if (shine) {
      shine.style.opacity = "0";
    }
  }

  // Glitch effect animation on hover for section titles
  const glitchTexts = document.querySelectorAll(".glitch-text");

  glitchTexts.forEach((text) => {
    text.addEventListener("mouseenter", () => {
      text.classList.add("glitch-hover");

      // Add glitch-hover style if not already present
      if (!document.querySelector("#glitch-hover-style")) {
        const style = document.createElement("style");
        style.id = "glitch-hover-style";
        style.textContent = `
                    .glitch-hover::before {
                        animation: glitch-anim 2s infinite linear alternate-reverse !important;
                    }
                    .glitch-hover::after {
                        animation: glitch-anim2 1.5s infinite linear alternate-reverse !important;
                    }
                `;
        document.head.appendChild(style);
      }
    });

    text.addEventListener("mouseleave", () => {
      text.classList.remove("glitch-hover");
    });
  });

  // Audio feedback on interactions (optional)
  const createAudioFeedback = () => {
    const hoverSound = new Audio();
    const clickSound = new Audio();

    // Set audio sources - replace with actual path to sound files
    hoverSound.src = "hover.mp3";
    clickSound.src = "click.mp3";

    // Reduce volume
    hoverSound.volume = 0.2;
    clickSound.volume = 0.3;

    // Add hover sound to interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, .event-card, .social-link"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {}); // Catch errors if autoplay is blocked
      });

      el.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {}); // Catch errors if autoplay is blocked
      });
    });
  };

  // Uncomment to enable audio feedback
  // createAudioFeedback();

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imgOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px 100px 0px",
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");

            // Fade in image once loaded
            img.addEventListener("load", () => {
              img.classList.add("loaded");
            });
          }

          observer.unobserve(img);
        }
      });
    }, imgOptions);

    // Convert normal img src to data-src for lazy loading
    const lazyImages = document.querySelectorAll(
      'img[src^="https://via.placeholder"]'
    );
    lazyImages.forEach((img) => {
      const src = img.src;
      img.setAttribute("data-src", src);
      img.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23121212"/%3E%3C/svg%3E';
      img.style.transition = "opacity 0.3s ease";
      img.style.opacity = "0";

      imgObserver.observe(img);
    });
    // Add loaded style
    document.head.insertAdjacentHTML(
      "beforeend",
      `
            <style>
                img.loaded {
                    opacity: 1 !important;
                }
            </style>
        `
    );
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const circuitLines = document.querySelector(".circuit-lines");
  const hologram = document.querySelector(".hologram");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    // Only apply parallax if we're in the hero section
    if (scrollPos <= heroHeight) {
      const parallaxFactor = scrollPos * 0.4;

      heroContent.style.transform = `translateY(${parallaxFactor * 0.1}px)`;
      circuitLines.style.transform = `translateY(${parallaxFactor * 0.2}px)`;
      hologram.style.transform = `translateY(${-parallaxFactor * 0.3}px)`;
    }
  });

  // Easter egg - Konami code
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    // Create a retro game-like animation or effect
    const gameOverlay = document.createElement("div");
    gameOverlay.style.position = "fixed";
    gameOverlay.style.top = "0";
    gameOverlay.style.left = "0";
    gameOverlay.style.width = "100%";
    gameOverlay.style.height = "100%";
    gameOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    gameOverlay.style.zIndex = "9999";
    gameOverlay.style.display = "flex";
    gameOverlay.style.alignItems = "center";
    gameOverlay.style.justifyContent = "center";
    gameOverlay.style.flexDirection = "column";

    const gameTitle = document.createElement("h1");
    gameTitle.textContent = "BONUS LEVEL UNLOCKED";
    gameTitle.style.fontFamily = "var(--font-heading)";
    gameTitle.style.color = "var(--primary)";
    gameTitle.style.fontSize = "4rem";
    gameTitle.style.textAlign = "center";
    gameTitle.style.marginBottom = "2rem";
    gameTitle.style.animation =
      "glitch-anim 2s infinite linear alternate-reverse";

    const gameDesc = document.createElement("p");
    gameDesc.textContent = "Click anywhere to continue...";
    gameDesc.style.fontFamily = "var(--font-special)";
    gameDesc.style.color = "var(--text)";
    gameDesc.style.fontSize = "2rem";
    gameDesc.style.textAlign = "center";

    gameOverlay.appendChild(gameTitle);
    gameOverlay.appendChild(gameDesc);
    document.body.appendChild(gameOverlay);

    gameOverlay.addEventListener("click", () => {
      gameOverlay.style.opacity = "0";
      gameOverlay.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        gameOverlay.remove();
      }, 500);
    });
  }

  // Performance optimizations
  // Throttle scroll events
  function throttle(callback, limit) {
    let waiting = false;
    return function () {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }

  // Apply throttling to scroll handlers
  const throttledScroll = throttle(() => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Parallax effect (throttled)
    const scrollPos = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrollPos <= heroHeight) {
      const parallaxFactor = scrollPos * 0.4;

      heroContent.style.transform = `translateY(${parallaxFactor * 0.1}px)`;
      circuitLines.style.transform = `translateY(${parallaxFactor * 0.2}px)`;
      hologram.style.transform = `translateY(${-parallaxFactor * 0.3}px)`;
    }
  }, 50);

  window.addEventListener("scroll", throttledScroll);

  // Check for reduce motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Disable animations and transitions
    document.documentElement.style.setProperty("--glow-primary", "none");
    document.documentElement.style.setProperty("--glow-secondary", "none");
    document.documentElement.style.setProperty("--glow-accent", "none");

    // Stop the gallery autoplay
    clearInterval(galleryInterval);

    // Remove parallax effects
    window.removeEventListener("scroll", throttledScroll);
  }

  // Check for browser support and provide fallbacks
  const modernBrowser =
    "IntersectionObserver" in window &&
    "querySelector" in document &&
    "addEventListener" in window &&
    "classList" in document.createElement("div");

  if (!modernBrowser) {
    // Fallback for older browsers
    document.body.classList.add("legacy-browser");

    // Add legacy browser styles
    document.head.insertAdjacentHTML(
      "beforeend",
      `
            <style>
                .legacy-browser .preloader {
                    display: none;
                }
                .legacy-browser .cursor, 
                .legacy-browser .cursor-follower {
                    display: none;
                }
                .legacy-browser #particles-js {
                    display: none;
                }
                .legacy-browser .glitch-text:before,
                .legacy-browser .glitch-text:after {
                    display: none;
                }
            </style>
        `
    );

    // Show compatibility message
    const compatMessage = document.createElement("div");
    compatMessage.style.position = "fixed";
    compatMessage.style.top = "0";
    compatMessage.style.left = "0";
    compatMessage.style.width = "100%";
    compatMessage.style.padding = "10px";
    compatMessage.style.backgroundColor = "var(--accent)";
    compatMessage.style.color = "white";
    compatMessage.style.textAlign = "center";
    compatMessage.style.zIndex = "9999";
    compatMessage.textContent =
      "For the best experience, please use a modern browser like Chrome, Firefox, Safari, or Edge.";

    document.body.appendChild(compatMessage);
  }

  // Initialize a service worker for PWA support (if needed)
  // Initialize a service worker for PWA support (if needed)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("ServiceWorker registration failed: ", error);
        });
    });
  }

  // Analytics tracking (placeholder - would be replaced with actual analytics code)
  function trackEvent(category, action, label) {
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: category,
        event_label: label,
      });
    }
  }

  // Track page views and interactions
  const trackableElements = document.querySelectorAll("a, button, .event-card");
  trackableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const category = this.closest("section")
        ? this.closest("section").id
        : "unknown";
      const action = "click";
      const label =
        this.textContent.trim() || this.getAttribute("aria-label") || "unknown";

      trackEvent(category, action, label);
    });
  });

  // Dynamic content loading (for potential future use)
  function loadMoreEvents() {
    // This would fetch more events from a server
    return new Promise((resolve) => {
      // Simulated API response
      setTimeout(() => {
        resolve([
          {
            title: "Blockchain Workshop",
            date: "April 13, 2025",
            icon: "fa-link",
            description:
              "Learn about blockchain technology and cryptocurrency fundamentals in this hands-on workshop.",
            time: "2:00 PM - 5:00 PM",
            location: "Tech Lab 3",
          },
          {
            title: "Gaming Tournament",
            date: "April 14, 2025",
            icon: "fa-gamepad",
            description:
              "Compete in our esports tournament featuring popular competitive titles with prizes for top performers.",
            time: "10:00 AM - 6:00 PM",
            location: "Gaming Arena",
          },
        ]);
      }, 1000);
    });
  }

  // Function to add more events to the grid (can be called from a "Load More" button)
  function appendEvents(eventsData) {
    const eventsGrid = document.querySelector(".events-grid");

    eventsData.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      eventCard.innerHTML = `
                <div class="event-card-inner">
                    <div class="event-card-front">
                        <div class="event-icon">
                            <i class="fas ${event.icon}"></i>
                        </div>
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-date">${event.date}</div>
                    </div>
                    <div class="event-card-back">
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.description}</p>
                        <div class="event-details">
                            <div class="event-detail">
                                <i class="fas fa-calendar"></i> ${event.date}
                            </div>
                            <div class="event-detail">
                                <i class="fas fa-clock"></i> ${event.time}
                            </div>
                            <div class="event-detail">
                                <i class="fas fa-map-marker-alt"></i> ${event.location}
                            </div>
                        </div>
                                              <a href="#register" class="btn btn-small">Register</a>
                    </div>
                </div>
            `;

      eventsGrid.appendChild(eventCard);

      // Apply the same event listeners to new cards
      eventCard.addEventListener("mousemove", handleTilt);
      eventCard.addEventListener("mouseleave", resetTilt);
    });
  }

  // Optional: Implement View All Events button functionality
  const viewAllBtn = document.querySelector(".btn-outline");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Show loading state
      this.innerHTML = '<span class="btn-text">Loading...</span>';

      // Fetch more events
      loadMoreEvents()
        .then((newEvents) => {
          appendEvents(newEvents);

          // Reset button text and disable it
          this.innerHTML = '<span class="btn-text">All Events Loaded</span>';
          this.disabled = true;
          this.style.opacity = "0.7";
          this.style.cursor = "default";
        })
        .catch((error) => {
          console.error("Error loading events:", error);
          this.innerHTML = '<span class="btn-text">Try Again</span>';
        });
    });
  }

  // Set page visible class after all initialization is complete
  setTimeout(() => {
    document.body.classList.add("page-visible");

    // Add a style for better page transition
    document.head.insertAdjacentHTML(
      "beforeend",
      `
            <style>
                .page-visible .container,
                .page-visible section,
                .page-visible header,
                .page-visible footer {
                    opacity: 1;
                    transform: none;
                }
            </style>
        `
    );
  }, 500);

  // Console Easter Egg
  console.log(
    "%c🚀 TechPhilia 8 ",
    "color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"
  );
  console.log(
    "%cWelcome to the developer console! Interested in how this site works? Check out our repository or join our tech team!",
    "color: #f300ff;"
  );
});

// Debug Tool (can be removed in production)
function toggleDebugMode() {
  document.body.classList.toggle("debug-mode");

  if (!document.querySelector("#debug-styles")) {
    const debugStyles = document.createElement("style");
    debugStyles.id = "debug-styles";
    debugStyles.textContent = `
            .debug-mode * {
                outline: 1px solid rgba(255, 0, 0, 0.2);
            }
            .debug-mode *:hover {
                outline: 1px solid rgba(255, 0, 0, 0.6);
            }
        `;
    document.head.appendChild(debugStyles);
  }

  return document.body.classList.contains("debug-mode")
    ? "Debug Mode: ON"
    : "Debug Mode: OFF";
}

// Force https in production (can be enabled in production)
if (
  window.location.protocol === "http:" &&
  window.location.hostname !== "localhost"
) {
  window.location.href = window.location.href.replace("http:", "https:");
}
                    
