// Personalize these values before publishing.
const CONFIG = {
  brandName: "Aany..studio",
  // Use country code + number, digits only. Example format: 919876543210
  whatsappNumber: "918377038072",
  // Optional: replace with your Instagram profile URL.
  instagramUrl: ""
};

document.querySelectorAll("[data-brand]").forEach((el) => {
  el.textContent = CONFIG.brandName;
});
document.title = `${CONFIG.brandName} — Reels that keep people watching`;

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}

const contactNote = document.getElementById("contact-note");
const whatsappLinks = document.querySelectorAll(".whatsapp-link");
const numberIsSet = /^\d{10,15}$/.test(CONFIG.whatsappNumber);
const message = encodeURIComponent(
  `Hi ${CONFIG.brandName}, I'm interested in your ₹4,999 package for 10 Instagram Reels. Can you share your portfolio and demo process?`
);

whatsappLinks.forEach((link) => {
  if (numberIsSet) {
    link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contact";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      contactNote.textContent = "WhatsApp isn't connected yet. Add your number in script.js, then publish again.";
      contactNote.classList.add("setup-warning");
      contactNote.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});

document.querySelectorAll(".work-media").forEach((media) => {
  const video = media.querySelector("video");
  const placeholder = media.querySelector(".media-placeholder");
  if (!video || !placeholder) return;
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.addEventListener("loadeddata", () => {
    video.style.opacity = "1";
    placeholder.style.display = "none";
    video.play().catch((error) => {
      console.warn("Portfolio video autoplay was blocked.", error);
    });
  });
  video.addEventListener("error", () => {
    video.style.opacity = "0";
    placeholder.style.display = "flex";
  });
  const soundToggle = document.createElement("button");
  soundToggle.className = "video-sound-toggle";
  soundToggle.type = "button";
  soundToggle.setAttribute("aria-label", "Unmute video");
  soundToggle.textContent = "🔇";
  soundToggle.addEventListener("click", () => {
    video.muted = !video.muted;
    soundToggle.textContent = video.muted ? "🔇" : "🔊";
    soundToggle.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
  });
  media.appendChild(soundToggle);
  video.load();
});
