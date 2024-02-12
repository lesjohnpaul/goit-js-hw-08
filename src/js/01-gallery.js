import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
const lightbox = document.querySelector(".gallery");

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
lightbox.innerHTML = images;

const lightboxInstance = new SimpleLightbox(".gallery a", {});
console.log(galleryItems);



