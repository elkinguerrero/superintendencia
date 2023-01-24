<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // phpinfo();
    $con = mysqli_init();
    mysqli_ssl_set($con,NULL,NULL, "../key/DigiCertGlobalRootCA.crt.pem", NULL, NULL);
    mysqli_real_connect($con, "elkin931011.mysql.database.azure.com", "superintendencia", "YzNWd1pYSnBiblJsYm1SbGJtTnBZUT09", "superintendencia");