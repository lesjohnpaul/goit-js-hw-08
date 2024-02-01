import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const lightbox = document.querySelector(".gallery");

// Generate HTML markup for each image
const images = galleryItems.map(image => `
  <div class="gallery__item">
    <a class="gallery__link" href="${image.original}">
      <img
        class="gallery__image"
        src="${image.preview}"
        data-source="${image.original}"
        alt="${image.description}"
      />
    </a>
  </div>`
).join("");

// Insert the generated HTML markup into the gallery container
lightbox.innerHTML = images;

// Initialize SimpleLightbox
const lightboxInstance = new SimpleLightbox(".gallery a", {});
console.log(galleryItems);



