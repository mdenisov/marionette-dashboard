<?php

session_cache_limiter(false);
session_start();

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->add(new \Slim\Middleware\SessionCookie(array(
    'expires' => '20 minutes',
    'path' => '/',
    'domain' => null,
    'secure' => false,
    'httponly' => false,
    'secret' => 'dashboard',
    'name' => 'accessToken',
    'cipher' => MCRYPT_RIJNDAEL_256,
    'cipher_mode' => MCRYPT_MODE_CBC
)));

// Database config
require 'include/db.php';

// Routes
require 'include/user.php';


$app->get('/test', 'test');

$app->run();

function test () {
    var_dump(session_id());
}










?>