// Enhanced Solar System Loading Screen Functions
function initLoadingScreen() {
    // Clear existing stars first to prevent duplication
    const existingStars = document.querySelectorAll(".star");
    existingStars.forEach((star) => star.remove());

    createStars("loadingStars", 200);
    createSpaceDust("loadingDust");
    updateLoadingPercentage();
    animateSolarSystem();
}

function animateSolarSystem() {
    const planets = document.querySelectorAll(".planet");
    planets.forEach((planet, index) => {
        planet.style.animation = `planetFloat ${
            3 + index
        }s ease-in-out infinite alternate`;
    });
    createComet();
}

function createComet() {
    const solarSystem = document.querySelector(".solar-system");
    const comet = document.createElement("div");
    comet.className = "comet";

    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const angle = Math.random() * 360;

    comet.style.left = `${startX}%`;
    comet.style.top = `${startY}%`;
    comet.style.transform = `rotate(${angle}deg)`;
    comet.style.setProperty("--angle", `${angle}deg`);

    const duration = 15 + Math.random() * 10;
    comet.style.animation = `cometFly ${duration}s linear`;

    solarSystem.appendChild(comet);

    setTimeout(() => {
        comet.remove();
        setTimeout(createComet, 5000);
    }, duration * 1000);
}

function updateLoadingPercentage() {
    const percentageElement = document.getElementById("loadingPercentage");
    const countdownElement = document.getElementById("loadingCountdown");
    let percent = 0;

    const messages = [
        { threshold: 0, text: "Booting cosmic systems..." },
        { threshold: 10, text: "Initializing star fields..." },
        { threshold: 20, text: "Calibrating planetary orbits..." },
        { threshold: 30, text: "Loading interstellar assets..." },
        { threshold: 40, text: "Compiling quantum data..." },
        { threshold: 50, text: "Generating cosmic effects..." },
        { threshold: 60, text: "Rendering galaxy textures..." },
        { threshold: 70, text: "Finalizing interface..." },
        { threshold: 80, text: "Almost there..." },
        { threshold: 90, text: "Ready for launch!" },
    ];

    const interval = setInterval(() => {
        let increment;
        if (percent < 20) {
            increment = Math.random() * 3 + 1;
        } else if (percent < 60) {
            increment = Math.random() * 4 + 2;
        } else if (percent < 90) {
            increment = Math.random() * 2 + 0.5;
        } else {
            increment = Math.random() * 0.5 + 0.1;
        }

        percent += increment;
        if (percent > 100) percent = 100;

        percentageElement.textContent = `${Math.floor(percent)}%`;
        updatePlanetSpeeds(percent);

        const currentMessage = messages.reduce(
            (last, msg) => (percent >= msg.threshold ? msg.text : last),
            ""
        );
        countdownElement.textContent = currentMessage;

        if (percent > 85 && Math.random() > 0.7) {
            createStarBurst();
        }

        if (percent >= 100) {
            clearInterval(interval);
            completeLoading();
        }
    }, 100);
}

function createStarBurst() {
    const loadingScreen = document.getElementById("loadingScreen");
    const star = document.createElement("div");
    star.className = "star-burst";

    star.style.left = `${Math.random() * 100}%`;
    star.style.bottom = "0";

    const colors = ["#ffffff", "#64b5f6", "#ffd700", "#00e5ff", "#a855f7"];
    star.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 3 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    loadingScreen.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1000);
}

function updatePlanetSpeeds(percent) {
    const speedFactor = 1 + (percent / 100) * 2;

    document.getElementById("orbit1").style.animationDuration = `${
        5 / speedFactor
    }s`;
    document.getElementById("orbit2").style.animationDuration = `${
        10 / speedFactor
    }s`;
    document.getElementById("orbit3").style.animationDuration = `${
        15 / speedFactor
    }s`;
    document.getElementById("orbit4").style.animationDuration = `${
        20 / speedFactor
    }s`;

    document.querySelector(".sun-core").style.animationDuration = `${
        4 / speedFactor
    }s`;
}

