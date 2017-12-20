<?php

/**
 * Fetches the JSON contents of a request and converts them to a php object.
 *
 * @param requestMethod A string describing the request method, namely 'GET', 'POST', 'PUT', ...
 *
 * @return An associative array describing the JSON object or NULL if the operation was not successful.
 */
function fetchContents($requestMethod) {
    if (isAjax()) {
        if(strcasecmp($_SERVER['REQUEST_METHOD'], $requestMethod) == 0){
            $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
            if(strcasecmp($contentType, 'application/json') == 0){
                $content;

                // treat GET and POST differently
                if(strcasecmp($requestMethod, 'GET')==0) {
                    $content = key($_GET);
                } else {
                    $content = trim(file_get_contents("php://input"));
                }
                $result = json_decode($content, true);
                    
                return $result;
            }
        }
    }
    return NULL;
}

/**
 * This function checks if the call has been performed using ajax.
 * It is taken from a code snippet of V.Sander.
 */
function isAjax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}