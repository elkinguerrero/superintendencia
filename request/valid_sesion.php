<?php
    session_start();

    //Se crea un json de validacion
    $texto = [];
    if( isset($_SESSION['usuario']) ){
        $texto = array('status' => '1','mensaje' => 1 );
    }else
        $texto = array('status' => '1','mensaje' => 0 );

    echo json_encode($texto);
?>