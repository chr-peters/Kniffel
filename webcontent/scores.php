<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// include the necessary files
require('lib/Database.class.php');
require('lib/requests.php');
require('lib/tokens.php');

// check if it is a GET request (see specifications for scores)
if (strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') == 0) {

    // now get the contents of the request
    $requestContent = fetchContents('GET');

    // test if the parameters limit and offset are given, in this case all scores are requested
    if (isset($requestContent['limit']) && isset($requestContent['offset'])) {
        // all scores are requested, so fetch them and echo them as JSON

        // first create a database connection
        $db = Database::getInstance();

        // filter the values of limit and offset to prevent SQL injections
        $limit = filter_var($requestContent['limit'], FILTER_SANITIZE_NUMBER_INT);
        $offset = filter_var($requestContent['offset'], FILTER_SANITIZE_NUMBER_INT);
    
        // now get the result in the specified format
        $result = array();
        $result['records'] = $db->getScores($limit, $offset);

        // create a json object from the result
        $output = json_encode($result);

        // send the output and terminate the script
        echo $output;
        exit;
    }
    // test if the name of a user is given, in this case return the corresponding record
    if (isset($requestContent['name'])) {

        // create db connection
        $db = Database::getInstance();

        // filter the value of name to prevent SQL injections
        $name = filter_var($requestContent['name'], FILTER_SANITIZE_SPECIAL_CHARS);

        // now get the result
        $result = $db->getScoreRecord($name);

        // create a json object from the result
        $output = json_encode($result);

        // send the output and terminate the script
        echo $output;
        exit;
    }
} else if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') == 0){
    // it is a post request, so set the score for the user

    // now get the contents of the request
    $requestContent = fetchContents('POST');

    // test if the required parameters are given
    if (isset($requestContent['token']) && isset($requestContent['score'])) {

        // connect to the database
        $db = Database::getInstance();

        // filter the values
        $score = (int)filter_var($requestContent['score'], FILTER_SANITIZE_NUMBER_INT);
        $token = filter_var($requestContent['token'], FILTER_UNSAFE_RAW);

        // try to authenticate the user
        $user = authenticate($token);
        if (!$user) {
            // wrong token
            sendResponse(1);
            exit;
        }

        // now get the current score
        $record = $db->getScoreRecord($user['name']);

        // only update the score if it is greater than the current score
        if ($record!==NULL && $score < $record['score']) {
            sendResponse(1);
            exit;
        }

        // update the new score
        if (!$db->setScore($user['name'], $score)) {
            sendResponse(1);
            exit;
        }

        // send a response
        sendResponse(0);
        exit;
    }
}

function sendResponse($code) {
    $response = array();
    $response['status'] = $code;
    echo json_encode($response);
}
