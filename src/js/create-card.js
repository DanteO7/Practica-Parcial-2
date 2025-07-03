import { createModal } from "./create-modal";
import { getPlatformIcon } from "./get-plataform-icon";

// crea la card recibiendo un array de juegos y el contenedor
export function createCard(games, cardContainer) {
  cardContainer.innerHTML = "";
  // por cada juego crea el html con los datos traidos de la API
  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img class="card-image" src="${game.background_image}" alt="${game.name}">

      <div class="card-content">
      <h3>${game.name}</h3>
        <div class="platforms">
          ${(game.parent_platforms || [])
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

    // el boton favorito hace un toggle a la clase active, si la tiene setea el juego en el local storage, si no lo remueve
    const favoriteButton = card.querySelector(".favorite-button");
    favoriteButton.addEventListener("click", () => {
      favoriteButton.classList.toggle("active");
      favoriteButton.classList.contains("active")
        ? localStorage.setItem(game.id, JSON.stringify(game))
        : localStorage.removeItem(game.id);
    });

    // recorre el local storage y le da la clase active al boton favorite de los juegos que encuentre
    for (let i = 0; i < localStorage.length; i++) {
      if (game.id == localStorage.key(i)) {
        favoriteButton.classList.add("active");
      }
    }

    // el boton de detalles crea un modal para el juego
    const detailButton = card.querySelector(".details-button");
    detailButton.addEventListener("click", () =>
      createModal(cardContainer, game, card)
    );

    // agrego la card al contenedor
    cardContainer.appendChild(card);
  });
}
