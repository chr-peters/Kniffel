<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// include the necessary files
require('lib/Database.class.php');
require('lib/requests.php');

// check if it is a GET request (see specifications for scores)
if (!strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') == 0) {
    // not a GET request, nothing to do
    exit;
}

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