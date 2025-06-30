import { createMain } from "./create-main";

export function updateMain(header, main) {
  const url =
    "https://api.rawg.io/api/games?key=d9dc2c3b718b44eca778d7aab8b1fbd9";

  const searchInputEl = header.querySelector("#search-input");

  searchInputEl.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInputEl.value.trim().toLowerCase();
      try {
        const urlToSearchByName = `${url}&search_precise=true&search=${query}`;
        main.innerHTML = "";
        createMain(main, urlToSearchByName);
      } catch (error) {
        console.error(error);
      }
    }
  });
}
