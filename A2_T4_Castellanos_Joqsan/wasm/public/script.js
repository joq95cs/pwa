window.onload = function() {

    //SCRIPT DE LOGICA Y CONFIGURACIONES PARA WEB ASSEMBLY

    var WASM = null; //Variable que se usara para interactuar con WASM

    //Se asignan los datos de configuracion para WASM
    var memoriaWASM = new WebAssembly.Memory(
        {
            initial: 256, 
            maximum: 256
        });

    var tablaWASM = new WebAssembly.Table(
        {
            "initial": 1, 
            "maximum": 1, 
            "element": "anyfunc"
        });

    var libreriaWASM = {

        "__handle_stack_overflow": ()=>{},
        "emscripten_resize_heap": ()=>{},
        "__lock": ()=>{}, 
        "__unlock": ()=>{},
        "memory": memoriaWASM, 
        "table": tablaWASM 
    }

    var info = {

        'env': libreriaWASM,
        'wasi_snapshot_preview1': libreriaWASM
    };

    //Funcion que recupera el archivo con codigo de wasm
    function cargarWASM() {

        //Se solicita el codigo a un servidor Apache local
        fetch("calculos.wasm").then(

                respuesta => respuesta.arrayBuffer()) //Se transforma la respuesta a bytes
            
            .then(

                bytes => WebAssembly.instantiate(bytes, info)) //Se instancia WebAssembly usando los bytes
                
            .then(objetoWASM => {

                WASM = objetoWASM.instance.exports; //Se instancia la variable WASM lista para exportarse y usarse
            }

        ).catch(error => {

            console.log(error); //Se manejan los errores
        });
    }

    //Se definen las funciones a usar para las operaciones
    function sumar() {

        let x = document.getElementById("sumar-n1").value;
        let y = document.getElementById("sumar-n2").value;

        //Se usa WASM para llamar a los metodos
        document.getElementById("sumar-res").value = WASM.sumar(x, y);
    }

    function restar() {

        let x = document.getElementById("restar-n1").value;
        let y = document.getElementById("restar-n2").value;

        //Se usa WASM para llamar a los metodos
        document.getElementById("restar-res").value = WASM.restar(x, y);
    }

    function multiplicar() {

        let x = document.getElementById("mult-n1").value;
        let y = document.getElementById("mult-n2").value;

        //Se usa WASM para llamar a los metodos
        document.getElementById("mult-res").value = WASM.multiplicar(x, y);
    }

    function dividir() {  

        let x = document.getElementById("div-n1").value;
        let y = document.getElementById("div-n2").value;

        //Se usa WASM para llamar a los metodos
        document.getElementById("div-res").value = WASM.dividir(x, y);
    }

    //Se llama a la funcion que construye a la variable WASM que sera usada para los calculos
    cargarWASM();

    //Se asignan los eventos correspondientes a cada boton
    document.getElementById("btn-sumar").addEventListener("click", function () {

        sumar();
    });

    document.getElementById("btn-restar").addEventListener("click", function () {

        restar();
    });

    document.getElementById("btn-mult").addEventListener("click", function () {

        multiplicar();
    });

    document.getElementById("btn-div").addEventListener("click", function () {

        dividir();
    });
};