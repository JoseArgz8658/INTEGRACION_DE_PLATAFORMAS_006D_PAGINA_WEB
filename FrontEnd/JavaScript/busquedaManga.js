// Obtener el formulario y el campo de búsqueda
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// URL del archivo JSON
const url = "https://raw.githubusercontent.com/JoseArgz8658/INTEGRACION_DE_PLATAFORMAS_006D_PAGINA_WEB/main/FrontEnd/Json/Mangas.json";

// Evento para manejar la búsqueda
searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe y recargue la página
  
  // Obtener el término de búsqueda
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Verificar que se haya ingresado un término
  if (searchTerm !== "") {
    // Llamada al JSON
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const results = searchMangas(data, searchTerm);
        displayResults(results);
      })
      .catch(error => console.log("Error al cargar el archivo JSON:", error));
  }
});

// Función para buscar mangas en el JSON
function searchMangas(mangas, searchTerm) {
  return mangas.filter(manga => 
    manga.titulo.toLowerCase().includes(searchTerm) || 
    manga.descripcion.toLowerCase().includes(searchTerm)
  );
}

// Función para mostrar los resultados de la búsqueda
function displayResults(results) {
  const resultContainer = document.getElementById("resultContainer");
  
  // Limpiar resultados anteriores
  resultContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach(manga => {
      const resultElement = document.createElement("div");
      resultElement.classList.add("result-item");
      
      resultElement.innerHTML = `
        <h3>${manga.titulo}</h3>
        <p>${manga.descripcion}</p>
        <img src="${manga.image_manga}" alt="${manga.titulo}" class="img-fluid">
      `;

      resultContainer.appendChild(resultElement);
    });
  } else {
    resultContainer.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}