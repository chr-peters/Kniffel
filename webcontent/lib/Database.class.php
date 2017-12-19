<?php
require('../config.php');

class Database {
    private static $instance;

    private $pdo;

    private function __construct() {
        // access the variables needed for connection
        global $db_host, $db_user, $db_passwd, $db_name;
        
        // create the connection string
        $dsn = "mysql:host=".$db_host.";dbname=".$db_name;

        // create the pdo instance
        $this->pdo = new PDO($dsn, $db_user, $db_passwd);
    }

    public static function getInstance() {
        if (!isset(Database::$instance)) {
            Database::$instance = new Database();
        }
        return Database::$instance;
    }
}

// test the connection
try {
    $db = Database::getInstance();
} catch (PDOException $e) {
    echo 'Connection failed: '.$e->getMessage();
}