import { createCard } from "./create-card";

export function createMainFavorite(main) {
  const cardContainer = document.createElement("section");
  cardContainer.classList.add("cards-container");

  function getLocalStorage() {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      data.push(JSON.parse(value));
    }
    return data;
  }

  createCard(getLocalStorage(), cardContainer);

  main.appendChild(cardContainer);
}
