/* =========================================
   AKASH KUMAR PRADHAN - PORTFOLIO
   CINEMATIC INTERACTIVE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. LOADING SCREEN
    // =====================================

    const loader = document.getElementById("loader");

    document.body.classList.add("loading");

    let loaderHidden = false;

    function hideLoader() {
        if (loaderHidden) return;

        loaderHidden = true;

        if (loader) {
            loader.classList.add("hide");
        }

        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
    }

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 800);
    });

    // Safety fallback
    setTimeout(hideLoader, 3000);


    // =====================================
    // 2. TYPING ANIMATION
    // =====================================

    const typedText = document.getElementById("typed-text");

    const roles = [
        "Web Developer",
        "Frontend Developer",
        "Java Programmer",
        "Python Developer",
        "IoT Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingTimer;

    function typeEffect() {
        if (!typedText) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {
            typedText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex >= currentRole.length) {
                deleting = true;
                typingTimer = setTimeout(typeEffect, 1500);
                return;
            }

            typingTimer = setTimeout(typeEffect, 100);
        } else {
            typedText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex <= 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingTimer = setTimeout(typeEffect, 400);
                return;
            }

            typingTimer = setTimeout(typeEffect, 45);
        }
    }

    if (typedText) {
        typeEffect();
    }


    // =====================================
    // 3. BACKGROUND PARTICLES
    // =====================================

    const particlesContainer = document.getElementById("particles");

    function createParticles() {
        if (!particlesContainer) return;

        particlesContainer.innerHTML = "";

        const particleCount = window.innerWidth < 768 ? 25 : 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDuration = (Math.random() * 12 + 8) + "s";
            particle.style.animationDelay = (Math.random() * 10) + "s";

            const size = Math.random() * 3 + 1;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();


    // =====================================
    // 4. MOUSE FOLLOWING GLOW
    // =====================================

    const cursorGlow = document.getElementById("cursor-glow");

    const mouseSupported = window.matchMedia("(pointer: fine)").matches;

    if (cursorGlow && mouseSupported) {
        window.addEventListener("mousemove", (e) => {
            cursorGlow.style.left = e.clientX + "px";
            cursorGlow.style.top = e.clientY + "px";
        }, { passive: true });
    }


    // =====================================
    // 5. MOBILE NAVIGATION
    // =====================================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (menuBtn) {
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        }

        if (navLinks) {
            navLinks.classList.remove("open");
        }
    }

    function toggleMenu() {
        if (!menuBtn || !navLinks) return;

        const isOpen = navLinks.classList.toggle("open");

        menuBtn.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    }

    if (menuBtn && navLinks) {
        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when navigation link is clicked
    navItems.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (
            navLinks &&
            menuBtn &&
            navLinks.classList.contains("open") &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });


    // =====================================
    // 6. NAVBAR SCROLL EFFECT
    // =====================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });

    updateNavbar();


    // =====================================
    // 7. BACK TO TOP BUTTON
    // =====================================

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle("show", window.scrollY > 500);
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });

    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // =====================================
    // 8. SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // =====================================
    // 9. SKILL BAR ANIMATION
    // =====================================

    const skillCards = document.querySelectorAll(".skill-card");

    function animateSkill(card) {
        const progress = card.querySelector(".skill-progress");
        const percent = Number(card.dataset.percent);

        if (!progress) return;

        if (!Number.isFinite(percent)) {
            progress.style.width = "0%";
            return;
        }

        const safePercent = Math.min(Math.max(percent, 0), 100);

        progress.style.width = safePercent + "%";
    }

    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkill(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.35
        });

        skillCards.forEach(card => {
            skillObserver.observe(card);
        });
    } else {
        skillCards.forEach(animateSkill);
    }


    // =====================================
    // 10. PROJECT CARD 3D TILT
    // =====================================

    const projectCards = document.querySelectorAll(".project-card");

    const canTilt = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (canTilt) {
        projectCards.forEach(card => {

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                if (centerX === 0 || centerY === 0) return;

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
            });

        });
    }


    // =====================================
    // 11. ACTIVE NAV LINK
    // =====================================

    const sections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                navItems.forEach(link => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + currentId) {
                        link.classList.add("active");
                    }
                });
            });
        }, {
            threshold: 0.35
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // =====================================
    // 12. CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            if (!nameInput || !emailInput || !messageInput) {
                if (formNote) {
                    formNote.textContent = "Form fields are missing.";
                }
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                if (formNote) {
                    formNote.textContent = "Please fill in all fields.";
                }
                return;
            }

            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                if (formNote) {
                    formNote.textContent = "Please enter a valid email address.";
                }
                return;
            }

            const subject = encodeURIComponent(
                "Portfolio Contact - " + name
            );

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            const mailtoLink =
                "mailto:pradhanakashkumar2004@gmail.com" +
                "?subject=" + subject +
                "&body=" + body;

            if (formNote) {
                formNote.textContent = "Opening your email application...";
            }

            window.location.href = mailtoLink;
        });
    }


    // =====================================
    // 13. DYNAMIC COPYRIGHT YEAR
    // =====================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // 14. SMOOTH ANCHOR SCROLL
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =====================================
    // 15. HERO ENTRANCE ANIMATION
    // =====================================

    const heroContent = document.querySelector(".hero-content");
    const heroVisual = document.querySelector(".hero-visual");

    setTimeout(() => {
        if (heroContent) {
            heroContent.classList.add("hero-ready");
        }

        if (heroVisual) {
            heroVisual.classList.add("hero-ready");
        }
    }, 1200);


    // =====================================
    // 16. PARTICLE REGENERATION ON RESIZE
    // =====================================

    let resizeTimer;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            createParticles();
        }, 250);
    }, { passive: true });


    // =====================================
    // 17. BUTTON RIPPLE EFFECT
    // =====================================

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function (e) {

            // Avoid ripple on keyboard-triggered clicks
            if (typeof e.clientX !== "number" || typeof e.clientY !== "number") {
                return;
            }

            const ripple = document.createElement("span");

            ripple.className = "button-ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });


    // =====================================
    // 18. INITIALIZATION
    // =====================================

    console.log("AK Portfolio initialized successfully 🚀");

});