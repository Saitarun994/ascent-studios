"use strict";

const gallery = document.getElementById("gallery-track");
const galleryItems = [...gallery.querySelectorAll(".gallery-item")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const previousButton = document.getElementById("gallery-prev");
const nextButton = document.getElementById("gallery-next");
const galleryCounter = document.getElementById("gallery-counter");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
let activeFilter = "all";

function visibleItems() {
  return galleryItems.filter(item => !item.hidden);
}

function activeIndex() {
  const items = visibleItems();
  const trackLeft = gallery.getBoundingClientRect().left;
  let nearest = 0;
  let distance = Infinity;
  items.forEach((item, index) => {
    const delta = Math.abs(item.getBoundingClientRect().left - trackLeft);
    if (delta < distance) {
      distance = delta;
      nearest = index;
    }
  });
  return nearest;
}

function updateGalleryControls() {
  const items = visibleItems();
  const index = activeIndex();
  galleryCounter.textContent = `${String(items.length ? index + 1 : 0).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
  previousButton.disabled = gallery.scrollLeft < 8;
  nextButton.disabled = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 8;
}

function moveGallery(direction) {
  const items = visibleItems();
  if (!items.length) return;
  const target = Math.max(0, Math.min(items.length - 1, activeIndex() + direction));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gallery.scrollTo({ left: items[target].offsetLeft - gallery.offsetLeft, behavior: prefersReducedMotion ? "instant" : "smooth" });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    galleryItems.forEach(item => { item.hidden = activeFilter !== "all" && item.dataset.category !== activeFilter; });
    filterButtons.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    gallery.scrollTo({ left: 0, behavior: "instant" });
    requestAnimationFrame(updateGalleryControls);
  });
});

previousButton.addEventListener("click", () => moveGallery(-1));
nextButton.addEventListener("click", () => moveGallery(1));
gallery.addEventListener("scroll", updateGalleryControls, { passive: true });
gallery.addEventListener("keydown", event => {
  if (event.target !== gallery) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    moveGallery(event.key === "ArrowRight" ? 1 : -1);
  }
});
window.addEventListener("resize", updateGalleryControls, { passive: true });

for (const item of galleryItems) {
  const imageButton = item.querySelector(".gallery-image-button");
  imageButton.addEventListener("click", () => {
    lightboxImage.src = imageButton.dataset.image;
    lightboxImage.alt = imageButton.dataset.alt;
    lightboxCaption.textContent = item.querySelector("figcaption strong").textContent;
    if (typeof lightbox.showModal === "function") lightbox.showModal();
  });
}
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => { lightboxImage.src = ""; });

document.getElementById("copyright-year").textContent = String(new Date().getFullYear());
updateGalleryControls();
