const header = document.querySelector("#site-header");
const sections = document.querySelectorAll("main section[data-theme]");

if (header && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const activeSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
      if (activeSections.length > 0) {
        header.dataset.theme = activeSections[0].target.dataset.theme;
      }
    },
    { rootMargin: "-76px 0px -65% 0px", threshold: [0, 0.15, 0.35, 0.6] },
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const navScrim = document.querySelector("#nav-scrim");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let navCloseTimer = 0;

function closeMobileNav() {
  if (!menuToggle || !mobileNav || !navScrim) return;
  window.clearTimeout(navCloseTimer);
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  mobileNav.classList.remove("is-open");
  navScrim.classList.remove("is-visible");
  document.body.classList.remove("nav-open");

  const finishClosing = () => {
    mobileNav.hidden = true;
    navScrim.hidden = true;
  };

  if (reducedMotion.matches) {
    finishClosing();
  } else {
    navCloseTimer = window.setTimeout(finishClosing, 260);
  }
}

if (menuToggle && mobileNav && navScrim) {
  const getMobileNavLinks = () => [...mobileNav.querySelectorAll("a[href]")];

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMobileNav();
      return;
    }

    window.clearTimeout(navCloseTimer);
    mobileNav.hidden = false;
    navScrim.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("nav-open");
    window.requestAnimationFrame(() => {
      mobileNav.classList.add("is-open");
      navScrim.classList.add("is-visible");
    });
    mobileNav.querySelector("a")?.focus();
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMobileNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMobileNav();
      menuToggle.focus();
    }

    if (event.key === "Tab" && menuToggle.getAttribute("aria-expanded") === "true") {
      const links = getMobileNavLinks();
      if (links.length === 0) return;
      const firstLink = links[0];
      const lastLink = links[links.length - 1];

      if (event.shiftKey && document.activeElement === firstLink) {
        event.preventDefault();
        menuToggle.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        menuToggle.focus();
      } else if (!event.shiftKey && document.activeElement === menuToggle) {
        event.preventDefault();
        firstLink.focus();
      } else if (event.shiftKey && document.activeElement === menuToggle) {
        event.preventDefault();
        lastLink.focus();
      }
    }
  });

  navScrim.addEventListener("click", closeMobileNav);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMobileNav();
    }
  });
}

const searchForm = document.querySelector("#search-form");
const searchMessage = document.querySelector("#search-message");
const listingCards = [...document.querySelectorAll(".listing-card")];
const listingGrid = document.querySelector("#listing-grid");
const minimumPrice = document.querySelector("#minimum-price");
const maximumPrice = document.querySelector("#maximum-price");

function formatResultCount(count) {
  return `${count} sample ${count === 1 ? "home" : "homes"} found. Demo records only.`;
}

function compareOptionalCounts(firstValue, secondValue, direction) {
  if (firstValue === "" || secondValue === "") {
    if (firstValue === secondValue) return 0;
    return firstValue === "" ? 1 : -1;
  }
  return (Number(firstValue) - Number(secondValue)) * direction;
}

function sortListingCards(sortBy) {
  if (!listingGrid) return;

  const sortedCards = [...listingCards].sort((first, second) => {
    const firstDate = first.dataset.date || "";
    const secondDate = second.dataset.date || "";
    const firstPrice = Number(first.dataset.price || 0);
    const secondPrice = Number(second.dataset.price || 0);
    const firstBeds = first.dataset.beds || "";
    const secondBeds = second.dataset.beds || "";
    const firstBaths = first.dataset.baths || "";
    const secondBaths = second.dataset.baths || "";

    switch (sortBy) {
      case "oldest":
        return firstDate.localeCompare(secondDate);
      case "price-asc":
        return firstPrice - secondPrice;
      case "price-desc":
        return secondPrice - firstPrice;
      case "beds-asc":
        return compareOptionalCounts(firstBeds, secondBeds, 1);
      case "beds-desc":
        return compareOptionalCounts(firstBeds, secondBeds, -1);
      case "baths-asc":
        return compareOptionalCounts(firstBaths, secondBaths, 1);
      case "baths-desc":
        return compareOptionalCounts(firstBaths, secondBaths, -1);
      case "newest":
      default:
        return secondDate.localeCompare(firstDate);
    }
  });

  sortedCards.forEach((card) => listingGrid.append(card));
}

