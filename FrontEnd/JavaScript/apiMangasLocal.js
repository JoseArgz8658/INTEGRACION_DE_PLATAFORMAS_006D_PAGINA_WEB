let nextUrl = "https://raw.githubusercontent.com/JoseArgz8658/INTEGRACION_DE_PLATAFORMAS_006D_PAGINA_WEB/main/FrontEnd/Json/Mangas.json";

function fetchData(url, container, templateFunction) {
    $('#loading').show();
    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            $('#loading').hide();
            response.forEach(item => {
                if (item.titulo && item.descripcion) {
                    container.append(templateFunction(item));
                }
            });
        },
        error: function() {
            $('#loading').hide();
            alert('No se pudo obtener datos');
        }
    });
}

function mangaTemplate(manga) {
    return $(`<div class="col-md-4 mb-4">
        <div class="card h-100">
            <img class="card-img-top" src="${manga.image_manga}" alt="${manga.titulo}">
            <div class="card-body">
                <h5 class="card-title">${manga.titulo}</h5>
                <p class="card-text">${manga.descripcion}</p>
                <p class="card-text"><strong>Estado:</strong> ${manga.estado}</p>
                <p class="card-text"><strong>Fecha de publicación:</strong> ${manga.fecha_publicacion}</p>
            </div>
        </div>
    </div>`);
}

$(document).ready(function() {
    fetchData(nextUrl, $('#mangas'), mangaTemplate);
});