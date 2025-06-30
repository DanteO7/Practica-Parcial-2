import { createModal } from "./create-modal";

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
        <div class="modal">
          <div class="close-button-container">
            <button class="close-button" >Cerrar</button>
          </div>
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
                .map(
                  (image) =>
                    `<img class="carrousel-image" src="${image.image}">`
                )
                .join("")}
            </div>
            <div class="card-buttons">
              <button class="details-button">Más Detalles</button>
              <button class="favorite-button">
                <img src="/assets/favoritos.png" alt="Agregar a favoritos" />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const detailButton = card.querySelector(".details-button");
    const closeModalButton = card.querySelector(".close-button");
    const modal = card.querySelector(".modal-container");
    detailButton.onclick = () => modal.classList.remove("ocult");
    closeModalButton.onclick = () => modal.classList.add("ocult");
    cardContainer.appendChild(card);
  });
}

function getPlatformIcon(platformName) {
  switch (platformName) {
    case "PC":
      return `<img src="/assets/microsoft.png" alt="PC">`;
    case "PlayStation":
      return `<img src="/assets/playstation.png" alt="PlayStation">`;
    case "Xbox":
      return `<img src="/assets/xbox.png" alt="Xbox">`;
    case "iOS":
      return `<img src="/assets/apple.png" alt="Apple">`;
    case "Android":
      return `<img src="/assets/android.png" alt="Android">`;
    case "Apple Macintosh":
      return `<img src="/assets/mac.png" alt="Mac">`;
    case "Linux":
      return `<img src="/assets/linux.png" alt="Linux">`;
    case "Nintendo":
      return `<img src="/assets/nintendo.png" alt="Nintendo">`;
    case "Web":
      return `<img src="/assets/web.png" alt="Nintendo">`;
    default:
      return `<span>${platformName}</span>`;
  }
}

// export function createCard(games, cardContainer) {
//   games.forEach((game) => {
//     const card = document.createElement("div");
//     card.className = "game-card";
//     card.innerHTML = `
//     <img src="${game.background_image}" alt="${game.name}">
//     <h3>${game.name}</h3>
//     ${game.parent_platforms.map((plataform) => {
//       return `<span>${plataform.platform.name}</span>`;
//     })}
//     <span>${game.released}</span>
//     ${game.genres.map((genre) => {
//       return `<span>${genre.name}</span>`;
//     })}
//     <span>${game.metacritic}</span>
//     `;
//     cardContainer.appendChild(card);
//   });
// }
