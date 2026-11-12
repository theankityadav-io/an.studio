/**
 * Editz of Shivam — site interactions
 * Keeps navigation, contact links and portfolio playback in one place.
 */

const SITE = {
  brandName: "Editz of Shivam",
  whatsappNumber: "919582048072",
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setBrandName() {
  document.querySelectorAll("[data-brand]").forEach((element) => {
    element.textContent = SITE.brandName;
  });

  document.title = `${SITE.brandName} — Reels that keep people watching`;
}

function setupMobileNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");

  if (!menuButton || !navigation) return;

  const closeMenu = () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function setupWhatsAppLinks() {
  const contactNote = document.getElementById("contact-note");
  const links = document.querySelectorAll(".whatsapp-link");
  const validNumber = /^\d{10,15}$/.test(SITE.whatsappNumber);

  if (!validNumber) {
    links.forEach((link) => {
      link.href = "#contact";
      link.addEventListener("click", (event) => {
        event.preventDefault();

        if (!contactNote) return;
        contactNote.textContent = "WhatsApp is not connected yet. Please check the contact number.";
        contactNote.classList.add("setup-warning");
      });
    });
    return;
  }

  const message = encodeURIComponent(
    `Hi ${SITE.brandName}, I'm interested in your ₹4,999 package for 10 Instagram Reels. Can you share your portfolio and demo process?`
  );
  const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}?text=${message}`;

  links.forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function loadPortfolioVideo(mediaCard) {
  const video = mediaCard.querySelector("video");
  const source = video?.querySelector("source[data-src]");

  if (!video || !source || video.dataset.loaded === "true") return;

  video.dataset.loaded = "true";
  source.src = source.dataset.src;
  source.removeAttribute("data-src");

  video.addEventListener("loadeddata", () => {
    video.classList.add("is-ready");
    mediaCard.classList.add("is-ready");
  }, { once: true });

  video.addEventListener("error", () => {
    video.classList.remove("is-ready");
    mediaCard.classList.remove("is-ready");
    video.dataset.loaded = "false";
  }, { once: true });

  video.load();

  if (!prefersReducedMotion) {
    video.play().catch(() => {
      // Some browsers require a user gesture before playback.
    });
  }
}

function setupPortfolioVideos() {
  const mediaCards = document.querySelectorAll(".work-media");

  if (!("IntersectionObserver" in window)) {
    mediaCards.forEach(loadPortfolioVideo);
    return;
  }

  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      loadPortfolioVideo(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "220px 0px",
    threshold: 0.01,
  });

  mediaCards.forEach((card) => videoObserver.observe(card));
}

function setupVideoSoundControls() {
  document.querySelectorAll(".work-media").forEach((mediaCard) => {
    const video = mediaCard.querySelector("video");
    if (!video) return;

    const soundButton = document.createElement("button");
    soundButton.className = "video-sound-toggle";
    soundButton.type = "button";
    soundButton.setAttribute("aria-label", "Unmute video");
    soundButton.textContent = "🔇";

    soundButton.addEventListener("click", () => {
      video.muted = !video.muted;
      soundButton.textContent = video.muted ? "🔇" : "🔊";
      soundButton.setAttribute(
        "aria-label",
        video.muted ? "Unmute video" : "Mute video"
      );
    });

    mediaCard.appendChild(soundButton);
  });
}

function initialiseSite() {
  setBrandName();
  setupMobileNavigation();
  setupWhatsAppLinks();
  setupPortfolioVideos();
  setupVideoSoundControls();
}

initialiseSite();
