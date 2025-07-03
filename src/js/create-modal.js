import { getPlatformIcon } from "./get-plataform-icon";

// crea un modal y lo agrega al final del contenedor recibiendo el contenedor de cards, la card y el juego
// lo creo desde cero y lo agrego porque si uso una clase ocult la página debería cargar todas las imagenes de todas las cards y tarda bastante
export function createModal(cardContainer, game, card) {
  document.body.style.overflow = "hidden";
  // creo el contenedor y le agrego el html
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modalContainer.innerHTML = `
  <div class="modal">
        <div class="modal-header">
          <button class="button-image close-button"><div></div></button>
        </div>
        <img
        class="modal-image"
        src="${game.background_image}"
        alt="${game.name}"
        />

        <div class="modal-content">
        <h3>${game.name}</h3>
        <div class="modal-platforms">
            ${(game.parent_platforms || [])
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
                // le doy una clase dependiendo la posición que este cada imagen
                let position = "next";
                if (i === 0) position = "active";
                if (i === game.short_screenshots.length - 1) position = "last";
                if (game.short_screenshots.length <= 1) position = "active";
                return `<img class="carrousel-image ${position}" src="${image.image}">`;
              })
              .join("")}
        </div>
        <div class="carrousel-buttons">
            <button class="button-image prev-button"><div></div></button>
            <button class="button-image next-button"><div></div></button>
        </div>
        <div class="favorite-container">
            <button class="button-image favorite-button">
              <div></div>
            </button>
        </div>
        </div>
    </div>
  `;

  // el boton favorito hace un toggle a la clase active, si la tiene setea el juego en el local storage, si no lo remueve
  const favoriteButton = modalContainer.querySelector(".favorite-button");
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

  // cierra el modal eliminando el ultimo hijo del container, es decir el mismo modal
  const closeModalButton = modalContainer.querySelector(".close-button");
  closeModalButton.addEventListener("click", () => {
    cardContainer.removeChild(cardContainer.lastElementChild);
    document.body.style.overflow = "";
    // cuando le das favoritos desde el modal se asigna la clase del boton de la card para que quede igual
    const cardFavoriteButton = card.querySelector(".favorite-button");
    cardFavoriteButton.className = favoriteButton.className;
  });

  // carrousel
  const containerEl = modalContainer.querySelector(".carrousel");

  const prevButton = modalContainer.querySelector(".prev-button");
  prevButton.addEventListener("click", () => moveCarrousel("prev"));
  const nextButton = modalContainer.querySelector(".next-button");
  nextButton.addEventListener("click", () => moveCarrousel("next"));

  function moveCarrousel(direction) {
    // obtiene todas las imagenes
    const images = containerEl.querySelectorAll(".carrousel-image");

    console.log(images);

    // comprobaciones
    if (images.length === 0) {
      return;
    }
    // compruebo con 2 porque siempre traen 2 imagenes iguales
    if (images.length === 1 || images.length === 2) {
      images[0].classList.remove("next", "last");
      images[0].classList.add("active");
      return;
    }

    const activeEl = containerEl.querySelector(".active");
    const nextEl = containerEl.querySelector(".next");
    const lastEl = containerEl.querySelector(".last");

    // elimina las clases de todas las imagenes
    images.forEach((image) => {
      image.classList.remove("active", "next", "last");
    });

    // declaro las nuevas variables para las posiciones
    let newActive, newNext, newLast;

    // asigno las variables según la posición
    if (direction === "next") {
      newActive = nextEl;
      newNext = nextEl.nextElementSibling || images[0]; // si no hay siguiente, ir al inicio
      newLast = activeEl;
    } else {
      newActive = lastEl;
      newLast = lastEl.previousElementSibling || images[images.length - 1]; // si no hay anterior, ir al final
      newNext = activeEl;
    }

    // agrego las clases
    newActive.classList.add("active");
    newNext.classList.add("next");
    newLast.classList.add("last");
  }

  // agrego el modal al contenedor
  cardContainer.appendChild(modalContainer);
}
