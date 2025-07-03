import { createCard } from "./create-card";

// url que se ve al iniciar la página
const currentUrl =
  "https://api.rawg.io/api/games?key=d9dc2c3b718b44eca778d7aab8b1fbd9";

// crea el main del index recibiendo el contenedor y una url, se inicializa con la que queres que aparezca al inicio
export function createMain(main, url = currentUrl, filter = "", ordering = "") {
  main.innerHTML = "";
  // crea la sección de los filtros y agrega el html
  const filtersContainer = document.createElement("section");
  filtersContainer.classList.add("filters-container");
  filtersContainer.innerHTML = `
  <h2>Filtrar género</h2>
    <select name="filter" class="primary-button filter-field">
      <option class="primary-button filter-field" value="">Seleccione un género</option>
      <option class="primary-button filter-field" value="action">Action</option>
      <option class="primary-button filter-field" value="adventure">Adventure</option>
      <option class="primary-button filter-field" value="arcade">Arcade</option>
      <option class="primary-button filter-field" value="board-games">Board Games</option>
      <option class="primary-button filter-field" value="card">Card</option>
      <option class="primary-button filter-field" value="casual">Casual</option>
      <option class="primary-button filter-field" value="educational">Educational</option>
      <option class="primary-button filter-field" value="family">Family</option>
      <option class="primary-button filter-field" value="fighting">Fighting</option>
      <option class="primary-button filter-field" value="indie">Indie</option>
      <option class="primary-button filter-field" value="massively-multiplayer">Massively Multiplayer</option>
      <option class="primary-button filter-field" value="platformer">Platformer</option>
      <option class="primary-button filter-field" value="puzzle">Puzzle</option>
      <option class="primary-button filter-field" value="racing">Racing</option>
      <option class="primary-button filter-field" value="5">RPG</option>
      <option class="primary-button filter-field" value="shooter">Shooter</option>
      <option class="primary-button filter-field" value="simulation">Simulation</option>
      <option class="primary-button filter-field" value="sports">Sports</option>
      <option class="primary-button filter-field" value="strategy">Strategy</option>
    </select>
  <h2>Ordenar por</h2>
    <select name="ordering" class="primary-button ordering-field">
      <option class="primary-button ordering-field" value="">Seleccione un orden</option>
      <option class="primary-button ordering-field" value="metacritic">Metacritic</option>
      <option class="primary-button ordering-field" value="name">Nombre</option>
      <option class="primary-button ordering-field" value="updated">Última actualización</option>
      <option class="primary-button ordering-field" value="added">Agregado</option>
    </select>
    <button class="primary-button filters-button">Aplicar</button>
    ${filter === "" ? "" : `<h3>Género: ${filter}</h3>`}
    ${ordering === "" ? "" : `<h3>Orden: ${ordering}</h3>`}
  `;
  // el boton crea el main nuevamente con los filtros en la url y la data del filtrado
  const orderingSelected = filtersContainer.querySelector(".ordering-field");
  const filterSelected = filtersContainer.querySelector(".filter-field");
  const filterButton = filtersContainer.querySelector(".filters-button");
  filterButton.addEventListener("click", () => {
    console.log(filterSelected.value);

    createMain(
      main,
      `${currentUrl}&ordering=-${orderingSelected.value}${
        filterSelected.value ? `&genres=${filterSelected.value}` : ""
      }`,
      filterSelected.value,
      orderingSelected.value
    );
  });

  const cardsContainer = document.createElement("section");
  cardsContainer.classList.add("cards-container");

  // carga los datos desde la API
  async function fetchGames(url) {
    cardsContainer.innerHTML = `<div class="loader"></div>`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      // si no trae resultados devuelve un texto y un error
      if (data.results.length === 0) {
        cardsContainer.removeChild(cardsContainer.firstElementChild);
        const error = document.createElement("h3");
        error.innerText = "No se ha econtrado juegos con ese parámtro";
        cardsContainer.appendChild(error);
        throw new Error("No se ha econtrado juegos con ese parámtro");
      }

      // si hay resultados crea las cards, actualiza los botones de paginación y vuelve la ventana hacia arriba
      createCard(data.results, cardsContainer);
      main.appendChild(buttonContainer);
      updatePagination(data.previous, data.next);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
    }
  }
  // crea el contenedor y los botones
  const buttonContainer = document.createElement("section");
  buttonContainer.classList.add("pagination-container");

  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.className = "primary-button details-button";
  const nextButton = document.createElement("button");
  nextButton.innerText = "Siguiente";
  nextButton.className = "primary-button details-button";

  // actualiza las url de los botones
  function updatePagination(previous, next) {
    prevButton.onclick = () => (previous === null ? "" : fetchGames(previous));
    nextButton.onclick = () => fetchGames(next);
  }

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);

  // se cargan los datos de la API y se agregan los elementos al main
  fetchGames(url);
  main.appendChild(filtersContainer);
  main.appendChild(cardsContainer);
}
