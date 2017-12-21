<?php

require_once(__DIR__.'/Database.class.php');

/**
 * Creates a token for a given $user object.
 * The $user is specified the following way:
 *
 * $user['name'] = name
 * $user['email'] = mail
 * $user['pw'] = hashed pw
 *
 */
function createToken($user) {
    // first concatenate the fields and add a random number
    $token = $user['name'].$user['email'].$user['pw'].rand();

    // return the hash of this string
    return hash("sha256", $token);
}

/**
 * Checks if the token a user provided is valid.
 *
 * @return The object describing the user or false if the authentication failed.
 */
function authenticate($token) {
    // create a database connection
    $db = Database::getInstance();

    // try to retrieve the user name
    $username = $db->getNameByToken($token);
    if (!$username) {
        return false;
    }

    // return the user object that corresponds to the name
    return $db->getUserInfo($username);
}
