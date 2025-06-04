const url = "https://raw.githubusercontent.com/JoseArgz8658/INTEGRACION_DE_PLATAFORMAS_006D_PAGINA_WEB/main/Json/Mangas.json";

function generarNombreArchivo(titulo) {
  return titulo
    .normalize("NFD")               // Quitar acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '')           // Quitar espacios
    .replace(/[^a-zA-Z0-9]/g, '')  // Quitar caracteres especiales
    + "tomos.html";
}

function crearTarjetaManga(manga) {
  const archivoTomos = generarNombreArchivo(manga.titulo);
  return $(`
    <div class="col-md-4">
      <div class="card h-100">
        <img class="card-img-top" src="${manga.image_manga}" alt="${manga.titulo}">
        <div class="card-body">
          <h5 class="card-title">${manga.titulo}</h5>
          <p class="card-text">Estado: ${manga.estado}</p>
          <p class="card-text">Fecha de publicación: ${manga.fecha_publicacion}</p>
          <a href="/HTML/tomos.html?manga=${encodeURIComponent(manga.titulo)}" class="btn btn-primary">Ir a los Tomos</a>
        </div>
      </div>
    </div>
  `);
}

$(document).ready(function () {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = $('#mangas-container');
      data.forEach(manga => {
        if (manga.titulo !== "") { // Evita mangas vacíos
          const tarjeta = crearTarjetaManga(manga);
          container.append(tarjeta);
        }
      });
    })
    .catch(err => {
      console.error('Error al cargar los mangas:', err);
    });
});