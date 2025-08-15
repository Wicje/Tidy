(function () {
  // Smooth scrolling and active link highlight
  const links = document.querySelectorAll("nav a");
  let activeLink = null;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      if (activeLink) activeLink.classList.remove("active");
      link.classList.add("active");
      activeLink = link;
      // Close mobile menu
      if (window.innerWidth <= 768) {
        document.querySelector(".nav-list").classList.remove("active");
        document.querySelector(".hamburger").classList.remove("active");
      }
    });
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const navList = document.querySelector(".nav-list");
      hamburger.classList.toggle("active");
      navList.classList.toggle("active");
    });
  }

  // Book Button Redirect to Contact Form
  const bookBtn = document.getElementById("book-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        // Optional: Focus on the name input for better UX
        const nameInput = document.querySelector("#contact-form input[type='text']");
        if (nameInput) nameInput.focus();
      }
    });
  }

  // WhatsApp Form Handling
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("input[type='text']").value.trim();

      if (!name) {
        alert("Please enter your name.");
        return;
      }

      const phoneNumber = "+2349135536900";
      const whatsappMessage = encodeURIComponent(`I am in need of cleaning services - ${name}`);
      window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");
      form.reset();
    });
  }

  // Dynamic Counter
  const counterEl = document.querySelector(".hero-counter .count");
  if (counterEl) {
    function animateCounter() {
      const target = +counterEl.getAttribute("data-target") || 500;
      let current = 0;
      const tick = () => {
        const step = Math.max(1, Math.ceil(target / 100));
        current = Math.min(target, current + step);
        counterEl.textContent = String(current);
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
    }
    animateCounter(); // Run on load
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) animateCounter();
          },
          { threshold: 0.5 }
        )
      : null;
    if (io) io.observe(document.querySelector(".hero-counter"));
  }

  // Parallax Hero Image
  const heroImg = document.querySelector(".parallax-img");
  if (heroImg) {
    document.addEventListener("mousemove", (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 20;
      const my = (e.clientY / window.innerHeight - 0.5) * 20;
      heroImg.style.transform = `translate(${mx}px, ${my}px)`;
    });
  }

  // Scroll to Top
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) scrollTopBtn.style.display = "block";
      else scrollTopBtn.style.display = "none";
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // GSAP Animations
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".fade-up").forEach((el) => {
      const delay = el.classList.contains("delay-3") ? 0.6
        : el.classList.contains("delay-2") ? 0.4
        : el.classList.contains("delay-1") ? 0.2 : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay,
      });
    });

    gsap.utils.toArray(".scale-up").forEach((el) => {
      const delay = el.classList.contains("delay-3") ? 0.6
        : el.classList.contains("delay-2") ? 0.4
        : el.classList.contains("delay-1") ? 0.2 : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
        ease: "back.out(1.7)",
        delay,
      });
    });

    gsap.utils.toArray(".fade-in").forEach((el) => {
      const delay = el.classList.contains("delay-2") ? 0.4
        : el.classList.contains("delay-1") ? 0.2 : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay,
      });
    });

    gsap.utils.toArray(".quote-slide").forEach((el) => {
      const delay = el.classList.contains("delay-2") ? 0.4
        : el.classList.contains("delay-1") ? 0.2 : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%" },
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power2.out",
        delay,
      });
    });
  }
})();
