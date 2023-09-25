'Use strict'

$(document).ready(function(){
    var numProducto = 1;
    var formularioProducto = $('.formularioProducto');

    //Agregar Nuevo Productos

    function agregarProducto(numProducto){
        var producto_nuevo = `
        <div>
            <form action="http://localhost:3000/procesar" method="post" class="formularioProducto">
                <div class="seleccionProducto">
                    <button type="button" class="div_Producto">Producto</button>
                    <div class="info" style="display: none;">
                        <button type="button" class="boton nombre">Nombre</button>
                        <button type="button" class="boton descripcion">Descripcion</button>
                        <button type="button" class="boton imagen">imagen</button>
                        <button type="button" class="boton precio">Precio</button>
                        <button type="button" class="boton borrar">borrar</button>
                    
                        <button class="boton guardar">Guardar</button>
                    </div>
                </div>
                <!--Contenedor de los formularios-->
                <div class="contenedor_respuesta">
                    <div class="form opciones formNombre">
                        <label for="Nombre">Nombre</label><br>
                        <input type="text" name="Nombre" class="opcion nombre"><br>
    
                        <button type="button" class="cancelarOpcion">Cancelar</button>
                        <button type="button" class="aceptarOpcion">Aceptar</button><br>
                    </div>                
                    <div class="form opciones formPrecio">
                        <label for="precio">Precio</label><br>
                        <input type="number" name="precio" class="opcion precio"><br>

                        <button type="button" class="cancelarOpcion">Cancelar</button>
                        <button type="button" class="aceptarOpcion">Aceptar</button><br>
                    </div>                                        
                    <div class="form opciones formDescripcion">
                        <label for="Descripcion">Descripcion</label><br>
                        <input type="text" name="Descripcion" class="opcion Descripcion"><br>
    
                        <button type="button" class="cancelarOpcion">Cancelar</button>
                        <button type="button" class="aceptarOpcion">Aceptar</button><br>
                    </div>

                    <div class="form opciones formImagen">
                        <label for="Imagen">Imagen</label><br>
                        <input type="file" name="Imagen" class="opcion Imagen" accept="image/*" value="Ver galeria"><br>
    
                        <div class="image">
                            <img src="" alt="imagen del producto" srcset="" class="lugarImage">
                        </div>
                        <button type="button" class="cancelarOpcion">Cancelar</button>
                        <button type="button" class="aceptarOpcion">Aceptar</button><br>
                    </div>
                    <div class="form formBorrar">
                        <h2>¿Seguro que quieres borrar el producto?</h2>
                        <button type="button" class="cancelarOpcion">Cancelar</button>
                        <button type="button" class="aceptarOpcion">Borrar</button><br>
                    </div>
                </div>
            </form>
        </div>
        `;
        var selector = $("#tablaAgregable");
        selector.append(producto_nuevo);
        return producto_nuevo;
    }
    

    //AGREGAR EL NUEVO PRODUCTO USANDO LA FUNCION

    $('#agregar').on("click", function(){
        numProducto++
        agregarProducto(numProducto);
    });

    //Cuando se oprima el boton de editar se despliegen las opciones hay mismo en la fila
    
    $(document).on("click", '.div_Producto', function(){
        var caracteristicasInfo = $(this).parent().find('.info');
        var nombreProducto = $(this); 
        var info = $(".info");

        info.each(function() {
            var displayValue = $(this).css('display');
            if(displayValue == 'block'){
                $(this).css("display", "none");
                $(this).parent().find(".div_Producto").css("display", "block");//visivilisar el nombre al hacer click en salir
            }
        });

       
        $(caracteristicasInfo).css("display", "block");//visivilisar el nombre al hacer click en salir
        $(nombreProducto).css("display", "none");
        $('#salir').css('display', 'block');//para que se vea boton de salida 
    });

    
    //Salir del producto (OPCIONES)

    $(document).on("click", '#salir', function(){
        $('.info').each(function() { //se realiza una iteracion para encontrar las opciones de productos vicibles ()
            var displayValue = $(this).css('display');
            if(displayValue == 'block'){
                var selector = $(this).parent();

                selector.find('.info').css("display", "none");//visivilisar el nombre al hacer click en salir
                selector.find('.div_Producto').css("display", "block");
                $('#salir').css('display', 'none');//para que se vea boton de salida 
            }
        });
    }); 

    //SEleccion de una opcion de cada producto

    $(document).on("click", '.boton', function(){
        
        var that = $(this); // el boton oprimido
        var claseDeBoton = that.attr("class"); // la clase del boton oprimido
        var ubicacion_producto = that.parent().parent().parent().parent();//la ubicacion del producto seleccionado
        var contenedor = ubicacion_producto.find('.contenedor_respuesta');//Contenedor de los formularios de respuesta

        if(claseDeBoton == 'boton nombre'){
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');//hacer invisible el panel de seleccion de caracteristicas
            contenedor.find('.formNombre').css("display", 'block');//hacer vicible los formularios 
        }
        else if(claseDeBoton == 'boton precio'){
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');//hacer invisible el panel de seleccion de caracteristicas
            contenedor.find('.formPrecio').css("display", 'block');//hacer vicible los formularios 
        }
        else if(claseDeBoton == 'boton descripcion'){
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');//hacer invisible el panel de seleccion de caracteristicas
            contenedor.find('.formDescripcion').css("display", 'block');//hacer vicible los formularios 
        }
        else if(claseDeBoton == 'boton imagen'){
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');//hacer invisible el panel de seleccion de caracteristicas
            contenedor.find('.formImagen').css("display", 'block');//hacer vicible los formularios 


            //Eleccion de una imagen para el producto


            $(document).on('change', '.Imagen', function(){//chage al elemento seleccionado (Cuando se seleccione)
                const archiboElegido = this.files[0];
                if(archiboElegido){
                    let seleccionImage = $('.imagen');//espacio a la imagen seleccionada
                    const urlDelArchivo = URL.createObjectURL(archiboElegido);
                    console.log('URL del archivo:', urlDelArchivo);

                    let lugarImage = contenedor.find('.formImagen').find('.lugarImage');//input del que se va a elejir el elemento
                    lugarImage.attr('src', urlDelArchivo);
                }

            });
        }


        //Eliminar el producto si se oprime el boton de borrar

        if(claseDeBoton == 'boton borrar'){
            let formBorrar = contenedor.find('.formBorrar');
            ubicacion_producto.find('.seleccionProducto').css("display", 'none');//hacer invisible el panel de seleccion de caracteristicas
            formBorrar.css("display", 'block');//hacer vicible los formularios 
            //se cancelo la opcion de borrar
            formBorrar.find('.cancelarOpcion').click(function(){
                ubicacion_producto.find('.seleccionProducto').css("display", 'block');//hacer invisible el panel de seleccion de caracteristicas
                formBorrar.css("display", 'none');//hacer vicible los formularios 
            })
            //se acepto la opcion de borrar
            formBorrar.find('.aceptarOpcion').click(function(){
                ubicacion_producto.remove();
                $('#salir').css("display", "none");
            })
        }
        
        //Guardar el producto junto con todas sus caracteriticas


        else if(claseDeBoton == 'boton guardar'){
           
        }

    });

    //OPCIONES DE GUARADADO (CONFIRMACION)Y CANCELACION

    $(document).on("click", '.cancelarOpcion', function(){
        var that = $(this);
        var formOrigin = that.parent();
        var nombreProducto = formOrigin.parent().parent().find('.seleccionProducto');
        var opcionForm = formOrigin.find('.opcion');
        opcionForm.val("");

        formOrigin.css("display", "none");//Invicivilizar el formulario abierto
        nombreProducto.css("display", "block");//vicibilizar el nombre del producto (boton) al hacer click en cancelar
    });

    $(document).on("click", ".aceptarOpcion", function(){
        var that = $(this);
        var formOrigin = that.parent();
        var nombreProducto = formOrigin.parent().parent().find('.seleccionProducto');
        
        formOrigin.css("display", "none");//Invicivilizar el formulario abierto
        nombreProducto.css("display", "block");//vicibilizar el nombre del producto (boton) al hacer click en cancelar
    });
    
    //Enviar el formulario del producto

    
    $(document).on("submit", ".formularioProducto", function(event){
        if (!$(event.target).is("button[type=submit]")) {
            event.preventDefault();
            console.log($(this).find('.opcion').val());
    
            if ($(this).find('.opcion').val() == ''){
                alert("como que no se va a poder");
            } else {
                alert("Datos enviados");
            }
        }
    });        
    
});