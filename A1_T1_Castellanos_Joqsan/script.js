/*
    INSTITUTO TECNOLOGICO SUPERIOR PURHÉPECHA
    Estudiante: Joqsan Adalid Castellanos Alicea
    Grupo: A1903032
*/

$(document).ready(function(){ //El codigo se ejecuta cuando el documento esta listo

    $("button").click(function() {

        $(this).fadeOut();

        //Se usa la clase titulo y el metodo css para darle estilo al título de la pagina web
        $(".titulo").css("color", "black");
        $(".titulo").css("font-weight", "bold");
        $(".titulo").css("font-family", "Verdana");
        $(".titulo").css("font-size", "200%");
        $(".titulo").css("text-align", "center");
        $(".titulo").css("margin-top", "50px");
        $(".titulo").css("padding-top", "10px");
        $(".titulo").css("padding-bottom", "10px");

        //Se usa la clase art1 y el metodo css para darle estilo a los parrafos
        $(".art1").css("background-color", "#F7D8A7"); 
        $(".art2").css("width", "800px");
        $(".art2").css("margin-top", "25px");
        $(".art2").css("margin-left", "auto");
        $(".art2").css("margin-right", "auto");
        $(".art2").css("text-align", "justify");
        $(".art2").css("font-weight", "Arial");
        $(".art2").css("font-size", "120%");

        //Se usa la clase subtitulo y el metodo css para darle estilo a los subtitulos de la pagina web
        $(".subtitulo").css("color", "gray");
        $(".subtitulo").css("font-weight", "bold");
        $(".subtitulo").css("text-align", "center");
        $(".subtitulo").css("margin-bottom", "10px");

        //Se usan los selectores img y figure y el metodo css para darle estilo a la imagen
        $("img").css("width", "250px")
        $("figure").css("text-align", "center");
        $("figure").css("margin", "25px");

        //Se usa la clase art3 py el metodo css para darle estilo al texto inferior
        $(".art3").css("text-align", "center");
        $(".art3").css("margin", "25px");
        $(".art3").css("font-size", "110%");
        $(".art3").css("font-style", "italic");
        $(".art3").css("color", "red");
        $(".art3").css("font-weight", "Verdana");

        //Se usa la clase art4 y el metodo css para darle estilo al footer
        $(".art4").css("font-size", "110%");
        $(".art4").css("font-weight", "Verdana");
        $(".art4").css("text-align", "center");
        $(".art4").css("display", "none");
        $(".art4").css("font-style", "italic");
        $(".art4").css("margin-top", "25px");
        $(".art4").css("margin-bottom", "25px");

        //Se utiliza la clase art2 y se asigna el evento para que al dar doble clic sobre los parrafos el fondo cambie a un color random
        $(".art2").dblclick(function() {

            //Se crean 3 variables para almacenar los valores del rgb
            var red = Math.floor(Math.random() * 256);
            var green = Math.floor(Math.random() * 256);
            var blue = Math.floor(Math.random() * 256);

            //Se usa el metodo css para cambiar el fondo del parrafo a un color aleatorio
            $(this).css('background-color', "rgb(" + red + ", " + green + ", " + blue + ")");
        });

        //Se utiliza el selector img y se asigna el evento clic para que la imagen desaparezca al presionarla
        $("img").click(function() {
            
            $(this).fadeOut(); //Se oculta la imagen con el metodo fadeOut
        });

        //Se usa el selector art3 y el evento clic para que al presionar el texto rojo inferior, el footer aparezca
        $(".art3").click(function() {

            $(this).fadeOut(); //Se oculta el texto rojo con el metodo fadeOut
            $(".art4").fadeIn(); //Se muestra el footer con el metodo fadeIn
        });

    });
});