function completeLoading() {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        const loadingText = document.querySelector(".loading-text");
        const subtext = document.querySelector(".subtext");
        const loadingBar = document.querySelector(".loading-bar-container");
        const loadingCountdown = document.querySelector(".loading-countdown");
        const solarSystem = document.querySelector(".solar-system");
        const socialIcons = document.querySelector(".loading-social-icons");

        for (let i = 0; i < 20; i++) {
            setTimeout(() => createStarBurst(), i * 50);
        }

        loadingText.style.animation = "textDissolve 0.8s ease-out forwards";
        subtext.style.animation = "fadeOut 0.7s ease-out forwards";
        loadingBar.style.animation = "fadeOut 0.6s ease-out forwards";
        loadingCountdown.style.animation = "fadeOut 0.5s ease-out forwards";
        solarSystem.style.animation = "fadeOut 0.8s ease-out forwards";
        socialIcons.style.animation = "fadeOut 0.5s ease-out forwards";

        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";

            const mainContent = document.getElementById("mainContent");
            mainContent.classList.add("active");

            setTimeout(() => {
                loadingScreen.remove();
                // Initialize main content stars after loading screen is removed
                resetStars();
            }, 1000);
        }, 1000);
    }, 1000);
}

// Improved star creation function to prevent clustering
function createStars(containerId, count = 300) {
    const starsContainer = document.getElementById(containerId);

    // Clear existing stars first
    while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
    }

    // Create a grid system to distribute stars evenly
    const gridSize = Math.ceil(Math.sqrt(count));
    const cellSize = 100 / gridSize;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Calculate grid position with slight randomness
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        const randomX = Math.random() * cellSize * 0.8;
        const randomY = Math.random() * cellSize * 0.8;

        star.style.left = `${gridX * cellSize + randomX}%`;
        star.style.top = `${gridY * cellSize + randomY}%`;

        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random animation duration
        const duration = Math.random() * 5 + 3;
        star.style.setProperty("--duration", `${duration}s`);
        star.style.animationDelay = `${Math.random() * 10}s`;

        // Random color from palette
        const colors = ["#ffffff", "#64b5f6", "#ffd700", "#00e5ff", "#a855f7"];
        star.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        starsContainer.appendChild(star);
    }
}

function createSpaceDust(containerId) {
    const spaceDustContainer = document.getElementById(containerId);
    const dustCount = 50;

    // Clear existing dust first
    while (spaceDustContainer.firstChild) {
        spaceDustContainer.removeChild(spaceDustContainer.firstChild);
    }

    for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement("div");
        dust.classList.add("dust");

        const size = Math.random() * 1.5 + 0.5;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;

        // Distribute dust more evenly
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.top = `${Math.random() * 100 + 100}%`;

        const duration = Math.random() * 40 + 40;
        dust.style.animation = `float ${duration}s linear infinite`;
        dust.style.animationDelay = `${Math.random() * 40}s`;

        dust.style.opacity = Math.random() * 0.3 + 0.1;

        spaceDustContainer.appendChild(dust);
    }
}

function createFloatingParticles() {
    const container = document.getElementById("floatingParticles");
    const particleCount = 25;

    // Clear existing particles first
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("floating-particle");

        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Distribute particles more evenly
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        const duration = Math.random() * 15 + 10;
        particle.style.animation = `floatParticle ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 15}s`;

        particle.style.opacity = Math.random() * 0.5 + 0.3;

        const colors = ["#ffffff", "#a855f7", "#ffd700", "#00e5ff"];
        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

function setupNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const navbar = document.getElementById("navbar");
    const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenuBackdrop.classList.toggle("active");
        hamburger.innerHTML = navLinks.classList.contains("active")
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    mobileMenuBackdrop.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBackdrop.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove("active");
                mobileMenuBackdrop.classList.remove("active");
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 10) {
            navbar.classList.remove("scrolled");
            navbar.style.boxShadow = "0 8px 32px rgba(13, 2, 29, 0.3)";
        } else if (currentScroll > 50) {
            navbar.classList.add("scrolled");
            navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active");
            mobileMenuBackdrop.classList.remove("active");
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });
}

function setupScrollIndicator() {
    const scrollIndicator = document.getElementById("scrollIndicator");
    const backToTop = document.getElementById("backToTop");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            scrollIndicator.style.opacity = "0";
            scrollIndicator.style.pointerEvents = "none";
        } else if (currentScroll <= 100) {
            scrollIndicator.style.opacity = "0.8";
            scrollIndicator.style.pointerEvents = "auto";
        }

        if (currentScroll > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

        lastScroll = currentScroll;
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    scrollIndicator.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        });
    });
}

