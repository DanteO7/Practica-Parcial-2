import { createCard } from "./create-card";

// crea el main de favoritos recibiendo el contenedor
export function createMainFavorite(main) {
  // se crea el titulo
  const titleContainer = document.createElement("section");
  titleContainer.classList.add("title-container");
  titleContainer.innerHTML = `
    <h2>Tus juegos favoritos</h2>
  `;

  const cardContainer = document.createElement("section");
  cardContainer.classList.add("cards-container");

  // recorre el local storage para buscar los juegos que el usuario marcó como favoritos y los guarda el value en un array
  const data = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data.push(JSON.parse(value));
  }

  if (data.length === 0) {
    console.log(data);
    cardContainer.innerHTML = `<h3>No tienes juegos favoritos</h3>`;
  } else {
    createCard(data, cardContainer);
  }
  // crea las cards según los juegos que encontró en el local storage

  // agrega los elementos al main
  main.appendChild(titleContainer);
  main.appendChild(cardContainer);
}
