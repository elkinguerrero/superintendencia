<?php
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    //Se trae la conexion
    include "sesion.php";
    //Se consulta si el correo existe
    $query = "SELECT R.*, U.email FROM registros R 
    INNER JOIN user U
    ON R.usuario_crea = U.id
    ORDER BY R.fecha DESC";
    $resultado = mysqli_query($con, $query);

    //Se crea un json de validacion
    $texto = [];
    $texto = array('status' => '1','mensaje' => array());

    while ($fila = mysqli_fetch_array($resultado)) {
        array_push($texto["mensaje"],$fila);
    }

    echo json_encode($texto);