function setupSectionReveal() {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    const h1 = entry.target.querySelector("h1");
                    const h2 = entry.target.querySelector("h2");
                    const p = entry.target.querySelectorAll("p");
                    const buttons =
                        entry.target.querySelectorAll(
                            ".cosmic-button"
                        );
                    const cards = entry.target.querySelectorAll(
                        ".project-card, .skill-item, .art-card"
                    );

                    if (h1) {
                        h1.style.animation =
                            "fadeInLeft 0.8s ease-out forwards";
                    }
                    if (h2) {
                        h2.style.animation =
                            "fadeInLeft 0.8s ease-out 0.2s forwards";
                    }
                    if (p) {
                        p.forEach((para, index) => {
                            para.style.animation = `fadeInRight 0.8s ease-out ${
                                0.3 + index * 0.1
                            }s forwards`;
                        });
                    }
                    if (buttons) {
                        buttons.forEach((button, index) => {
                            button.style.animation = `fadeInRight 0.8s ease-out ${
                                0.5 + index * 0.1
                            }s forwards`;
                        });
                    }
                    if (cards) {
                        cards.forEach((card, index) => {
                            card.style.animation = `fadeInRight 0.8s ease-out ${
                                0.2 + index * 0.1
                            }s forwards`;
                        });
                    }
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}

function setupSkillModal() {
    const skillDescriptions = {
        php: {
            title: "PHP",
            icon: "fab fa-php",
            description:
                "Saya memahami logika pemrograman PHP dan mampu membangun aplikasi web sederhana. Pengalaman saya termasuk membuat sistem inventaris dan manajemen data dengan pendekatan logis untuk troubleshooting.",
        },
        mysql: {
            title: "MySQL",
            icon: "fas fa-database",
            description:
                "Saya berpengalaman membuat dan mengelola database MySQL untuk proyek seperti sistem inventaris. Saya memahami konsep normalisasi database, query SQL dasar, dan integrasi dengan PHP.",
        },
        html: {
            title: "HTML5",
            icon: "fab fa-html5",
            description:
                "Saya memiliki dasar HTML yang solid untuk membangun struktur website. Meskipun masih sering merujuk contoh kode, saya mampu mengimplementasikan berbagai elemen HTML dengan tepat dan membuat struktur yang rapi dan semantik.",
        },
        css: {
            title: "CSS3",
            icon: "fab fa-css3-alt",
            description:
                "Saya paham konsep dasar CSS termasuk flexbox dan grid. Kreativitas dalam mendesain antarmuka dan ketelitian dalam menyempurnakan tampilan visual adalah kelebihan saya.",
        },
        javascript: {
            title: "JavaScript",
            icon: "fab fa-js",
            description:
                "Saya menguasai dasar-dasar JavaScript termasuk manipulasi DOM dan animasi sederhana. Meskipun belum mahir dalam konsep advanced, saya mampu menggunakan bantuan AI untuk mengimplementasikan fungsi yang lebih kompleks.",
        },
        figma: {
            title: "Figma",
            icon: "fab fa-figma",
            description:
                "Saya mahir menggunakan Figma untuk membuat wireframe dan mockup UI/UX. Kelebihan saya adalah kemampuan memadukan warna dan menciptakan tata letak yang estetis dengan tools dasar.",
        },
        canva: {
            title: "Canva",
            icon: "fas fa-palette",
            description:
                "Saya terampil menggunakan Canva untuk membuat desain grafis sederhana seperti poster, presentasi, dan konten media sosial dengan cepat dan efektif.",
        },
        ibispaint: {
            title: "Ibis Paint",
            icon: "fas fa-paint-brush",
            description:
                "Menggambar digital adalah passion saya sejak SMP. Menggunakan Ibis Paint, saya mampu membuat ilustrasi realis dan karakter kartun/anime dengan kepekaan kuat terhadap komposisi dan warna.",
        },
    };

    const modal = document.getElementById("skillModal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalIcon = modal.querySelector(".modal-icon-inner");
    const modalDescription = modal.querySelector(".modal-description");
    const closeModal = modal.querySelector(".close-modal");

    document.querySelectorAll(".skill-item, .skill-btn").forEach((element) => {
        element.addEventListener("click", function (e) {
            if (this.classList.contains("skill-btn")) {
                e.stopPropagation();
            }
            const skillItem = this.classList.contains("skill-item")
                ? this
                : this.closest(".skill-item");
            const skillId = skillItem.getAttribute("data-skill");
            const skill = skillDescriptions[skillId];

            if (skill) {
                modalTitle.textContent = skill.title;
                modalIcon.className = "modal-icon-inner " + skill.icon;
                modalDescription.textContent = skill.description;

                modal.classList.add("show");
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("show")) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    });
}

function simulateMobileHover(selector) {
    if ("ontouchstart" in window) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener("touchstart", function () {
                this.classList.add("hover-effect");
            });

            element.addEventListener("touchend", function () {
                setTimeout(() => {
                    this.classList.remove("hover-effect");
                }, 200);
            });
        });
    }
}

