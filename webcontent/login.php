<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// include the necessary files
require('lib/Database.class.php');
require('lib/requests.php');
require('lib/tokens.php');

// check if it is a POST request (see specifications for scores)
if (!strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') == 0) {
    // not a POST request, nothing to do
    sendResponse(1, null);
    exit;
}

// now get the contents of the request
$requestContent = fetchContents('POST');

// test if all necessary parameters are set to login the user
if (isset($requestContent['name']) && isset($requestContent['pw'])) {
    // first create a database connection
    $db = Database::getInstance();

    // filter the given inputs
    $username = filter_var($requestContent['name'], FILTER_SANITIZE_SPECIAL_CHARS);
    $pw = filter_var($requestContent['pw'], FILTER_UNSAFE_RAW);

    // retrieve the user object from the database
    $user = $db->getUserInfo($username);
    if (!$user) {
        // wrong user name
	sendResponse(1, null);
        exit;
    }

    // validate the password
    if (!password_verify($pw, $user['pw'])) {
        // wrong password
	sendResponse(1, null);
        exit;
    }

    // create a new token for the user
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

// if this area is reached, logging in did not work
sendResponse(1, null);

// sends a response to the user
function sendResponse($status, $token) {
    $response = array();
    $response['token'] = $token;
    $response['status'] = $status;
    echo json_encode($response);
}
