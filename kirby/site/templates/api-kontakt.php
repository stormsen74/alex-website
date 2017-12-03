<?php

    header('Content-type: application/json; charset=utf-8');
    $json = array();

//    echo $page->parent()->title();
//    echo $page->parent()->text()

    $json[] = array(
        'title' => (string)$page->parent()->title(),
        'text' => (string)$page->parent()->text()
      );

     echo json_encode($json);
?>