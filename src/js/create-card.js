import { createCarrousel } from "./create-carrousel";

export function createCard(games, cardContainer) {
  cardContainer.innerHTML = "";
  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img class="card-image" src="${game.background_image}" alt="${game.name}">

      <div class="card-content">
      <h3>${game.name}</h3>
        <div class="platforms">
          ${game.parent_platforms
            .map((platform) => getPlatformIcon(platform.platform.name))
            .join("")}
        </div>

        <div class="card-buttons">
          <button class="details-button">Más Detalles</button>
          <button class="favorite-button">
            <img src="/assets/favoritos.png" alt="Agregar a favoritos">
          </button>
        </div>
      </div>
      <div class="modal-container ocult">
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
                  if (i === game.short_screenshots.length - 1)
                    position = "last";
                  if (game.short_screenshots.length <= 1) position = "active";
                  return `<img class="carrousel-image ${position}" src="${image.image}">`;
                })
                .join("")}
            </div>
            <div class="button-container">
              <button class="prev-button"><</button>
              <button class="next-button">></button>
            </div>
            <div class="modal-buttons">
              <button class="favorite-button">
                <img src="/assets/favoritos.png" alt="Agregar a favoritos" />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const favoriteButton = card.querySelector(".favorite-button");
    favoriteButton.addEventListener("click", () =>
      localStorage.setItem(game.id, JSON.stringify(game))
    );

    const detailButton = card.querySelector(".details-button");
    const closeModalButton = card.querySelector(".close-button");
    const modal = card.querySelector(".modal-container");
    detailButton.onclick = () => modal.classList.remove("ocult");
    closeModalButton.onclick = () => modal.classList.add("ocult");
    cardContainer.appendChild(card);

    const containerEl = card.querySelector(".carrousel");

    const prevButton = card.querySelector(".prev-button");
    prevButton.addEventListener("click", () => moveCarrousel("prev"));
    const nextButton = card.querySelector(".next-button");
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
        newNext = activeEl;
        newLast = lastEl.previousElementSibling || images[slides.length - 1];
      }

      newActive.classList.add("active");
      newNext.classList.add("next");
      newLast.classList.add("last");
    }
  });
}

function getPlatformIcon(platformName) {
  switch (platformName) {
    case "PC":
      return `<img src="/assets/microsoft.png" title="PC" alt="PC">`;
    case "PlayStation":
      return `<img src="/assets/playstation.png" title="PlayStation" alt="PlayStation">`;
    case "Xbox":
      return `<img src="/assets/xbox.png" title="Xbox" alt="Xbox">`;
    case "iOS":
      return `<img src="/assets/apple.png" title="Apple" alt="Apple">`;
    case "Android":
      return `<img src="/assets/android.png" title="Android" alt="Android">`;
    case "Apple Macintosh":
      return `<img src="/assets/mac.png" title="Mac" alt="Mac">`;
    case "Linux":
      return `<img src="/assets/linux.png" title="Linux" alt="Linux">`;
    case "Nintendo":
      return `<img src="/assets/nintendo.png" title="Nintendo" alt="Nintendo">`;
    case "Web":
      return `<img src="/assets/web.png" title="Nintendo" alt="Nintendo">`;
    case "SEGA":
      return `<img src="/assets/sega.png" title="SEGA" alt="SEGA">`;
    case "Commodore / Amiga":
      return `<img src="/assets/commodore.png" title="Commodore / Amiga" alt="Commodore / Amiga">`;
    case "Neo Geo":
      return `<img src="/assets/neogeo.png" title="Neo Geo" alt="Neo Geo">`;
    case "Atari":
      return `<img src="/assets/atari.png" title="Atari" alt="Atari">`;
    default:
      return `<span>${platformName}</span>`;
  }
}
