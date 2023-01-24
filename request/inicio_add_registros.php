<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    //sesion
    session_start();

    //Se trae la conexion
    include "sesion.php";
    //Se llaman las variables
    $nombre_solicitante = !isset($_POST["nombre_solicitante"]) ? "": $_POST["nombre_solicitante"];
    $asunto = !isset($_POST["asunto"]) ? "": $_POST["asunto"];
    $texto_solicitud = !isset($_POST["texto_solicitud"]) ? "": $_POST["texto_solicitud"];
    $id_user = $_SESSION["usuario"]["id"];


    //Se actualizan los datos
    $query = "INSERT INTO `superintendencia`.`registros` (`id`, `nombre_solicitante`, `fecha`, `asunto`, `texto_solicitud`, `usuario_crea`) VALUES (NULL, '$nombre_solicitante', NOW(), '$asunto', '$texto_solicitud', '$id_user');";

    mysqli_query($con, $query);

    //Se crea un json de validacion
    $texto = [];
    $texto = array('status' => '1','mensaje' => array());

    echo json_encode($texto);

