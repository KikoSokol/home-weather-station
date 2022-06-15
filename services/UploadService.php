<?php

require_once "databases/DatabaseMySQL.php";
require_once "databases/DatabaseFirebase.php";
require_once "model/Merania.php";

class UploadService
{
    private $mysqlConn;
    private $firebaseConn;

    /**
     * UploadService constructor.
     * @param $mysqlConn
     */
    public function __construct()
    {
        $databaseMySql = new DatabaseMySQL();
        $this->mysqlConn = $databaseMySql->getConn();

        $databaseFirebase = new DatabaseFirebase();
        $this->firebaseConn = $databaseFirebase->getDatabase();
    }


    public function addToRealtimeFirebaseDatabase($svietivost,$teplota,$vlhkost)
    {
        $postData = [
            'svietivost' => $svietivost,
            'teplota' => $teplota,
            'vlhkost' => $vlhkost
        ];

        $this->firebaseConn->getReference('realtime')->update($postData);
    }

    //ak zbehne vrati id ak nezbehne vrati -1
    public function addToMysqlDatabase($svietivost,$teplota,$vlhkost)
    {
        try {
            $sql = "INSERT INTO `tina_data`(`svietivost`, `teplota`, `vlhkost`) VALUES (".$svietivost.",".$teplota.",".$vlhkost.")";
            $stmt = $this->mysqlConn->prepare($sql);
            $correct = $stmt->execute();
            if($correct)
                return $this->mysqlConn->lastInsertId();
        }
        catch (PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
            return -1;
        }

        return -1;

    }

    public function getLastTimestamp($id)
    {
        try {
            $sql = "SELECT cas FROM tina_data WHERE `ID`=".$id;
            $stmt = $this->mysqlConn->prepare($sql);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC)["cas"];
        }
        catch (PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
            return -1;
        }

    }

    public function addToFirebaseDatabase($id,$svietivost,$teplota,$vlhkost,$cas)
    {
        $postData = [
            'ID' => $id,
            'svietivost' => $svietivost,
            'teplota' => $teplota,
            'vlhkost' => $vlhkost,
            'cas' => $cas
        ];

        $this->firebaseConn->getReference('tina_data')->push($postData);
    }


    public function getInsertTimeDelay()
    {
        try {
            $sql = "SELECT insert_time_delay FROM nastavenia";
            $stmt = $this->mysqlConn->prepare($sql);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC)["insert_time_delay"];
        }
        catch (PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
            return -1;
        }

    }

    public function getInsertToDb()
    {
        try {
            $sql = "SELECT insert_to_db FROM nastavenia";
            $stmt = $this->mysqlConn->prepare($sql);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC)["insert_to_db"];
        }
        catch (PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
            return 0;
        }

    }


    public function addToBothDatabase($svietivost,$teplota,$vlhkost)
    {

        $insertedId = $this->addToMysqlDatabase($svietivost,$teplota,$vlhkost);
        if($insertedId < 0)
            return false;

        $time = $this->getLastTimestamp($insertedId);
        $this->addToFirebaseDatabase($insertedId,$svietivost,$teplota,$vlhkost,$time);

        return true;

    }

    public function getPosledneMeranie(): array
    {
        $sql = "SELECT ID as id, svietivost as svietivost, teplota as teplota, vlhkost as vlhkost, cas as cas FROM tina_data ORDER BY id DESC LIMIT 1;";
        $stmt = $this->mysqlConn->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS,"Merania");
        $result = $stmt->fetch();
        return array(
            "meranie" => $result,
        );
    }


    public function getMerania()
    {
        $sql = "SELECT ID as id, svietivost as svietivost, teplota as teplota, vlhkost as vlhkost, cas as cas FROM tina_data";// LIMIT 0,50
        $stmt = $this->mysqlConn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function setInsertToDb($set)
    {
        $set = intval($set);
        if($set < 0 || $set > 1)
            return false;
        try {
            $sql = "UPDATE `nastavenia` SET `insert_to_db`=:s";
            $stmt = $this->mysqlConn->prepare($sql);
            $stmt->bindParam("s",$set,PDO::PARAM_INT);
            $correct = $stmt->execute();

            return $correct;
        }
        catch (PDOException $e)
        {
//            echo $sql . "<br>" . $e->getMessage();
            return false;
        }
    }




}