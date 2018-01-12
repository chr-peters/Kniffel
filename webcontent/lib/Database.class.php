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

        // test if any results are found
        if($statement->rowCount()>0) {
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
        return NULL;
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

    /**
     * Adds a user to the database.
     *
     * The user object is described by an associative array:
     *
     * $user['name'] = name
     * $user['email'] = email
     * $user['pw'] = password
     */
    public function addUser($user) {
        // create the statement
        $statement = $this->pdo->prepare("insert into users values(:name, :email, :pw)");

        $statement->bindParam(':name', $user['name']);
        $statement->bindParam(':email', $user['email']);
        $statement->bindParam(':pw', $user['pw']);

        return $statement->execute();
    }
    
    /**
     * Inserts a token into the database for a given username.
     */
    public function setToken($username, $token) {
        $statement = $this->pdo->prepare("insert into tokens values(:name, :token) on duplicate key update token = :token");

        $statement->bindParam(':name', $username);
        $statement->bindParam(':token', $token);

        return $statement->execute();
    }

    /**
     * Returns an associative array that represents the user given by the name $username
     *
     * @return The object or FALSE if the statement could not be executed.
     */
    public function getUserInfo($username) {
        $statement = $this->pdo->prepare("select * from users where name = :name");

        $statement->bindParam(':name', $username);

        if (!$statement->execute() || $statement->rowCount() == 0) {
            // either it did not work or the entry could not be found
            return false;
        }

        // create the object
        $row = $statement->fetch();
        $user = array();
        $user['name'] = $row['name'];
        $user['email'] = $row['email'];
        $user['pw'] = $row['pw'];
        return $user;
    }

    /**
     * Returns the username corresponding to a token or false
     * if an error occured.
     */
    public function getNameByToken($token) {
        $statement = $this->pdo->prepare("select name from tokens where token = :token");

        $statement->bindParam(':token', $token);

        if(!$statement->execute() || $statement->rowCount() == 0) {
            return false;
        }

        $row = $statement->fetch();
        return $row['name'];
    }
    
    /**
     * Sets the score of a user.
     */
    public function setScore($username, $score) {
        $statement = $this->pdo->prepare("insert into highscores(name, score) values(:name, :score) on duplicate key update score = :score, time_stamp = current_timestamp");

        $statement->bindParam(':name', $username);
        $statement->bindParam(':score', $score);

        return $statement->execute();
    }
}

// test the connection
/* try { */
/*     $db = Database::getInstance(); */

/*     $user = array(); */
/*     $user['name'] = 'Yoloswagger'; */
/*     $user['email'] = 'wasgehtab@test'; */
/*     $user['pw'] = password_hash('1234', PASSWORD_DEFAULT); */

/*     $db->addUser($user); */
/*  } catch (PDOException $e) { */
/*     echo 'Connection failed: '.$e->getMessage(); */
/* } */