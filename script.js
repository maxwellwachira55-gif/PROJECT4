// Handle mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Close nav when clicking a link on mobile
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Scroll reveal for sections
const revealElements = document.querySelectorAll(".reveal");

function handleReveal(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(handleReveal, {
    threshold: 0.18,
  });
  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback for very old browsers
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Contact form -> open WhatsApp with pre-filled message
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const policyType = form.policyType.value;
  const message = form.message.value.trim();

  const policyLabelMap = {
    motor: "Motor / Vehicle",
    medical: "Medical / Health",
    life: "Life / Personal Accident",
    property: "Property / Fire",
    business: "Business Interruption",
    other: "Other / Not sure",
  };

  const parts = [];
  if (name) parts.push(`Name: ${name}`);
  if (email) parts.push(`Email: ${email}`);
  if (policyType) {
    const label = policyLabelMap[policyType] || policyType;
    parts.push(`Policy type: ${label}`);
  }
  if (message) parts.push(`Issue: ${message}`);

  const composed = parts.join("\n");
  const encoded = encodeURIComponent(
    `Hello Alex,\n\nI would like assistance with an insurance claim.\n\n${composed}`
  );

  // Phone number formatted for WhatsApp (adjust country code if needed)
  const phone = "254768415720";
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url, "_blank", "noopener");

  return false;
}

// Set dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

