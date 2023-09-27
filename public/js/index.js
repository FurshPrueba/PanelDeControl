'Use strict'

$(document).ready(function(){
    //Hacer aparecer las opciones para acceder a menus
    $('#botonAcceder').click(function(){
        $(this).css("display", "none");
        $("#Acceder").css("display", "block");
    });

    //Envio del formulario para acceder a los menus de cada usuario
    $('#formAcceder').submit(function(){
        var camposVacios = false;

        $(this).find('.inputs').each(function(){
            if ($(this).val() == ''){
                camposVacios = true;                    
                return false;
                console.log($(this).val());
            }
        });

        if(camposVacios){
            var anunciadoError = "No se puede enviar si no llenas todos los campos";
            $('#error').text(anunciadoError);
            setTimeout(()=>{
                $('#error').text("");
            }, 3000);
        }else{
            $.ajax({
                type: "POST",  // Método HTTP (puede ser GET, POST, etc.)
                url: "http://paneldecontrol://:4000/procesar", // Reemplaza con la URL de tu servidor
                data: contenidoForm, // Datos del formulario
                processData: false,
                contentType: false,
                success: function(response) {
                    // Maneja la respuesta del servidor
                    alert("Datos enviados con éxito. Respuesta del servidor: " + response);
                },
                error: function(error) {
                    // Maneja errores en la solicitud (Es muchisimo mas comun de lo que te imaginas)
                    alert("Error al enviar datos: " + error.statusText);
                }
            });
        }
    });
});