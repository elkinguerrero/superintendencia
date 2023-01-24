<?php
    session_start();
    session_unset();

    $texto = array('status' => '1','mensaje' => 1 );

    echo json_encode($texto);
?>