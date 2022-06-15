<?php
require_once 'config.php';

class DatabaseMySQL
{
    private $conn;

    /**
     * Database constructor.
     * @param $conn
     */
    public function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,DB_USER,DB_PASS);
        }
        catch (PDOException $exception)
        {
            echo "Database could not be connected: " . $exception->getMessage();
        }
    }

    /**
     * @return PDO
     */
    public function getConn()
    {
        return $this->conn;
    }
}