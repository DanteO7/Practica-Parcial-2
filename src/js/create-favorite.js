import { createHeader } from "./create-header";
import { createFooter } from "./create-footer";
import { createMainFavorite } from "./create-main-favorite";
import { updateMain } from "./update-main";

export function createFavorite() {
  const app = document.querySelector("#app");

  const header = document.createElement("header");
  createHeader(header);

  const main = document.createElement("main");
  createMainFavorite(main);
  updateMain(header, main);

  const footer = document.createElement("footer");
  createFooter(footer);

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);
}
