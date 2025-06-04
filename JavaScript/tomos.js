const url = "https://raw.githubusercontent.com/JoseArgz8658/INTEGRACION_DE_PLATAFORMAS_006D_PAGINA_WEB/main/FrontEnd/Json/Mangas.json";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const titulo = params.get("manga");

  if (!titulo) {
    document.getElementById("info-manga").innerHTML = "<div class='alert alert-danger'>No se proporcionó ningún manga.</div>";
    return;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const manga = data.find(m => m.titulo === titulo);
      if (!manga) {
        document.getElementById("info-manga").innerHTML = `<div class="alert alert-warning">No se encontró el manga: ${titulo}</div>`;
        return;
      }

      const contenido = `
        <div class="card mb-4">
          <div class="row g-0">
            <div class="col-md-4 text-center p-3">
              <img src="${manga.image_manga}" class="img-fluid mt-3" alt="${manga.titulo}">
              <img src="${manga.image_logo}" class="img-fluid rounded-start" alt="Logo de ${manga.titulo}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">${manga.titulo}</h2>
                <p class="card-text"><strong>Estado:</strong> ${manga.estado}</p>
                <p class="card-text"><strong>Fecha de publicación:</strong> ${manga.fecha_publicacion}</p>
                <hr>
                <h4>Descripción</h4>
                <p>${manga.descripcion}</p>
                <h4>Introducción</h4>
                <p>${manga.introduccion.replace(/\n/g, "<br>")}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("info-manga").innerHTML = contenido;
    })
    .catch(err => {
      console.error("Error al cargar el manga:", err);
      document.getElementById("info-manga").innerHTML = "<div class='alert alert-danger'>Error al cargar el manga.</div>";
    });
});