if (searchForm && searchMessage && minimumPrice && maximumPrice && listingGrid) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    minimumPrice.setCustomValidity("");
    maximumPrice.setCustomValidity("");

    const minValue = minimumPrice.value === "" ? null : Number(minimumPrice.value);
    const maxValue = maximumPrice.value === "" ? null : Number(maximumPrice.value);

    if (minValue !== null && maxValue !== null && minValue > maxValue) {
      maximumPrice.setCustomValidity("Maximum price must be greater than or equal to minimum price.");
      searchMessage.textContent = "Check your price range. The maximum must be at least the minimum.";
      maximumPrice.reportValidity();
      return;
    }

    const formData = new FormData(searchForm);
    const selectedLocation = String(formData.get("location") || "");
    const selectedType = String(formData.get("propertyType") || "");
    const selectedBedrooms = String(formData.get("bedrooms") || "");
    const selectedBathrooms = String(formData.get("bathrooms") || "");
    const sortBy = String(formData.get("sortBy") || "newest");
    let visibleCount = 0;

    listingCards.forEach((card) => {
      const price = Number(card.dataset.price);
      const bedroomsMatch = !selectedBedrooms ||
        (selectedBedrooms === "studio"
          ? card.dataset.type === "Residential" && card.dataset.beds === "0"
          : card.dataset.beds !== "" && Number(card.dataset.beds) >= Number(selectedBedrooms));
      const bathroomsMatch = !selectedBathrooms ||
        (card.dataset.baths !== "" && Number(card.dataset.baths) >= Number(selectedBathrooms));
      const matches =
        (!selectedLocation || card.dataset.location === selectedLocation) &&
        (!selectedType || card.dataset.type === selectedType) &&
        bedroomsMatch &&
        bathroomsMatch &&
        (minValue === null || price >= minValue) &&
        (maxValue === null || price <= maxValue);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    sortListingCards(sortBy);
    searchMessage.textContent = visibleCount > 0
      ? formatResultCount(visibleCount)
      : "No sample homes match those filters. Try a wider price range or fewer preferences.";
  });

  searchForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      listingCards.forEach((card) => {
        card.hidden = false;
      });
      sortListingCards("newest");
      minimumPrice.setCustomValidity("");
      maximumPrice.setCustomValidity("");
      searchMessage.textContent = "Three sample homes are shown. Demo records only.";
    }, 0);
  });

  [minimumPrice, maximumPrice].forEach((input) => {
    input.addEventListener("input", () => input.setCustomValidity(""));
  });
}

const gallerySlides = [...document.querySelectorAll(".gallery-slide[data-gallery-index]")];
const galleryThumbs = [...document.querySelectorAll(".gallery-thumb[data-thumb-index]")];
const galleryStage = document.querySelector("#gallery-stage");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryCount = document.querySelector("#gallery-count");
const galleryPrevious = document.querySelector("#gallery-previous");
const galleryNext = document.querySelector("#gallery-next");
const galleryExpand = document.querySelector("#gallery-expand");
const thumbsTrack = document.querySelector("#gallery-thumbs");
const thumbsPrev = document.querySelector("#gallery-thumbs-prev");
const thumbsNext = document.querySelector("#gallery-thumbs-next");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxPrevious = document.querySelector("#lightbox-previous");
const lightboxNext = document.querySelector("#lightbox-next");

const galleryItems = gallerySlides.map((slide) => {
  const image = slide.querySelector("img");
  return {
    src: image?.getAttribute("src") || "",
    alt: image?.alt || "",
    caption: slide.dataset.caption || image?.alt || "",
  };
});

let carouselIndex = 0;
let activeGalleryIndex = 0;

function updateThumbNav() {
  if (!thumbsTrack || !thumbsPrev || !thumbsNext) return;
  const maxScroll = thumbsTrack.scrollWidth - thumbsTrack.clientWidth;
  thumbsPrev.hidden = thumbsTrack.scrollLeft <= 2;
  thumbsNext.hidden = thumbsTrack.scrollLeft >= maxScroll - 2;
}

