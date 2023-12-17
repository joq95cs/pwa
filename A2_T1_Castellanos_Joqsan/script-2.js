
function getValores(n) {

    const valores = new URLSearchParams(window.location.search);
    return valores.get(n);
}

window.onload = function () {

    var valor = getValores("nombre");

    if (valor !== null) {

        document.getElementById("nombre-recibido").innerHTML = valor;
    } else {
        document.getElementById("nombre-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }

    valor = getValores("apellido");

    if (valor !== null) {

        document.getElementById("apellido-recibido").innerHTML = valor;
    } else {
        document.getElementById("apellido-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }

    valor = getValores("control");

    if (valor !== null) {

        document.getElementById("control-recibido").innerHTML = valor;
    } else {
        document.getElementById("control-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }

    valor = getValores("carrera");

    if (valor !== null) {

        document.getElementById("carrera-recibido").innerHTML = valor;
    } else {
        document.getElementById("carrera-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }

    valor = getValores("semestre");

    if (valor !== null) {

        document.getElementById("semestre-recibido").innerHTML = valor;
    } else {
        document.getElementById("semestre-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }

    valor = getValores("email");

    if (valor !== null) {

        document.getElementById("email-recibido").innerHTML = valor;
    } else {
        document.getElementById("email-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }

    valor = getValores("telefono");

    if (valor !== null) {

        document.getElementById("telefono-recibido").innerHTML = valor;
    } else {
        document.getElementById("telefono-recibido").innerHTML = "No se ha recibido ning&uacute;n dato";
    }
};