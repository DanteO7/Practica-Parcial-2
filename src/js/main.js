import "./../css/index.css";
import { createFavorite } from "./create-favorite";
import { createIndex } from "./create-index";

if (location.pathname === "/" || location.pathname.includes("index.html")) {
  createIndex();
} else if (location.pathname.includes("favorites.html")) {
  createFavorite();
}