function showCarouselImage(index) {
  if (gallerySlides.length === 0) return;
  carouselIndex = (index + gallerySlides.length) % gallerySlides.length;

  gallerySlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === carouselIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    if (isActive) slide.querySelector("img")?.removeAttribute("loading");
  });

  galleryThumbs.forEach((thumb, thumbIndex) => {
    const isActive = thumbIndex === carouselIndex;
    thumb.classList.toggle("is-active", isActive);
    thumb.setAttribute("aria-selected", String(isActive));
    thumb.tabIndex = isActive ? 0 : -1;
    if (isActive && thumbsTrack) {
      const left = thumb.offsetLeft - (thumbsTrack.clientWidth - thumb.offsetWidth) / 2;
      thumbsTrack.scrollTo({ left, behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
  });

  if (galleryCaption) galleryCaption.textContent = galleryItems[carouselIndex].caption;
  if (galleryCount) galleryCount.textContent = `${carouselIndex + 1} / ${gallerySlides.length}`;
}

if (gallerySlides.length > 0) {
  showCarouselImage(0);

  galleryPrevious?.addEventListener("click", () => showCarouselImage(carouselIndex - 1));
  galleryNext?.addEventListener("click", () => showCarouselImage(carouselIndex + 1));

  galleryThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => showCarouselImage(Number(thumb.dataset.thumbIndex)));
  });

  thumbsTrack?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      showCarouselImage(carouselIndex + (event.key === "ArrowRight" ? 1 : -1));
      galleryThumbs[carouselIndex]?.focus();
    }
  });

  galleryStage?.addEventListener("keydown", (event) => {
    if (event.target !== galleryStage) return;
    if (event.key === "ArrowLeft") showCarouselImage(carouselIndex - 1);
    if (event.key === "ArrowRight") showCarouselImage(carouselIndex + 1);
  });

  let touchStartX = 0;
  let touchStartY = 0;
  galleryStage?.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });
  galleryStage?.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      showCarouselImage(carouselIndex + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });

  const scrollThumbs = (direction) => {
    if (!thumbsTrack) return;
    thumbsTrack.scrollBy({
      left: direction * thumbsTrack.clientWidth * 0.8,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  };
  thumbsPrev?.addEventListener("click", () => scrollThumbs(-1));
  thumbsNext?.addEventListener("click", () => scrollThumbs(1));
  thumbsTrack?.addEventListener("scroll", updateThumbNav, { passive: true });
  window.addEventListener("resize", updateThumbNav);
  window.addEventListener("load", updateThumbNav);
  updateThumbNav();
}

function showGalleryImage(index) {
  if (!lightboxImage || !lightboxCaption || galleryItems.length === 0) return;
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = `${item.caption} · Photo ${activeGalleryIndex + 1} of ${galleryItems.length}`;
}

if (
  lightbox instanceof HTMLDialogElement &&
  lightboxImage &&
  lightboxCaption &&
  lightboxClose &&
  lightboxPrevious &&
  lightboxNext
) {
  let galleryOpener = null;
  const openLightbox = (opener) => {
    galleryOpener = opener;
    showGalleryImage(carouselIndex);
    lightbox.showModal();
    lightboxClose.focus();
  };

  galleryExpand?.addEventListener("click", () => openLightbox(galleryExpand));
  gallerySlides.forEach((slide) => {
    slide.addEventListener("click", () => openLightbox(galleryExpand));
  });

  lightboxClose.addEventListener("click", () => lightbox.close());
  lightboxPrevious.addEventListener("click", () => showGalleryImage(activeGalleryIndex - 1));
  lightboxNext.addEventListener("click", () => showGalleryImage(activeGalleryIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    showCarouselImage(activeGalleryIndex);
    galleryOpener?.focus();
    galleryOpener = null;
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      lightbox.close();
    }
    if (event.key === "ArrowLeft") showGalleryImage(activeGalleryIndex - 1);
    if (event.key === "ArrowRight") showGalleryImage(activeGalleryIndex + 1);
  });
}

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-message-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactStatus.textContent = "";
    if (!contactForm.checkValidity()) {
      contactStatus.textContent = "Please complete the required fields using a valid email address.";
      contactForm.reportValidity();
      return;
    }
    contactStatus.textContent = "Demo only. Your message was not sent. Please call Marci at (206) 919-6886.";
    contactForm.reset();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  document.documentElement.classList.add("js-ready");
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
