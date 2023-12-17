
$(document).ready(function() {

    //Funcion con validaciones para registrar usarios
    function validarRegistro(nombre, apellido, genero, edad, telefono, email, password, rol) {

        //No se permiten valores nulos o cadenas vacias en ningun campo
        if(nombre === null || nombre === "") {
            
            return false;

        } else {

            if(nombre.length < 3 || nombre.length > 50) { //Longitud entre 3 y 50 caracteres

                return false;
            }
        }

        if(apellido === null || apellido === "") {

            return false;

        } else {

            if(apellido.length < 3 || apellido.length > 50) { //Longitud entre 3 y 50 caracteres

                return false;
            }
        }

        if(genero === null || genero === "") {

            return false;
        }

        if(edad === null || edad === "") {

            return false;

        } else {

            if(edad < 18) { //No puede haber edades menores a 18

                return false;
            }
        }

        if(telefono === null || telefono === "") {

            return false;

        } else {

            if(telefono.length < 10 || telefono.length > 10) {
                
                return false;
            }
        }

        if(email === null || email === "") {

            return false;

        } else {

            if(!email.includes("@") && !email.includes(".")) { //El email debe tener arroba y punto

                return false;
            }
        }

        if(password === null || password === "") {

            return false;

        } else {

            if(password.length < 6) { //Longitud entre mayor a 6 caracteres

                return false;
            }
        }

        if(rol === null || password === "") {

            return false;
        }

        return true;
    }

    //Funcion para registrar a los usuarios
    function registrarUsuario(nombre, apellido, genero, edad, telefono, email, rol) {

        var database = firebase.database(); //Conexion a la base de datos de firebase

        var data = { //Datos a agregar

            "nombre": nombre,
            "apellido": apellido,
            "genero": genero,
            "edad": edad,
            "telefono": telefono,
            "email": email,
            "rol": rol
        };
          
        var ref = database.ref("usuarios"); //Nodo a utilizar para los usuarios

        ref.push(data).then(() => { //Funcion que agrega los datos con un ID unico para cada registro

            console.log("Datos de usuario agregados");

        }).catch(() => {

            console.error("Error al agregar datos de usuario");
        });
    }

    //Funcion para registar libros
    function registrarLibro(titulo_libro, autor_libro, agno_libro, editorial_libro, genero_libro, pais_libro) {

        var database = firebase.database(); //Conexion a la base de datos de firebase

        var data = { //Datos a agregar

            "titulo": titulo_libro,
            "autor": autor_libro,
            "agno": agno_libro,
            "editorial": editorial_libro,
            "genero": genero_libro,
            "pais": pais_libro
        };
          
        var ref = database.ref("libros"); //Nodo a usar para los libros

        ref.push(data).then(() => { //Funcion para agregar los libros con un ID unico por registro

            alert("REGISTRO AGREGADO");

        }).catch(() => {

            alert("Error");
        });
    }

    //Funcion para iniciar sesion
    function login(user, pass) {//Se requiere el correo y la contrasena

        //Funcion para iniciar sesion con correo y contrasena
        firebase.auth().signInWithEmailAndPassword(user, pass).then((credenciales) => {

            console.log("Sesión iniciada:" + user);
            var database = firebase.database(); //Conexion a base de datos

            //Se consulta la base de datos para conocer el rol asignado al usuario con el email
            database.ref("usuarios").orderByChild("email").equalTo(user).once("value", function(snapshot) {

                if (snapshot.exists()) {

                    snapshot.forEach(function(childSnapshot) {

                        var rol = childSnapshot.val().rol;

                        if(rol === "administrador") { //Si es administrador se redirige a la pagina para registrar nuevos usuarios como admin.

                            alert("BIENVENIDO ADMINISTRADOR")
                            window.location.href = "registro-admin.html";

                        } else if(rol === "editor") { //Si es editor se redirige al registro de libros

                            alert("BIENVENIDO EDITOR")
                            window.location.href = "registro-libros.html";

                        } else if(rol === "invitado") { //Si es invitado se redirige a la lista de libros

                            alert("BIENVENIDO INVITADO")
                            window.location.href = "lista-libros.html";
                        }
                    });
                }
            }, function(error) {
                    
                console.error(error);
            });
        }).catch((error) => {

            alert("Error" + error);
        });
    }

    //Al presionar el boton de login se llama a la funcion para login
    $("#btn-login").click(function() {

        //Se rescatan los valores de los inputs
        var user = $("#user").val();
        var pass = $("#pass").val();

        login(user, pass);
    });

    //Se asigna evento al boton para registrarse
    $("#btn-registrarse").click(function() {

        //Se rescatan los valores de los inputs
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let genero = $("#genero").val();
        let edad = $("#edad").val();
        let telefono = $("#telefono").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let rol = "invitado"; //Se define el rol como invitado por defecto

        //Se valida que la funcion de validacion regrese true
        if(validarRegistro(nombre, apellido, genero, edad, telefono, email, password, rol)) {

            //Se agrega el registro a la base de datos
            registrarUsuario(nombre, apellido, genero, edad, telefono, email, rol);

            //Se agrega el usuario para autenticacion
            firebase.auth().createUserWithEmailAndPassword(email, password).then((credenciales) => { //Se crea con correo y contrasena

                alert("REGISTRO EXITOSO");
                window.location.href = "lista-libros.html"; //Despues de agregarse el usuario se redirige a la lista de libros
    
            }).catch((error) => {
    
                alert("Error: " + error);
            });

        } else {

            alert("ERROR DE FORMULARIO");
        }
    });

    //Se asigna evento al boton para registrar usuarios como admin.
    $("#btn-registrar-admin").click(function() {

        let nombre = $("#nombre-admin").val();
        let apellido = $("#apellido-admin").val();
        let genero = $("#genero-admin").val();
        let edad = $("#edad-admin").val();
        let telefono = $("#telefono-admin").val();
        let email = $("#email-admin").val();
        let password = $("#password-admin").val();
        let rol = $("#rol-admin").val(); //Se puede elegir el rol

        if(validarRegistro(nombre, apellido, genero, edad, telefono, email, password, rol)) {

            registrarUsuario(nombre, apellido, genero, edad, telefono, email, rol);

            firebase.auth().createUserWithEmailAndPassword(email, password).then((credenciales) => {

                alert("Usuario agregado");
    
            }).catch((error) => {
    
                alert(error);
            });

        } else {

            alert("ERROR DE FORMULARIO");
        }
    });

    //Se asigna el evento para agregar libros
    $("#btn-registrar-libro").click(function() {

        //Se rescatan los valores de los inputs
        let titulo = $("#titulo-libro").val();
        let autor = $("#autor-libro").val();
        let agno = $("#agno-libro").val();
        let editorial = $("#editorial-libro").val();
        let genero = $("#genero-libro").val();
        let pais = $("#pais-libro").val();

        //Se llama a la funcion para registrar el libro
        registrarLibro(titulo, autor, agno, editorial, genero, pais);
    });
});