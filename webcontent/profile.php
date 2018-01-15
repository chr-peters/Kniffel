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
    sendResponse(1);
    exit;
}


// now get the contents of the request
$requestContent = fetchContents('POST');

// first create a database connection
$db = Database::getInstance();
// test if all necessary parameters are set to login the user
if (isset($requestContent['profile']) && isset($requestContent['token'])) {
    // filter the given inputs
    $profile = filter_var($requestContent['profile'], FILTER_SANITIZE_SPECIAL_CHARS);
    $token = $requestContent['token'];

    // retrieve the user object from the database
    $username = $db->getNameByToken($token);
    $db->setProfile($username, $profile);
    exit;
}

if (isset($requestContent['searchFor'])) {
    // filter the given inputs
    $username = filter_var($requestContent['searchFor'], FILTER_SANITIZE_SPECIAL_CHARS);

    // retrieve the user object from the database
    $user = $db->getProfile($username);
    if (!$user) {
        // wrong user name
        sendResponse(1);
        exit;
    }

    sendResponse(0);
    exit;
}

// sends a response to the user
function sendResponse($status) {
    $response = array();
    $response['status'] = $status;
    echo json_encode($response);
}