<?php
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    //Se trae la conexion
    include "sesion.php";
    //Se llaman las variables
    $user = !isset($_POST["user"]) ? "": $_POST["user"];
    $password = !isset($_POST["user"]) ? "": $_POST["password"];

    //Se consulta si el correo existe
    $query = "SELECT id,email, password, intentos FROM user WHERE email = '$user'";
    $resultado = mysqli_query($con, $query);

    //Se crea un json de validacion
    $texto = [];
    $texto = array('status' => '1','mensaje' => array());

    while ($fila = mysqli_fetch_array($resultado)) {
        //Si la clave y el correo existe retorna exito
        if( $fila["intentos"] > 2 ){
            array_push($texto["mensaje"],[0]);
        }else if( $password == $fila["password"] ){
            //Si es exitoso se deja en 0
            $id = $fila["id"];
            $query = "UPDATE user SET intentos = 0 WHERE id = $id";
            mysqli_query($con, $query);
            array_push($texto["mensaje"],[1]);

            session_start();
            $_SESSION['usuario'] = ["id"=>$id];
        }else{
            //Si la clave no coincide se agrega un intento a la tabla
            $id = $fila["id"];
            $intentos = $fila["intentos"]+1;
            $query = "UPDATE user SET intentos = $intentos WHERE id = $id";
            mysqli_query($con, $query);
        }
    }

    echo json_encode($texto);