function resetStars() {
    const starsContainer = document.getElementById("stars");
    const spaceDustContainer = document.getElementById("spaceDust");

    // Clear existing
    starsContainer.innerHTML = "";
    spaceDustContainer.innerHTML = "";

    // Recreate
    createStars("stars");
    createSpaceDust("spaceDust");
}

// Form Submission - Fixed Version
function setupFormSubmission() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const submitButton = form.querySelector(".submit-button");
        const buttonText = submitButton.querySelector("span");
        const notification = document.getElementById("notification");

        // Show loading state
        buttonText.textContent = "Sending...";
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            
            // Debug: Log form data
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Form submission failed");
            }

            // Show success notification
            notification.classList.add("active");
            form.reset();

            // Reset form fields
            document.querySelectorAll(".form-group input, .form-group textarea").forEach((field) => {
                const label = field.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    resetLabelPosition(label);
                }
            });

            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.classList.remove("active");
            }, 5000);

        } catch (error) {
            console.error("Error:", error);
            buttonText.textContent = "Error! Try Again";
            
            // More detailed error handling
            if (error instanceof TypeError) {
                console.error("Network error or CORS issue");
            } else {
                console.error("Form submission error:", error.message);
            }
            
        } finally {
            setTimeout(() => {
                buttonText.textContent = "Send Message";
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

// Floating Labels - Fixed Version
function setupFloatingLabels() {
    document.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
        const label = input.nextElementSibling;
        const underline = label?.nextElementSibling;
        
        if (!label || !underline || label.tagName !== 'LABEL') {
            console.warn('Missing required label element for:', input);
            return;
        }

        // Check if already has value
        if (input.value) {
            updateLabelPosition(label);
        }

        // Focus events
        input.addEventListener("focus", function() {
            updateLabelPosition(label);
            if (underline) underline.style.width = "100%";
        });

        input.addEventListener("blur", function() {
            if (!this.value) {
                resetLabelPosition(label);
            }
            if (underline) underline.style.width = "0";
        });

        // Initialize if has value on load
        if (input.value) {
            updateLabelPosition(label);
        }
    });
}

function updateLabelPosition(label) {
    if (!label) return;
    label.style.transform = "translateY(-24px) translateX(-5px)";
    label.style.fontSize = "0.8rem";
    label.style.color = "var(--space-teal)";
    label.style.background = "rgba(42, 16, 81, 0.8)";
    label.style.padding = "0 5px";
    label.style.borderRadius = "4px";
}

function resetLabelPosition(label) {
    if (!label) return;
    label.style.transform = "";
    label.style.fontSize = "";
    label.style.color = "";
    label.style.background = "";
    label.style.padding = "";
    label.style.borderRadius = "";
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    initLoadingScreen();
    setupNavigation();
    setupSmoothScrolling();
    setupScrollIndicator();
    setupSectionReveal();
    setupSkillModal();
    simulateMobileHover(".card");
    simulateMobileHover(".btn");
    simulateMobileHover(".project");
    setupFormSubmission();
    setupFloatingLabels();
});

// Reset stars when window is resized to prevent clustering
window.addEventListener("resize", resetStars);

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 1, 24, 0.9);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    }
    
    .modal.show {
        display: flex;
    }
    
    .modal-content {
        background: rgba(42, 16, 81, 0.9);
        border-radius: 15px;
        padding: 25px;
        width: 90%;
        max-width: 500px;
        border: 1px solid var(--primary-accent);
        box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 1.5rem;
        color: var(--space-teal);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .close-modal:hover {
        color: var(--space-neon);
        transform: rotate(90deg);
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .modal-icon {
        width: 50px;
        height: 50px;
        background: rgba(168, 85, 247, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        color: var(--space-teal);
    }
    
    .modal-title {
        font-size: 1.5rem;
        color: var(--text-primary);
    }
    
    .modal-description {
        color: var(--text-secondary);
        line-height: 1.7;
    }
    
    /* Animations */
    @keyframes pulse {
        0% { opacity: 0.6; }
        100% { opacity: 1; }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes spin-reverse {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
    }
    
    /* Mobile hover effect */
    .hover-effect {
        transform: scale(0.98);
        transition: transform 0.2s ease;
    }

    /* Floating label styles */
    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        position: absolute;
        left: 0;
        top: 10px;
        color: var(--text-secondary);
        pointer-events: none;
        transition: all 0.3s ease;
        transform-origin: left center;
    }
    
    .form-group .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        background-color: var(--space-teal);
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style);