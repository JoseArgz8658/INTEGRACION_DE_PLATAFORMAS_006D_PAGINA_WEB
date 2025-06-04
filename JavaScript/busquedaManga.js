document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultContainer = document.getElementById('resultContainer');
  const url = "https://raw.githubusercontent.com/JoseArgz8658/INTEGRACION_DE_PLATAFORMAS_006D_PAGINA_WEB/main/Json/Mangas.json";

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const query = input.value.toLowerCase().trim();
    resultContainer.innerHTML = ''; // Limpia resultados anteriores

    if (!query) {
      resultContainer.innerHTML = '<p class="text-danger">Por favor, escribe algo para buscar.</p>';
      return;
    }

    try {
      const res = await fetch(url);
      const mangas = await res.json();

      const resultados = mangas.filter(manga =>
        manga.titulo.toLowerCase().includes(query)
      );

      if (resultados.length === 0) {
        resultContainer.innerHTML = '<p class="text-warning">No se encontraron mangas con ese título.</p>';
      } else {
        const fragment = document.createDocumentFragment();
        resultados.forEach(manga => {
          const resultHTML = document.createElement('div');
          resultHTML.classList.add('list-group');
          resultHTML.innerHTML = `
            <a href="/HTML/tomos.html?manga=${encodeURIComponent(manga.titulo)}" class="list-group-item list-group-item-action">${manga.titulo}</a>
          `;
          fragment.appendChild(resultHTML);
        });
        resultContainer.appendChild(fragment);
      }
    } catch (error) {
      console.error("Error al cargar los mangas:", error);
      resultContainer.innerHTML = '<p class="text-danger">Error al obtener los mangas. Intenta más tarde.</p>';
    }
  });

  function generarNombreArchivo(titulo) {
    return titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '') + "tomos.html";
  }

  // Cerrar el contenedor de resultados cuando se haga clic fuera de él
  document.addEventListener('click', (e) => {
    if (!resultContainer.contains(e.target) && e.target !== input) {
      resultContainer.innerHTML = ''; // Limpiar resultados si se hace clic fuera
    }
  });
});