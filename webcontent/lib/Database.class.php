<?php
require(__DIR__.'/../config.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

    /**
     * Returns an array of score objects.
     * Each score object is represented by an associative array.
     * 
     * Example: 
     *          $score['name'] = 'Heinz'
     *          $score['score'] = 250
     *          $score['time_stamp'] = 2017-12-20 07:41:40
     *
     * @param limit The maximum number of rows
     * @param offset The index of the starting row
     */
    public function getScores($limit, $offset) {
        // create the statement
        $statement = $this->pdo->prepare('select * from highscores order by score desc limit '.$limit.' offset '.$offset);

        // execute the statement
        $statement->execute();

        // get the results
        $results;
        while ($row = $statement->fetch()) {
            // create a temporary score object
            $curScore = array();
            $curScore['name'] = $row['name'];
            $curScore['score'] = (int)$row['score'];
            $curScore['time_stamp'] = $row['time_stamp'];

            // fill it into the results
            $results[] = $curScore;
        }

        return $results;
    }

    /**
     * Returns a single record in the format that was specified in getScores.
     *
     * @param name The name of the user.
     *
     * @return The record in the already specified format or NULL if the user was not found.
     */
    public function getScoreRecord($name) {
        // create the statement
        $statement = $this->pdo->prepare("select * from highscores where name = :name");

        $statement->bindParam(':name', $name);

        $statement->execute();

        // test if the user was found
        if ($statement->rowCount() == 1) {
            // create the result and return it
            $row = $statement->fetch();
            $res = array();
            
            $res['name'] = $row['name'];
            $res['score'] = (int)$row['score'];
            $res['time_stamp'] = $row['time_stamp'];

            return $res;
        }
        return NULL;
    }
}

// test the connection
/* try { */
/*     $db = Database::getInstance(); */

/*     $scores = $db->getScores(10, 0); */
/*     print_r($scores); */
/* } catch (PDOException $e) { */
/*     echo 'Connection failed: '.$e->getMessage(); */
/* } */