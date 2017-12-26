<?php

    header('Content-type: application/json; charset=utf-8');
    $json = array();

//    echo $page->parent()->image();

    $json[] = array(
        'text' => (string)$page->parent()->text(),
        'image' => (string)$page->parent()->image(),
        'path' => (string)$page->parent()->contentUrl()
      );

     echo json_encode($json);
?>