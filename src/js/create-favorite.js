import { createHeader } from "./create-header";
import { createFooter } from "./create-footer";
import { createMainFavorite } from "./create-main-favorite";
import { initSearchInput } from "./init-search-input";

// crea los contenedores principales y los agrega a la #app

export function createFavorite() {
  const app = document.querySelector("#app");

  const header = document.createElement("header");
  createHeader(header);

  const main = document.createElement("main");
  // usa otro js para crear el main de favoritos
  createMainFavorite(main);
  initSearchInput(header, main);

  const footer = document.createElement("footer");
  createFooter(footer);

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);
}
