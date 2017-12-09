<?php

// https://getkirby.com/docs/cookbook/json

header('Content-type: application/json; charset=utf-8');

$data = $pages->find('projects')->children()->visible();
$json = array();


foreach($data as $project) {

$images = array();
    foreach($project->builder()->toStructure() as $section) {
        array_push($images, array(
            $project->contentUrl(),
            $section->image()->value(),
            [$section->width()->value(),$section->height()->value()],
            $section->title()->value(),
            $section->description()->value()
         ));
    }

//print_r($images);
//print_r($project->contentUrl());

  $json[] = array(
    'year' => (string)$project->year(),
    'title' => (string)$project->title(),
    'text'  => (string)$project->text(),
    'category'  => (string)$project->category(),
    'images' => $images
  );


}

echo json_encode($json);

?>