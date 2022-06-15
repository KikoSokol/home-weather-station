<?php
require 'vendor/autoload.php';
use Kreait\Firebase\Factory;

class DatabaseFirebase
{
    private $database;

    /**
     * DatabaseFirebase constructor.
     * @param $database
     */
    public function __construct()
    {
        $factory = (new Factory)
            ->withServiceAccount('secret/tina-cb6a9-firebase-adminsdk-up82k-0b4e14edf4.json')
            ->withDatabaseUri('https://tina-cb6a9-default-rtdb.firebaseio.com');

        $this->database = $factory->createDatabase();
    }

    /**
     * @return mixed
     */
    public function getDatabase()
    {
        return $this->database;
    }




}