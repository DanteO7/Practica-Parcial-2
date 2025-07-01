export function createCarrousel(images) {
  return `
    ${images
      .map((image) => `<img class="carrousel-image" src="${image.image}">`)
      .join("")}
    <div class="button-container">
      <button class="prev-button"><</button>
      <button class="next-button">></button>
    </div>
  `;

  const nextButton = document.createElement("button");
  nextButton.classList.add("carrousel-button");

  const prevButton = document.createElement("button");
  prevButton.classList.add("carrousel-button");

  nextButton.addEventListener("click", () => startCarrousel("next"));
  prevButton.addEventListener("click", () => startCarrousel("prev"));
}

function generateImage(image) {
  return `<img src="${image}">`;
}
