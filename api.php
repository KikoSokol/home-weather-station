<?php
date_default_timezone_set ( "Europe/Bratislava" );
require_once "services/UploadService.php";

$uploadService = new UploadService();


$insertDelay = $uploadService->getInsertTimeDelay();
if($insertDelay >= 0)
{
    echo "realtime@" . $insertDelay . "~";
}
else {
    echo "Nepodarilo sa načítať a nastaviť delay";
}


if(isset($_POST['teplota']) && isset($_POST['svietivost']) && isset($_POST['vlhkost']))
{
    $uploadService->addToRealtimeFirebaseDatabase($_POST['svietivost'],$_POST['teplota'],$_POST['vlhkost']);
}





if(isset($_POST['teplota']) && isset($_POST['svietivost']) && isset($_POST['vlhkost']))
{

    if($uploadService->getInsertToDb())
    {
        if(!$uploadService->addToBothDatabase($_POST['svietivost'],$_POST['teplota'],$_POST['vlhkost']))
        {
            echo "Nepodarilo sa vložiť údaje do databázy";
        }

    }


}
?>