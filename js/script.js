(function () {
  // Smooth scrolling for nav + active link highlight
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
      if (activeLink) {
        activeLink.classList.remove("active");
      }
      link.classList.add("active");
      activeLink = link;
    });
  });

  // WhatsApp redirects (Book + Contact)
  const phoneNumber = "+2349135536900";
  const message = encodeURIComponent("Hello, I need cleaning services!");
  const wa = () => window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

  const bookBtn = document.getElementById("book-btn");
  if (bookBtn) bookBtn.addEventListener("click", wa);

  const contactBtn = document.getElementById("contact-btn");
  if (contactBtn) contactBtn.addEventListener("click", wa);

  // Counter (triggers once when visible)
  const counterEl = document.querySelector(".hero-counter .count");
  if (counterEl) {
    const target = +counterEl.getAttribute("data-target");
    let current = 0;
    const tick = () => {
      const step = Math.max(1, Math.ceil(target / 100));
      current = Math.min(target, current + step);
      counterEl.textContent = String(current);
      if (current < target) setTimeout(tick, 20);
    };
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  tick();
                  obs.disconnect();
                }
              });
            },
            { threshold: 0.5 }
          )
        : null;
    if (io) {
      io.observe(document.querySelector(".hero-counter"));
    } else {
      tick();
    }
  }

  // Parallax hero image (subtle, guarded)
  const heroImg = document.querySelector(".parallax-img");
  if (heroImg) {
    document.addEventListener("mousemove", (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 16;
      const my = (e.clientY / window.innerHeight - 0.5) * 16;
      heroImg.style.transform = `translate(${mx}px, ${my}px)`;
    });
  }

  // GSAP animations (progressive; content is already visible)
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up
    gsap.utils.toArray(".fade-up").forEach((el) => {
      const delay = el.classList.contains("delay-3")
        ? 0.6
        : el.classList.contains("delay-2")
        ? 0.4
        : el.classList.contains("delay-1")
        ? 0.2
        : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        delay,
      });
    });

    // Scale-up Cards
    gsap.utils.toArray(".scale-up").forEach((el) => {
      const delay = el.classList.contains("delay-3")
        ? 0.6
        : el.classList.contains("delay-2")
        ? 0.4
        : el.classList.contains("delay-1")
        ? 0.2
        : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        ease: "back.out(1.6)",
        delay,
      });
    });

    // Team fade-in
    gsap.utils.toArray(".fade-in").forEach((el) => {
      const delay = el.classList.contains("delay-2")
        ? 0.4
        : el.classList.contains("delay-1")
        ? 0.2
        : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        delay,
      });
    });

    // Testimonials slide
    gsap.utils.toArray(".quote-slide").forEach((el) => {
      const delay = el.classList.contains("delay-2")
        ? 0.4
        : el.classList.contains("delay-1")
        ? 0.2
        : 0;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 92%" },
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power2.out",
        delay,
      });
    });
  }
})();
