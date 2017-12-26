<?php

    header('Content-type: application/json; charset=utf-8');
    $json = array();

//    echo $page->parent()->title();

    $json[] = array(
        'adress' => (string)$page->parent()->adress(),
        'mail' => (string)$page->parent()->mail(),
        'phone' => (string)$page->parent()->phone(),
        'adress_work' => (string)$page->parent()->adress_work(),
        'url_work' => (string)$page->parent()->url_work()
      );

     echo json_encode($json);
?>