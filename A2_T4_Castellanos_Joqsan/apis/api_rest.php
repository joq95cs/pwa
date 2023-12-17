<?php 

//EL PRESENTE CODIGO REPRESENTA LA API REST QUE PERMITE CONECTAR JS CON PHP PARA LA GESTION DE LA BASE DE DATOS MYSQL

//Se implementa la API REST y el BACKEND necesario
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

//Se necesita el archivo con la clase de la conexion
require "conexion.php";

class CRUD { //Clase encargada de la logica de BACKEND y de API REST del CRUD

    //Se definen los datos de la conexion
    private $db_name = "api_peliculas";
    private $db_server = "127.0.0.1";
    private $db_username = "root";
    private $db_password = "";
    private $conexion = null;

    //Se define el constructor para crear la conexion, identificar la operacion y dirigir la ejecucion al metodo correcto
    public function __construct($operacion) {

        $opcion = $_GET["opcion"];
        $this->conexion = (new Conexion($this->db_name, $this->db_server, $this->db_username, $this->db_password))->getConexion();

        if($opcion == 1) {

            $this->registrar();

        } else if ($opcion == 2) {

            $this->buscar();

        } else if($opcion == 3) {

            $this->actualizar();

        } else if ($opcion == 4) {

            $this->eliminar();

        } else {

            die("error");
        }
    }

    //Los siguientes metodos representan la logica de cada operacion del CRUD
    public function registrar() {

        $id = $_GET["id"];
        $nombre = $_GET["nombre"];
        $director = $_GET["director"];
        $estudio = $_GET["estudio"];
        $agno = $_GET["agno"];
        $pais = $_GET["pais"];
        $genero = $_GET["genero"];

        //No se permiten valores vacios
        if(empty($id) or empty($nombre) or empty($director) or empty($estudio) or empty($agno) or empty($pais) or empty($genero)) {

            die("empty");
        }

        //Se realiza la insercion
        $sql = "INSERT INTO peliculas (id_pelicula, nombre, director, estudio, agno, pais, genero) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stm = $this->conexion->prepare($sql);
        $stm->bind_param("ssssiss", $id, $nombre, $director, $estudio, $agno, $pais, $genero);
        $stm->execute();

        die("correcto"); //Se genera la respuesta de exito
    }

    public function buscar() {

        $id = $_GET["id"];

        if(empty($id)) {

            die("empty");
        }

        $sql = "SELECT * FROM peliculas WHERE id_pelicula = ?";
        $stm = $this->conexion->prepare($sql);
        $stm->bind_param("s", $id);
        $stm->execute();
        $res = $stm->get_result();

        if($res->num_rows == 1) {

            //Si se encontro el id se regresa el registro como json
            $registro = $res->fetch_assoc();
            die(json_encode($registro));

        } else {

            die("ninguno"); //Si no se encontro el valor id se regresa la respuesta
        }
    }

    public function actualizar() {

        $id = $_GET["id"];
        $nombre = $_GET["nombre"];
        $director = $_GET["director"];
        $estudio = $_GET["estudio"];
        $agno = $_GET["agno"];
        $pais = $_GET["pais"];
        $genero = $_GET["genero"];

        if(empty($id) or empty($nombre) or empty($director) or empty($estudio) or empty($agno) or empty($pais) or empty($genero)) {

            die("empty");
        }

        //Se actualiza el registro de acuerdo al id indicado, el id no se actualiza
        $sql = "UPDATE peliculas SET nombre = ?, director = ?, estudio = ?, agno = ?, pais = ?, genero = ? WHERE id_pelicula = ?";
        $stm = $this->conexion->prepare($sql);
        $stm->bind_param("sssisss", $nombre, $director, $estudio, $agno, $pais, $genero, $id);
        $stm->execute();

        die("correcto");
    }

    public function eliminar() {

        $id = $_GET["id"];

        if(empty($id)) {

            die("empty");
        }

        //Se borra el registro segun el id
        $sql = "DELETE FROM peliculas WHERE id_pelicula = ?";
        $stm = $this->conexion->prepare($sql);
        $stm->bind_param("s", $id);
        $stm->execute();

        if($stm->affected_rows == 1) {
            
            die("correcto"); //Se indica que se borro correctamente

        } else {

            die("ninguno"); //Se indica que no se encontro nada que borrar
        }
    }
}

//Solo se instancia la clase del CRUD para dar inicio a toda la ejecucion
$crud = new CRUD("registrar");