/**
 * Editz of Shivam — site interactions
 * Keeps navigation, contact links and portfolio playback in one place.
 */

const SITE = {
  brandName: "Editz of Shivam",
  whatsappNumber: "919582048072",
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallScreen = window.matchMedia("(max-width: 650px)").matches;
const prefersDataSaving = navigator.connection?.saveData === true;

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

  if (!prefersReducedMotion && !isSmallScreen && !prefersDataSaving) {
    video.play().catch(() => {
      // Some browsers require a user gesture before playback.
    });
  }
}

function setupPortfolioVideos() {
  const mediaCards = document.querySelectorAll(".work-media");

  // On phones or data-saving connections, wait for an explicit tap before loading video files.
  if (isSmallScreen || prefersDataSaving) {
    mediaCards.forEach((card) => {
      const placeholder = card.querySelector(".media-placeholder");
      if (!placeholder) return;

      placeholder.setAttribute("role", "button");
      placeholder.setAttribute("tabindex", "0");
      placeholder.setAttribute("aria-label", "Load video preview");
      placeholder.addEventListener("click", () => loadPortfolioVideo(card), { once: true });
      placeholder.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        loadPortfolioVideo(card);
      });
    });
    return;
  }

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
    rootMargin: prefersDataSaving ? "0px" : (isSmallScreen ? "80px 0px" : "160px 0px"),
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


function setupEmailForm() {
  const form = document.getElementById("email-form");
  const note = document.getElementById("contact-note");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const senderName = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Website enquiry from ${senderName}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:financewithla@gmail.com?subject=${subject}&body=${body}`;

    if (note) {
      note.textContent = "Your email app should open with your message ready. If it does not, check that an email app is configured on your device.";
    }
  });
}

function initialiseSite() {
  setBrandName();
  setupMobileNavigation();
  setupWhatsAppLinks();
  setupEmailForm();
  setupPortfolioVideos();
  setupVideoSoundControls();
}

initialiseSite();
