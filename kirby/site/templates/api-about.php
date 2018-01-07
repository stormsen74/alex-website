<?php

    header('Content-type: application/json; charset=utf-8');
    $json = array();

//    echo $page->parent()->image();

    $json[] = array(
        'text' => (string)$page->parent()->text(),
        'path' => (string)$page->parent()->contentUrl(),
        'image' => (string)$page->parent()->image()->filename()
      );

     echo json_encode($json);
?>