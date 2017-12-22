<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// include the necessary files
require('lib/Database.class.php');
require('lib/requests.php');
require('lib/tokens.php');


// check if it is a POST request (see specifications for register)
if (!strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') == 0) {
    // not a POST request, nothing to do
    sendResponse(1, null);
    exit;
}

// now get the contents of the request
$requestContent = fetchContents('POST');

// test if all necessary parameters are set to register a new
// user
if (isset($requestContent['email']) && isset($requestContent['name']) && isset($requestContent['pw'])) {
    // first create a database connection
    $db = Database::getInstance();

    // create a temporary user object
    $user = array();

    // filter the values
    $user['email'] = filter_var($requestContent['email'], FILTER_SANITIZE_EMAIL);
    $user['name'] = filter_var($requestContent['name'], FILTER_SANITIZE_SPECIAL_CHARS);
    $pw = filter_var($requestContent['pw'], FILTER_UNSAFE_RAW);
    
    // hash the password
    $user['pw'] = password_hash($pw, PASSWORD_DEFAULT);

    // add the user to the database
    if (!$db->addUser($user)) {
        // adding the user did not work, so terminate the script
        sendResponse(1, null);
        exit;
    }

    // create the token for the user
    $token = createToken($user);

    // update the token
    if ($db->setToken($user['name'], $token)) {
        // create the JSON response and terminate the script
        sendResponse(0, $token);
        exit;
    }
    sendResponse(1, null);
    exit;
}

// if this area is reached, registering did not work
sendResponse(1, null);

// sends a response to the user
function sendResponse($status, $token) {
    $response = array();
    $response['token'] = $token;
    $response['status'] = $status;
    echo json_encode($response);
}