import { createHeader } from "./create-header";
import { createMain } from "./create-main";
import { createFooter } from "./create-footer";
import { initSearchInput } from "./init-search-input";

// crea los contenedores principales y los agrega a #app

export function createIndex() {
  const app = document.querySelector("#app");

  const header = document.createElement("header");
  createHeader(header);

  const main = document.createElement("main");
  createMain(main);
  initSearchInput(header, main);

  const footer = document.createElement("footer");
  createFooter(footer);

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);
}
