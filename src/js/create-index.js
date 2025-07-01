import { createHeader } from "./create-header";
import { createMain } from "./create-main";
import { createFooter } from "./create-footer";
import { updateMain } from "./update-main";

export function createIndex() {
  const app = document.querySelector("#app");

  const header = document.createElement("header");
  createHeader(header);

  const main = document.createElement("main");
  createMain(main);
  updateMain(header, main);

  const footer = document.createElement("footer");
  createFooter(footer);

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);
}
