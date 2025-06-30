import { createHeader } from "./create-header";
import { createFooter } from "./create-footer";

export function createFavorite() {
  const app = document.querySelector("#app");

  const header = document.createElement("header");
  createHeader(header);

  const footer = document.createElement("footer");
  createFooter(footer);

  app.appendChild(header);
  app.appendChild(footer);
}
