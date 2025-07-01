import { createMain } from "./create-main";

export function orderMain(main, url) {
  main.innerHTML = "";
  createMain(main, url);
}
