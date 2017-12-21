<?php

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