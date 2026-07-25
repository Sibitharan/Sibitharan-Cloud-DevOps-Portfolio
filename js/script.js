/* =========================
   AOS
========================= */
AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
});

/* =========================
   MOBILE NAV
========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

/* =========================
   CURSOR
========================= */
const cursor = document.querySelector(".cursor-dot");

if (cursor) {
    document.addEventListener("mousemove", event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    });
}

/* =========================
   GSAP HERO
========================= */
if (typeof gsap !== "undefined") {
    gsap.from(".hero-text > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
    });
}

/* =========================
   COUNTERS
========================= */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        let current = 0;
        const increment = target / 80;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* =========================
   CONTACT FORM
========================= */
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();

        alert(
            `Thanks ${name}! The contact form is ready to connect with a backend/email service.`
        );

        contactForm.reset();
    });
}

/* =========================
   NAVBAR SCROLL
========================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    navbar.style.background =
        window.scrollY > 50
            ? "rgba(13, 17, 23, 0.96)"
            : "rgba(13, 17, 23, 0.86)";
});
