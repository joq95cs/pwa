
$(document).ready(function() {

    //Se defina la funcion que desencadenara la ejecucion de todo lo demas
    function main() {

        new CRUD(); //Se instancia la clase, no es necesario guardar la variable

        //Se agrega el uso de dos APIS mas para la ubicacion actual y el clima
        obtenerUbicacion();
    }

    //Funcion para la api de ubicacion
    function obtenerUbicacion() {

        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(
                
                function(ubicacion) {

                    let latitud = ubicacion.coords.latitude;
                    let longitud = ubicacion.coords.longitude;

                    $("#ubicacion").append("Ubicaci&oacute;n actual: (" + latitud + ", " + longitud + ")");
                    obtenerClima(latitud, longitud);
                }, 
                
                function(error) {

                    $("#ubicacion").append("Ubicaci&oacute;n no disponible");
                    $("#clima").append("Clima no disponible");
                }
            );

        } else {

            $("#ubicacion").append("Ubicaci&oacute;n no soportada");
            $("#clima").append("Clima no soportado");
        }
    }

    //Funcion para la api de clima
    function obtenerClima(latitud, longitud) {

        //Se llama a la api usando la api key proporcionado por el sitio web, se usa la latitud y longitud determinada por la api de ubicacion
        let url = "http://api.weatherapi.com/v1/current.json?key=726ad72ae15543d3b1945722232910&q=" + latitud + "," + longitud + "&aqi=no";

        //Al llamarse la api de clima, se recibe un JSON con los datos del clima
        fetch(url).then(data => data.json()).then(

            function(respuesta) {//Se obtiene la respuesta en formato json

                //Se agrega el nombre de la ubicacion segun las coordenadas, ya que la otra api no proporciona el nombre
                $("#ubicacion").append(" - " + respuesta.location.name);
                //Se agrega el clima de la ubicacion actual por medio de llamar la propiedad correspondiente para grados C
                $("#clima").append("Clima en la ubicaci&oacute;n actual: " + respuesta.current.temp_c + " °C");
            }

        ).catch(

            function(error) {

                //En caso de que no se pueda obtener el JSON se indica que no se puede mostrar el clima
                $("#clima").append("Clima no disponible");
            }
        )
    }

    //Se define la clase que contiene las funciones y propiedades para el crud
    class CRUD {

        constructor() {

            //Se recuperan los botones
            this.btn_registrar = $("#btn-registrar");
            this.btn_actualizar = $("#btn-actualizar");
            this.btn_buscar = $("#btn-buscar");
            this.btn_eliminar = $("#btn-eliminar");

            //Se llama a una funcion que asigna los eventos de clic a los botones
            this.asignarEventos();
        }

        asignarEventos() {

            //Se asignan los eventos y se les pasa las funciones que corresponden a cada boton
            this.btn_registrar.click(this.registrar);
            this.btn_actualizar.click(this.actualizar);
            this.btn_buscar.click(this.buscar);
            this.btn_eliminar.click(this.eliminar);
        }

        registrar() {

            //alert("Registrado");

            //Se recuperan los valores de los inputs
            let id = $("#id-pelicula").val();
            let nombre = $("#nombre").val();
            let director = $("#director").val();
            let estudio = $("#estudio").val();
            let agno = $("#agno").val();
            let pais = $("#pais").val();
            let genero = $("#genero").val();

            //Se define la url con la ubicacion de la API REST
            //En este caso, se dirige a un script que se encuentra en un servidor XAMPP local
            //Si se desea subir el sitio web a internet es necesario indicar la direccion del servidor que tiene el script
            //La opcion no. 1 corresponde a insertar
            let url = "api_rest.php?opcion=1&id=" + id + "&nombre=" + nombre + "&director=" + director + "&estudio=" + estudio + "&agno=" + agno + "&pais=" + pais + "&genero=" + genero;

            fetch(url).then(data => data.text()).then( //Se llama a la api FETCH que permite enviar los datos por la url y conocer la respuesta del servidor

                function(respuesta) { //Se gestionan las diferentes respuestas que puede alojar el servidor

                    if(respuesta === "correcto") { //Si la respuesta es "correcto", significa que se inserto de forma correcta

                        alert("REGISTRO AGREGADO");

                    } else if(respuesta === "error") {

                        alert("ERROR DE REGISTRO");

                    } else if(respuesta === "empty") {

                        alert("ERROR DE CAMPOS VACÍOS");

                    } else { //Si la respuesta es algo no definido, se considera un error inesperado

                        alert("ERROR INESPERADO");
                    }
                }

            ).catch(
                    
                function(error) { //Si la api FETCH falla, tambien se considera error inesperado
                        
                    console.log(error);
                    alert("ERROR INESPERADO");
                }
            );
        }

        buscar() {

            //alert("Actualizado");
            //Solamente se recupera el id ingresado
            let id = $("#id-pelicula").val();

            //Se ajusta la url para que indique que se realizara la opcion no. 2 que corresponde a buscar y se le pasa el id
            let url = "api_rest.php?opcion=2&id=" + id;

            fetch(url).then(data => data.text()).then(

                function(respuesta) { //Se gestionan las posibles respuestas

                    if(respuesta === "ninguno") {

                        alert("ERROR DE ID NO ENCONTRADO");

                    } else if(respuesta === "empty") {

                        alert("ERROR DE ID VACÍO");

                    } else if(respuesta === "error") {

                        alert("ERROR DE BÚSQUEDA");

                    } else { //Si se llego a este punto es porque se recibio el json con los datos o un error inesperado

                        if(function () {

                            //Se verifica si la respuesta es un json valido
                            try {

                                JSON.parse(respuesta);
                                return true; //Si es valido regresa true
    
                            } catch(error) {
    
                                return false; //Si no es valido regresa false

                            }}) {
                                
                            //Condicion
                            let datos = JSON.parse(respuesta); //Se parsea el json y se fijan los valores de cada input
                            $("#nombre").val(datos.nombre);
                            $("#director").val(datos.director);
                            $("#estudio").val(datos.estudio);
                            $("#agno").val(datos.agno);
                            $("#pais").val(datos.pais);
                            $("#genero").val(datos.genero);

                            alert("REGISTRO ENCONTRADO");

                        } else {

                            alert("ERROR INESPERADO"); //Si no es json, entonces es un error inesperado
                        }
                    }
                }

            ).catch(
                    
                function(error) {
                        
                    console.log(error);
                    alert("ERROR INESPERADO"); //Si falla la api se considera error inesperado
                }
            );
        }

        actualizar() {

            //Se recuperan todos los inputs
            let id = $("#id-pelicula").val();
            let nombre = $("#nombre").val();
            let director = $("#director").val();
            let estudio = $("#estudio").val();
            let agno = $("#agno").val();
            let pais = $("#pais").val();
            let genero = $("#genero").val();

            //Se indica la opcion no. 3 para actualizar y se pasan los parametros
            let url = "api_rest.php?opcion=3&id=" + id + "&nombre=" + nombre + "&director=" + director + "&estudio=" + estudio + "&agno=" + agno + "&pais=" + pais + "&genero=" + genero;

            fetch(url).then(data => data.text()).then(

                function(respuesta) { //Se gestionan las respuestas

                    if(respuesta === "correcto") {

                        alert("REGISTRO ACTUALIZADO");

                    } else if(respuesta === "error") {

                        alert("ERROR DE ACTUALIZACIÓN");

                    } else if(respuesta === "empty") {

                        //Si se recibe esta respuesta es porque el script indico que hay campos vacios
                        alert("ERROR DE CAMPOS VACÍOS");

                    } else {

                        alert("ERROR INESPERADO"); //Si se llega a este punto es error inesperado
                    }
                }

            ).catch(
                    
                function(error) {
                        
                    console.log(error);
                    alert("ERROR INESPERADO"); //Si falla la api es error inesperado
                }
            );
        }

        eliminar() {

            //alert("Eliminado");
            //Solo se recupera el id del registro a borrar
            let id = $("#id-pelicula").val();

            //Se genera la url con la opcion no. 4 y se le pasa el id a borrar
            let url = "api_rest.php?opcion=4&id=" + id;

            fetch(url).then(data => data.text()).then(

                function(respuesta) { //Se gestinan las respuestas

                    if(respuesta === "ninguno") {

                        alert("ERROR DE ID NO ENCONTRADO");

                    } else if(respuesta === "empty") {

                        alert("ERROR DE ID VACÍO");

                    } else if(respuesta === "error") {

                        alert("ERROR DE ELIMINACIÓN");

                    } else if(respuesta === "correcto") {

                        alert("REGISTRO ELIMINADO");

                    } else {

                        alert("ERROR INESPERADO");
                    }
                }

            ).catch(
                    
                function(error) {
                        
                    console.log(error);
                    alert("ERROR INESPERADO");
                }
            );
        }
    }

    main(); //Comienza el flujo de ejecucion de todo el script de JS
});