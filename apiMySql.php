<?php

date_default_timezone_set ( "Europe/Bratislava" );
require_once "services/UploadService.php";
require_once "model/Merania.php";

header('Content-type: application/json');

$service = new UploadService();


$operation = "";

if(isset($_GET["operation"]))
    $operation = $_GET["operation"];


switch ($operation)
{
    case "getMerania":
        echo json_encode($service->getMerania());
        break;
    case "getPosledneMeranie":
        echo json_encode($service->getPosledneMeranie());
        break;
    case "getInsertToDb":
        echo json_encode($service->getInsertToDb());
        break;
    case "setInsertToDb":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $result = $service->setInsertToDb($data->set);
        echo json_encode($service->getInsertToDb());
        break;
    default:
        echo json_encode($service->getPosledneMeranie());

}





