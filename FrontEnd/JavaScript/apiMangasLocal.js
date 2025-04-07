const url = "https://raw.githubusercontent.com/JoseArgz8658/INTEGRACION_DE_PLATAFORMAS_006D_PAGINA_WEB/main/FrontEnd/Json/Mangas.json";

function crearTarjetaManga(manga) {
  return $(`
    <div class="col-md-4">
      <div class="card h-100">
        <img class="card-img-top" src="${manga.image_logo}" alt="${manga.titulo}">
        <div class="card-body">
          <h5 class="card-title">${manga.titulo}</h5>
          <p class="card-text">Estado: ${manga.estado}</p>
          <p class="card-text">Fecha de publicación: ${manga.fecha_publicacion}</p>
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
        if (manga.titulo !== "") { // Evitar mangas vacíos
          const tarjeta = crearTarjetaManga(manga);
          container.append(tarjeta);
        }
      });
    })
    .catch(err => {
      console.error('Error al cargar los mangas:', err);
    });
});