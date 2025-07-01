import { createCard } from "./create-card";
import { orderMain } from "./order-main";

const currentUrl =
  "https://api.rawg.io/api/games?key=d9dc2c3b718b44eca778d7aab8b1fbd9";

export function createMain(
  main,
  url = "https://api.rawg.io/api/games?key=d9dc2c3b718b44eca778d7aab8b1fbd9"
) {
  const orderingContainer = document.createElement("section");
  orderingContainer.classList.add("ordering-container");

  orderingContainer.innerHTML = `
    <h2>Ordenar por</h2>
    <select name="ordering" class="ordering-field">
      <option class="ordering-field" value="">Seleccione un orden</option>
      <option class="ordering-field" value="metacritic">Metacritic</option>
      <option class="ordering-field" value="name">Name</option>
      <option class="ordering-field" value="updated">Updated</option>
      <option class="ordering-field" value="added">Added</option>
      </select>
      <button class="ordering-button">Aplicar</button>`;

  const orderingButton = orderingContainer.querySelector(".ordering-button");
  const orderingSelected = orderingContainer.querySelector(".ordering-field");
  orderingButton.addEventListener("click", () => {
    orderMain(main, `${currentUrl}&ordering=-${orderingSelected.value}`);
  });

  const cardsContainer = document.createElement("section");
  cardsContainer.classList.add("cards-container");

  async function fetchGames(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      createCard(data.results, cardsContainer);
      updatePagination(data.previous, data.next);
    } catch (err) {
      console.error(err);
    }
  }

  const buttonContainer = document.createElement("section");
  buttonContainer.classList.add("pagination-container");

  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.className = "details-button";
  const nextButton = document.createElement("button");
  nextButton.innerText = "Siguiente";
  nextButton.className = "details-button";

  function updatePagination(previous, next) {
    prevButton.onclick = () => fetchGames(previous);
    nextButton.onclick = () => fetchGames(next);
  }

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);

  prevButton.addEventListener("click", () => {
    console.log("a");
  });

  fetchGames(url);
  main.appendChild(orderingContainer);
  main.appendChild(cardsContainer);
  main.appendChild(buttonContainer);
}
