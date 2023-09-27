'use strick'
    
//Mostrar ventana emergente al hacer click en cualquier funcion de las que tiene Info

var ventanaAbierta = null;

function ventanaModal(selectorbutonOpen, tituloPagina, contPaginaForm, ventanaClass, width) {
    var div = `
        <div class="modal ventana_${ventanaClass}" id="${ventanaClass}" title="${tituloPagina}" style="display: none;">
        <form>
            ${contPaginaForm}
        </form>
        </div>
    `;
    $('#ventanas_emergentes').append(div);

    var ventanaActual = $(`#${ventanaClass}`);

    ventanaActual.dialog({
        autoOpen: false,
        width: width,
        position: { my: "left top", at: "left bottom", of: selectorbutonOpen },
        draggable: false,
        show: { effect: "fade", duration: 300 },
        hide: { effect: "fade", duration: 300 },
        buttons: {
            "Guardar": function () {
                // Agrega aquí la lógica para guardar los datos del formulario si es necesario
                ventanaActual.dialog("close");
            },
            "Cerrar": function () {
                ventanaActual.dialog("close");
            },
        },
        close: function () {
            ventanaActual.dialog("destroy");
            ventanaActual.remove();
        },
    });
}

function mostrarVentana(claseAplicada, anunciado, width) {
    if (ventanaAbierta) {
        ventanaAbierta.dialog("close");
    }

    var nuevaVentanaClass = `ventana-${claseAplicada}`;
    $(document).on("click", `.input.${claseAplicada}`, function () {
        let that = $(this);
        ventanaAbierta = $(`#${nuevaVentanaClass}`);
        if (!ventanaAbierta.dialog("instance")) {
            ventanaModal(that, `${anunciado}`, `
            <form action="">
                <label for="texto">${anunciado}</label><br>
                <input type="text" id="texto" name="texto">
            </form>
            `, nuevaVentanaClass, 300);
        }
        ventanaAbierta.dialog("open");
    });
}

function buscar(claseAplicada, anunciado){
    if (ventanaAbierta) {
        ventanaAbierta.dialog("close");
    }
    var nuevaVentanaClass = `ventana-${claseAplicada}`;

    $(document).on("click", `#${claseAplicada}`, function () {
        
        let that = $(this);
        ventanaModal(that, `#${anunciado}`, `
        <form action="">
            <label for="texto">${anunciado}</label><br>
            <input type="text" id="texto" name="texto">
        </form>
        `, nuevaVentanaClass, 200);
    });
}
