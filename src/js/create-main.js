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
    <select name="ordering" class="primary-button ordering-field">
      <option class="primary-button ordering-field" value="">Seleccione un orden</option>
      <option class="primary-button ordering-field" value="metacritic">Metacritic</option>
      <option class="primary-button ordering-field" value="name">Nombre</option>
      <option class="primary-button ordering-field" value="updated">Última actualización</option>
      <option class="primary-button ordering-field" value="added">Agregado</option>
      </select>
      <button class="primary-button ordering-button">Aplicar</button>`;

  const orderingButton = orderingContainer.querySelector(".ordering-button");
  const orderingSelected = orderingContainer.querySelector(".ordering-field");
  orderingButton.addEventListener("click", () => {
    orderMain(main, `${currentUrl}&ordering=-${orderingSelected.value}`);
  });

  const cardsContainer = document.createElement("section");
  cardsContainer.classList.add("cards-container");

  async function fetchGames(url) {
    cardsContainer.innerHTML = `<div class="loader"></div>`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length === 0) {
        cardsContainer.removeChild(cardsContainer.firstElementChild);
        const p = document.createElement("p");
        p.innerText = "No se ha econtrado juegos con ese nombre";
        cardsContainer.appendChild(p);
        if (data.results.length === 0) {
          throw new Error("No se ha econtrado juegos con ese nombre");
        }
      }

      createCard(data.results, cardsContainer);
      updatePagination(data.previous, data.next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
    }
  }

  const buttonContainer = document.createElement("section");
  buttonContainer.classList.add("pagination-container");

  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.className = "primary-button details-button";
  const nextButton = document.createElement("button");
  nextButton.innerText = "Siguiente";
  nextButton.className = "primary-button details-button";

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
