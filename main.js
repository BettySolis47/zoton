/* ===== Top nav background on scroll + back-to-top button ===== */
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle("scrolled", scrollY > 80);
  backToTop.classList.toggle("show", scrollY > 400);
});

/* ===== Back to top functionality ===== */
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ===== Mobile menu ===== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ===== Slider ===== */
const slides = document.querySelectorAll(".slide");
let idx = 0;

function showSlide(i) {
  slides.forEach((s) => s.classList.remove("active"));
  slides[i].classList.add("active");
}

document.getElementById("prev").onclick = () => {
  idx = (idx - 1 + slides.length) % slides.length;
  showSlide(idx);
};

document.getElementById("next").onclick = () => {
  idx = (idx + 1) % slides.length;
  showSlide(idx);
};

// Auto-advance slides every 5 seconds
setInterval(() => {
  idx = (idx + 1) % slides.length;
  showSlide(idx);
}, 5000);

/* ===== Particle background animation ===== */
const canvas = document.querySelector(".hero-canvas");
if (canvas) {
  let w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  const ctx = canvas.getContext("2d");
  
  let pts = Array.from({ length: Math.floor(w / 26) }, () => {
    return {
      x: Math.random() * w,
      y: Math.random() * h * 0.6,
      r: 1.2 + Math.random() * 1.4,
      dx: (Math.random() - 0.5) * 0.55,
      dy: 0.1 + Math.random() * 0.5,
      a: 0.12 + Math.random() * 0.18,
    };
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.globalAlpha = p.a;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.x = Math.random() * w;
      if (p.y > h * 0.7) {
        p.y = 0;
        p.x = Math.random() * w;
      }
    });
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
}

/* ===== Modal interaction ===== */
const modal = document.getElementById("priceModal");
const saveHint = document.getElementById("saveHint");

document.getElementById("openModal").onclick = (e) => {
  e.preventDefault();
  modal.classList.add("open");
  saveHint.textContent = "";
  document.getElementById("username").focus();
};

document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("open");
  saveHint.textContent = "";
};

// Close modal when clicking outside of it
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
    saveHint.textContent = "";
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    modal.classList.remove("open");
    saveHint.textContent = "";
  }
});

/* ===== Form submission ===== */
document.getElementById("submitInfo").onclick = () => {
  const name = document.getElementById("username").value.trim();
  const phone = document.getElementById("userphone").value.trim();

  // Validate name
  if (!name) {
    saveHint.textContent = "Please enter your name";
    saveHint.style.color = "#e74c3c";
    return;
  }

  // Validate phone number format (US 10-digit, with optional formatting)
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phone) {
    saveHint.textContent = "Please enter your phone number";
    saveHint.style.color = "#e74c3c";
    return;
  }
  if (!phoneRegex.test(phone)) {
    saveHint.textContent = "Please enter a valid phone number";
    saveHint.style.color = "#e74c3c";
    return;
  }

  // Save info to localStorage
  try {
    localStorage.setItem("zt-cust-name", name);
    localStorage.setItem("zt-cust-phone", phone);
    saveHint.textContent = "Submitted successfully! We'll contact you soon";
    saveHint.style.color = "var(--primary)";

    // Clear inputs and close modal
    setTimeout(() => {
      document.getElementById("username").value = "";
      document.getElementById("userphone").value = "";
      modal.classList.remove("open");
      saveHint.textContent = "";
    }, 1800);
  } catch (e) {
    saveHint.textContent = "Error saving your information. Please try again.";
    saveHint.style.color = "#e74c3c";
  }
};

/* ===== Support button ===== */
document.getElementById("supportBtn").onclick = () => {
  alert("Please call our hotline: (217) 555-0148");
};
