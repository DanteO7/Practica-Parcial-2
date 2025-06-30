import { createCard } from "./create-card";

export function createMain(
  main,
  url = "https://api.rawg.io/api/games?key=d9dc2c3b718b44eca778d7aab8b1fbd9"
) {
  const cardsContainer = document.createElement("section");
  cardsContainer.classList.add("cards-container");

  async function fetchGames(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      createCard(data.results, cardsContainer);
      console.log(data.results[0].short_screenshots[0].image);
      updatePagination(data.previous, data.next);
    } catch (err) {
      console.error(err);
    }
  }

  const buttonContainer = document.createElement("section");
  buttonContainer.classList.add("pagination-container");

  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.className = "details-button";
  const nextButton = document.createElement("button");
  nextButton.innerText = "Siguiente";
  nextButton.className = "details-button";

  function updatePagination(previous, next) {
    prevButton.onclick = () => fetchGames(previous);
    nextButton.onclick = () => fetchGames(next);
  }

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);

  prevButton.addEventListener("click", () => {
    console.log("a");
  });

  fetchGames(url);
  main.appendChild(cardsContainer);
  main.appendChild(buttonContainer);
}
