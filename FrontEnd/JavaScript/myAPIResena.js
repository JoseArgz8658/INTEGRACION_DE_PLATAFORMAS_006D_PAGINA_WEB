$(document).ready(function () {
    function cargarOpcionesManga() {
        $.ajax({
            url: 'http://localhost:8000/BiblioMania/manga/',
            type: 'GET',
            success: function (response) {
                var options = '';
                $.each(response, function (key, value) {
                    options += '<option value="' + value.id + '">' + value.title + '</option>';
                });
                $('#manga').html(options);
            },
            error: function (error) {
                console.log('Error al cargar opciones de manga:', error);
                alert('Error al cargar opciones de manga');
            }
        });
    }

    function cargarResenas() {
        $.ajax({
            url: 'http://localhost:8000/BiblioMania/resena/',
            type: 'GET',
            success: function (response) {
                var rows = '';
                $.each(response, function (key, value) {
                    rows += '<tr>';
                    rows += '<td>' + value.manga.title + '</td>';
                    rows += '<td>' + value.rating + ' estrella(s)</td>';
                    rows += '<td>' + value.comment + '</td>';
                    rows += '<td>' + value.review_date + '</td>';
                    rows += '</tr>';
                });
                $('#resenaTableBody').html(rows);
            },
            error: function (error) {
                console.log('Error al cargar reseñas:', error);
                alert('Error al cargar reseñas');
            }
        });
    }

    cargarOpcionesManga();
    cargarResenas();

    $("#resenaForm").validate({
        submitHandler: function (form) {
            var data = {
                manga: $("#manga").val(),
                rating: $("#rating").val(),
                comment: $("#comment").val()
            };
            $.ajax({
                url: 'http://localhost:8000/BiblioMania/resena/',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Reseña guardada correctamente');
                    form.reset();
                    cargarResenas();  // Recargar las reseñas después de guardar una nueva
                },
                error: function (error) {
                    console.log('Error al guardar reseña:', error);
                    alert('Error al guardar reseña');
                }
            });
        }
    });
});