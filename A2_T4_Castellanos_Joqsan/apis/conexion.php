<?php 

//EL PRESENTE CODIGO REPRESENTA LA CLASE DE LA CONEXION, SEGUN LOS ESPECIFICADO
//SE DEBEN PASAR LOS VALORES QUE CORRESPONDAN SEGUN LA UBICACION REAL DEL SCRIPT

class Conexion {

    private $db_name = null;
    private $db_server = null;
    private $db_username = null;
    private $db_password = null;
    private $conexion = null;

    public function __construct($db_name, $db_server, $db_username, $db_password) {

        $this->db_name = $db_name;
        $this->db_server = $db_server;
        $this->db_username = $db_username;
        $this->db_password = $db_password;

        $this->conexion = new mysqli($db_server, $db_username, $db_password, $db_name);
    }

    public function getConexion() {

        if($this->conexion->connect_errno) {

            die ("error");
        }
        
        return $this->conexion;
    }
}