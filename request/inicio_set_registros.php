<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    //Se trae la conexion
    include "sesion.php";
    //Se llaman las variables
    $nombre_solicitante = !isset($_POST["nombre_solicitante"]) ? "": $_POST["nombre_solicitante"];
    $asunto = !isset($_POST["asunto"]) ? "": $_POST["asunto"];
    $texto_solicitud = !isset($_POST["texto_solicitud"]) ? "": $_POST["texto_solicitud"];
    $id = !isset($_POST["id"]) ? "": $_POST["id"];

    //Se actualizan los datos
    $query = "UPDATE registros SET nombre_solicitante = '$nombre_solicitante', asunto = '$asunto', texto_solicitud = '$texto_solicitud' WHERE id = $id";

    mysqli_query($con, $query);

    //Se crea un json de validacion
    $texto = [];
    $texto = array('status' => '1','mensaje' => array());

    echo json_encode($texto);

