import { getPlatformIcon } from "./get-plataform-icon";

export function createModal(card, game) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modalContainer.innerHTML = `
    <div class="modal-header">
        <button class="close-button">Cerrar</button>
    </div>
    <div class="modal">
        <img
        class="modal-image"
        src="${game.background_image}"
        alt="${game.name}"
        />

        <div class="modal-content">
        <h3>${game.name}</h3>
        <div class="platforms">
            ${game.parent_platforms
              .map((platform) => getPlatformIcon(platform.platform.name))
              .join("")}
        </div>
        <div class="details-container">
            <span>Fecha:</span>
            <span>${game.released}</span>
        </div>
        <div class="details-container">
            <span>Géneros:</span>
            <div class="genres">
            ${game.genres.map((genre) => `<span> ${genre.name}</span>`)}
            </div>
        </div>
        <div class="details-container">
            <span>Metacritic:</span>
            <span>${game.metacritic}</span>
        </div>
        <div class="carrousel">
            ${game.short_screenshots
              .map((image, i) => {
                let position = "next";
                if (i === 0) position = "active";
                if (i === game.short_screenshots.length - 1) position = "last";
                if (game.short_screenshots.length <= 1) position = "active";
                return `<img class="carrousel-image ${position}" src="${image.image}">`;
              })
              .join("")}
        </div>
        <div class="button-container">
            <button class="modal-button prev-button"><</button>
            <button class="modal-button next-button">></button>
        </div>
        <div class="modal-buttons">
            <button class="favorite-button">
            <img src="/assets/favoritos.png" alt="Agregar a favoritos" />
            </button>
        </div>
        </div>
    </div>
  `;

  const favoriteButton = modalContainer.querySelector(".favorite-button");
  favoriteButton.addEventListener("click", () => {
    favoriteButton.classList.toggle("active");
    favoriteButton.classList.contains("active")
      ? localStorage.setItem(game.id, JSON.stringify(game))
      : localStorage.removeItem(game.id);
  });

  for (let i = 0; i < localStorage.length; i++) {
    if (game.id == localStorage.key(i)) {
      favoriteButton.classList.add("active");
    }
  }
  const closeModalButton = modalContainer.querySelector(".close-button");
  closeModalButton.addEventListener("click", () => {
    card.removeChild(card.lastElementChild);
    const cardFavoriteButton = card.querySelector(".favorite-button");
    cardFavoriteButton.className = favoriteButton.className;
  });

  const containerEl = modalContainer.querySelector(".carrousel");

  const prevButton = modalContainer.querySelector(".prev-button");
  prevButton.addEventListener("click", () => moveCarrousel("prev"));
  const nextButton = modalContainer.querySelector(".next-button");
  nextButton.addEventListener("click", () => moveCarrousel("next"));

  function moveCarrousel(direction) {
    const images = containerEl.querySelectorAll(".carrousel-image");
    const activeEl = containerEl.querySelector(".active");
    const nextEl = containerEl.querySelector(".next");
    const lastEl = containerEl.querySelector(".last");

    images.forEach((image) => {
      image.classList.remove("active", "next", "last");
    });

    let newActive, newNext, newLast;

    if (direction === "next") {
      newActive = nextEl;
      newNext = nextEl.nextElementSibling || images[0];
      newLast = activeEl;
    } else {
      newActive = lastEl;
      newLast = lastEl.previousElementSibling || images[images.length - 1];
      newNext = activeEl;
    }

    newActive.classList.add("active");
    newNext.classList.add("next");
    newLast.classList.add("last");
  }

  card.appendChild(modalContainer);
}
