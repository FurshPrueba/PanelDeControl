'use strict'
$(document).ready(function(){
    var ubicacionMenu;
    function agregarMenu (numMenus){
        var div = `
        <div class="menu ${numMenus}">
            <a href="productos.html"><button class="nombreMenu ${numMenus}">menu ${numMenus}</button></a><button class="editar">Editar</button>
            <div class="cambiarN helado">
                <form action="" method="post" onsubmit="return false;" class="formNombre">
                    <label for="nombre">Nombre</label><br>
                    <input type="text" name="nombre" class="nombre"><br>
                    <p class="error"></p>
                    <input type="submit" value="Guardar">
                </form>
            </div>
        </div>
        `
        $('#menus').append(div);
    }
    

    //AGREGAR NUEVO MENU
    $(document).on("click", '#Agregar', function(){
        var cantidad_menus = ($('#menus').find('.menu').length) + 1;

        agregarMenu(cantidad_menus);
    });

    //CAMBIAR NOMBRE DEL MENU AGREGADO
    $(document).on("click", '.editar', function(){
        //Si esta abierto otra entonces que se sierre la anterior
        ubicacionMenu = $(this).parent().find('.cambiarN');
        var botonAñadir = $(this); 
        var formNombre = $(".cambiarN");

        formNombre.each(function() {
            var displayValue = $(this).css('display');
            if(displayValue == 'block'){
                $(this).css("display", "none");
                $(this).parent().find('.editar').css("display", "block");
            }
        });

        botonAñadir.css("display", "none");
        $(ubicacionMenu).css("display", "block");//visivilisar el nombre al hacer click en salir
        $('#salir').css('display', 'block');//para que se vea boton de salida 
    });
    $(document).on("submit", '.formNombre', function(){
        var nombre = $(this).find('.nombre').val();

        if(nombre != ""){
            ubicacionMenu = $(this).parent().parent();

            ubicacionMenu.find('.nombreMenu').attr("class", `nombreMenu ${nombre}`);
            ubicacionMenu.find('.nombreMenu').text(nombre);
            ubicacionMenu.attr("class", `menu ${nombre}`)
        }else{
            $(this).find(".error").append("No se lleno la casilla");
            setTimeout(()=>{
                $(this).find(".error").text("");
            }, 3000);
        }
    });

    $(document).on('click', '#salir', function(){
        var formNombre = $(".cambiarN");

        formNombre.each(function() {
                var displayValue = $(this).css('display');
                if(displayValue == 'block'){
                    $(this).css("display", "none");
                }
            }
        );

        
    });
});
