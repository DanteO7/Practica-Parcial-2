export function createHeader(header) {
  header.innerHTML = `
    <div class="logo-container">
          <a href="./../../index.html"><img src="/assets/liev.png" alt="Logo de Liev" /></a>
        </div>
        <div class="input-container">
          <input type="search" id="search-input" />
        </div>
        <div class="favorites-container">
          <a href="./../../favorites.html"><img src="/assets/favoritos.png" alt="Imagen de favoritos" /></a>
        </div>
  `;
}
