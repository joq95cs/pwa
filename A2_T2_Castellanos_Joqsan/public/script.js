
$(document).ready(function() {

    //DECLARACION DE VARIABLES
    var subtotal1 = 0;
    var subtotal2 = 0;
    var subtotal3 = 0;
    var subtotal4 = 0;
    var subtotal5 = 0;
    var subtotal6 = 0;
    var subtotal7 = 0;
    var subtotal8 = 0;
    var valor = null;

    //DECLARACION DE FUNCIONES
    //Funcion principal que se usara para comenzar la ejecucion del script
    function main() {
        
        valor = getValores("lib1");

        if (valor !== null) {

            if(valor !== "") {

                subtotal1 = valor * 65;
                $("#cantidad-lib1").html("<input type='number' value='" + valor + "' id='input-lib1' min='0' step='1' class='text-center'>");
                $("#subtotal-lib1").html("$" + subtotal1 + ".00");

            } else {

                $("#cantidad-lib1").html(0);
                $("#subtotal-lib1").html("$0.00");
            }
        } 

        valor = getValores("lib2");

        if (valor !== null) {

            if(valor !== "") {

                subtotal2 = valor * 65;
                $("#cantidad-lib2").html("<input type='number' value='" + valor + "' id='input-lib2' min='0' step='1' class='text-center'>");
                $("#subtotal-lib2").html("$" + subtotal2 + ".00");

            } else {

                $("#cantidad-lib2").html(0);
                $("#subtotal-lib2").html("$0.00");
            }
        } 

        valor = getValores("lib3");

        if (valor !== null) {

            if(valor !== "") {

                subtotal3 = valor * 70;
                $("#cantidad-lib3").html("<input type='number' value='" + valor + "' id='input-lib3' min='0' step='1' class='text-center'>");
                $("#subtotal-lib3").html("$" + subtotal3 + ".00");

            } else {

                $("#cantidad-lib3").html(0);
                $("#subtotal-lib3").html("$0.00");
            }
        } 

        valor = getValores("lib4");

        if (valor !== null) {

            if(valor !== "") {

                subtotal4 = valor * 70;
                $("#cantidad-lib4").html("<input type='number' value='" + valor + "' id='input-lib4' min='0' step='1' class='text-center'>");
                $("#subtotal-lib4").html("$" + subtotal4 + ".00");

            } else {

                $("#cantidad-lib4").html(0);
                $("#subtotal-lib4").html("$0.00");
            }
        }

        valor = getValores("lib5");

        if (valor !== null) {

            if(valor !== "") {

                subtotal5 = valor * 70;
                $("#cantidad-lib5").html("<input type='number' value='" + valor + "' id='input-lib5' min='0' step='1' class='text-center'>");
                $("#subtotal-lib5").html("$" + subtotal5 + ".00");

            } else {

                $("#cantidad-lib5").html(0);
                $("#subtotal-lib5").html("$0.00");
            }
        } 

        valor = getValores("lib6");

        if (valor !== null) {

            if(valor !== "") {

                subtotal6 = valor * 50;
                $("#cantidad-lib6").html("<input type='number' value='" + valor + "' id='input-lib6' min='0' step='1' class='text-center'>");
                $("#subtotal-lib6").html("$" + subtotal6 + ".00");

            } else {

                $("#cantidad-lib6").html(0);
                $("#subtotal-lib6").html("$0.00");
            }
        } 

        valor = getValores("lib7");

        if (valor !== null) {

            if(valor !== "") {

                subtotal7 = valor * 50;
                $("#cantidad-lib7").html("<input type='number' value='" + valor + "' id='input-lib7' min='0' step='1' class='text-center'>");
                $("#subtotal-lib7").html("$" + subtotal7 + ".00");

            } else {

                $("#cantidad-lib7").html(0);
                $("#subtotal-lib7").html("$0.00");
            }
        } 

        valor = getValores("lib8");

        if (valor !== null) {

            if(valor !== "") {

                subtotal8 = valor * 50;
                $("#cantidad-lib8").html("<input type='number' value='" + valor + "' id='input-lib8' min='0' step='1' class='text-center'>");
                $("#subtotal-lib8").html("$" + subtotal8 + ".00");
            
            } else {

                $("#cantidad-lib8").html(0);
                $("#subtotal-lib8").html("$0.00");
            }
        }

        $("#total").html("$" + getTotal() + ".00");
        eventos();
    }

    //Funcion para obtener los valores del formulario
    function getValores(name) {

        let valores = new URLSearchParams(window.location.search);
        return valores.get(name);
    }

    //Funcion para calcular el total
    function getTotal() {

        return subtotal1 + subtotal2 + subtotal3 + subtotal4 + subtotal5 + subtotal6 + subtotal7 + subtotal8;
    }

    //Funcion para asignar eventos
    function eventos() {

        $("#boton-pedido").click(function() {


            if(getTotal() !== 0) {

                if(confirm("¿Realizar pedido por un total de $" + getTotal() + ".00?")) {

                    alert("PEDIDO REALIZADO CON ÉXITO");
                }

                window.location.href = "index.html";

            } else {

                alert("Debe seleccionar al menos un artículo para hacer el pedido.")
            }
        });

        $("#input-lib1").on("input", function() {

            subtotal1 = ($(this).val() * 65);
            document.getElementById("subtotal-lib1").innerHTML = subtotal1;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib2").on("input", function() {

            subtotal2 = ($(this).val() * 65);
            document.getElementById("subtotal-lib2").innerHTML = subtotal2;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib3").on("input", function() {

            subtotal3 = ($(this).val() * 70)
            document.getElementById("subtotal-lib3").innerHTML = subtotal3;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib4").on("input", function() {

            subtotal4 = ($(this).val() * 70);
            document.getElementById("subtotal-lib4").innerHTML = subtotal4;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib5").on("input", function() {

            subtotal5 = ($(this).val() * 70);
            document.getElementById("subtotal-lib5").innerHTML = subtotal5;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib6").on("input", function() {

            subtotal6 = ($(this).val() * 50);
            document.getElementById("subtotal-lib6").innerHTML = subtotal6;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib7").on("input", function() {

            subtotal7 = ($(this).val() * 50);
            document.getElementById("subtotal-lib7").innerHTML = subtotal7;
            $("#total").html("$" + getTotal() + ".00");
        });

        $("#input-lib8").on("input", function() {

            subtotal8 = ($(this).val() * 50);
            document.getElementById("subtotal-lib8").innerHTML = ($(this).val() * 50);
            $("#total").html("$" + getTotal() + ".00");
        });
    }

    main(); //Se inicia el flujo de ejecucion del script
});