import { createModal } from "./create-modal";
import { getPlatformIcon } from "./get-plataform-icon";

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
          <button class="primary-button details-button">Más Detalles</button>
          <button class="button-image favorite-button">
            <div></div>
          </button>
        </div>
      </div>
    `;

    const favoriteButton = card.querySelector(".favorite-button");
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

    const detailButton = card.querySelector(".details-button");
    detailButton.addEventListener("click", () =>
      createModal(cardContainer, game)
    );

    cardContainer.appendChild(card);
  });
}
