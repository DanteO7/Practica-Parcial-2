import { createMain } from "./create-main";

// inicializa el buscador recibiendo el header y el main
export function initSearchInput(header, main) {
  const url =
    "https://api.rawg.io/api/games?key=d9dc2c3b718b44eca778d7aab8b1fbd9";

  // trae el search del header
  const searchInputEl = header.querySelector("#search-input");

  // cuando el usuario presiona Enter busca juegos con ese nombre y llama a createMain para crearlo nuevamente con nueva data
  searchInputEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInputEl.value.trim().toLowerCase();
      try {
        const urlToSearchByName = `${url}&search_precise=true&search=${query}`;
        main.innerHTML = "";
        createMain(main, urlToSearchByName);
        searchInputEl.value = "";
      } catch (error) {
        console.error(error);
      }
    }
  });
}
