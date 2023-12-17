$(document).ready(function() {
 

    /*El plugin JQuery Validator sirve para validar el formulario a enviar,
    para ello se definen reglas y mensajes utilizando objetos de JavaScript*/

    $(".formulario").validate({ //Se llama al metodo validate del plugin JQuery Validation

        rules: { //Se definen las reglas a utilizar para la validacion del formulario

            nombre: { //Se define que el nombre es obligatorio y que debe tener entre 3 y 50 caracteres

                required: true,
                minlength: 3,
                maxlength: 50
            },
            apellido: { //Se define que el apellido es obligatorio y que debe tener entre 3 y 50 caracteres

                required: true,
                minlength: 3,
                maxlength: 50
            },
            control: { //Se define que el no. control es obligatorio y que debe tener 8 caracteres obligatoriamente

                required: true,
                minlength: 8,
                maxlength: 8
            },
            carrera: { //Se define que la carrera es obligatoria y que debe tener entre 3 y 30 caracteres

                required: true,
                minlength: 3,
                maxlength: 30
            },
            semestre: { //Se define que el semestre es obligatorio y que debe tener 1 o 2 digitos

                required: true,
                minlength: 1,
                maxlength: 2
            },
            email: { //Se define que el email es obligatorio y que debe tener entre 5 y 30 caracteres

                required: true,
                minlength: 5,
                maxlength: 30
            },
            telefono: { //Se define que el telefono es obligatorio y que debe tener entre 10 digitos obligatoriamente

                required: true,
                minlength: 10,
                maxlength: 10
            }
        },

        messages: { //Se definen los mensajes que apareceran cuando no se cumplan las reglas

            nombre: "Debe ingresar un nombre válido",
            apellido: "Debe ingresar un apellido válido",
            control: "El no. control debe tener 8 caracteres",
            carrera: "Debe ingresar una carrera válida",
            semestre: "El semestre debe tener 1 o 2 digitos",
            email: "requiere",
            telefono: "El teléfono debe tener 10 digitos"
        }
    });

    //El siguiente evento de teclado permite enviar el formulario cuando se presione enter en cualquier campo
    $(".campo").on("keydown", function(evento) {

        if(evento.which === 13) { //Se valida que la tecla presionada sea Enter, cuyo codigo es 13
            
            $(".formulario").submit(); //Se llama al formulario con su selector de clase y se envia
        }
    });
    
    //Los siguientes eventos de mouse permiten rellenar el campo con un valor de ejemplo correcto al hacer doble clic
    $("#nombre").dblclick(function(){

        $(this).val("Joqsan Adalid"); //Se llama al input del nombre para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    $("#apellido").dblclick(function(){

        $(this).val("Castellanos Alicea"); //Se llama al input del apellido para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    $("#control").dblclick(function(){

        $(this).val("A1903032"); //Se llama al input del no. control para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    $("#carrera").dblclick(function(){

        $(this).val("ISC A Distancia"); //Se llama al input de la carrera para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    $("#semestre").dblclick(function(){

        $(this).val(9); //Se llama al input del semestre para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    $("#email").dblclick(function(){

        $(this).val("joq95cs@gmail.com"); //Se llama al input del email para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    $("#telefono").dblclick(function(){

        $(this).val(4521696811); //Se llama al input del telefono para fijarle el valor de prueba
        $(this).css("background-color", "#F6CEF5"); //Se le da un color al input
    });

    //Se utilizan variables booleanas que se inician en falso para hacer validaciones posteriores
    var nombre_correcto = false;
    var apellido_correcto = false;
    var control_correcto = false;
    var carrera_correcto = false;
    var semestre_correcto = false;
    var email_correcto = false;
    var telefono_correcto = false;
    var correcto = false;

    //Se usa un selector de ID para asignarle el evento mouse de clic al boton de validar
    $("#validar").click(function(evento) {

        //Se valida el nombre segun lo especificado en el plugin
        if($("#nombre").val().length >= 3 && $("#nombre").val().length <= 50) {

            nombre_correcto = true; //Se fija la variable correspondiente en true
        }

        //Se valida el apellido segun lo especificado en el plugin
        if($("#apellido").val().length >= 3 && $("#apellido").val().length <= 50) {

            apellido_correcto = true; //Se fija la variable correspondiente en true
        }

        //Se valida el no. control segun lo especificado en el plugin
        if($("#control").val().length === 8) {

            control_correcto = true; //Se fija la variable correspondiente en true
        }

        //Se valida la carrera segun lo especificado en el plugin
        if($("#carrera").val().length >= 3 && $("#carrera").val().length <= 30) {

            carrera_correcto = true; //Se fija la variable correspondiente en true
        }

        //Se valida el email segun lo especificado en el plugin
        if($("#email").val().length >= 5 && $("#email").val().length <= 30) {

            email_correcto = true; //Se fija la variable correspondiente en true
        }

        //Se valida el semestre segun lo especificado en el plugin
        if($("#semestre").val().length === 1 || $("#semestre").val().length === 2) {

            semestre_correcto = true; //Se fija la variable correspondiente en true
        }

        //Se valida el telefono segun lo especificado en el plugin
        if($("#telefono").val().length === 10) {

            telefono_correcto = true; //Se fija la variable correspondiente en true
        }

        //Si todas las variables pasaron la prueba y fueron fijadas en true, se fija la ultima variable en correcto
        if(nombre_correcto && apellido_correcto && control_correcto && carrera_correcto && semestre_correcto && email_correcto && telefono_correcto) {

            correcto = true;
        }

    });

    var enviar = false; //Se usa una variable que se inicia en falso para determinar si el formulario sera enviado

    $(".formulario").submit(function(evento) { //Se usa un selector de clase para llamar al formulario y manipular el evento de envio

        if(!enviar) {
 
            evento.preventDefault(); //Se evita que el formulario se envie de la manera normal

            if (correcto) { //Si la variable correcto es verdadera, se procede a mostrar los datos en la segunda tabla

                var nombre = $("#nombre").val(); //Se guarda el valor del nombre
                var apellido = $("#apellido").val(); //Se guarda el valor del apellido
                var control = $("#control").val(); //Se guarda el valor del no. control
                var carrera = $("#carrera").val(); //Se guarda el valor de la carrera
                var semestre = $("#semestre").val(); //Se guarda el valor del semestre
                var email = $("#email").val(); //Se guarda el valor del email
                var telefono = $("#telefono").val(); //Se guarda el valor del telefono
    
                //Se usa el metodo html para modificar los valores de las lineas de la segunda tabla y agregar los datos
                $(".valor-nombre").html("<th>Nombre:</th><td>" + nombre + "</td>");
                $(".valor-apellido").html("<th>Apellido:</th><td>" + apellido + "</td>");
                $(".valor-control").html("<th>No. control:</th><td>" + control + "</td>");
                $(".valor-carrera").html("<th>Carrera:</th><td>" + carrera + "</td>");
                $(".valor-semestre").html("<th>Semestre:</th><td>" + semestre + "</td>");
                $(".valor-email").html("<th>Email:</th><td>" + email + "</td>");
                $(".valor-telefono").html("<th>Tel&eacute;fono:</th><td>" + telefono + "</td>");
            
                //Originalmente la segunda tabla esta oculta y se muestra solo si los datos pasaron la prueba
                $("#tabla-valores").css("display", "block"); //Se llama a la segunda tabla con su selector de clase para mostrarla

                enviar = true; //Se fija la variable en verdadero para que la siguiente vez que se llame el metodo se envie el formulario
            }
        }
    });

    $("#enviar").click(function(evento) { //Se usa un selector de ID para llamar el boton de la segunda tabla y agregarle el evento clic de mouse

        evento.preventDefault(); //Se evita que se envie el formulario por defecto
        $(".formulario").submit(); //Se llama al formulario con su selector de clase para enviarlo manualmente
        alert("Datos enviados"); //Se muestra un mensaje de alerta para indicar que los datos fueron enviados
    });

    //Se usa un evento de mouse para darle un color al input cuando el cursor pasa encima
    $(".campo").mouseover(function() {

        $(this).addClass("color-campo");
    });

    //Se usa un evento de mouse para quitarle el color al input cuando el cursor sale
    $(".campo").mouseleave(function() {

        $(this).removeClass("color-campo");
    });

    //Se usa un evento de mouse de clic para que se mantenga el color al hacer clic
    $(".campo").click(function() {

        $(this).css("background-color", "#CEF6F5");
    });
});