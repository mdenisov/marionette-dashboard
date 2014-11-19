<?php

session_cache_limiter(false);
//session_start();

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array(
    'cookies.encrypt' => false,
    'cookies.lifetime' => '60 minutes',
    'cookies.path' => '/',
    'cookies.domain' => null,
    'cookies.secure' => false,
    'cookies.httponly' => false,
    // Encryption
    'cookies.secret_key' => 'dashboard',
));

$app->add(new \Slim\Middleware\SessionCookie(array(
        'expires' => '30 minutes',
        'path' => '/',
        'secret' => 'dashboard',
        'domain' => null,
        'secure' => false,
        'cipher' => MCRYPT_RIJNDAEL_256,
        'cipher_mode' => MCRYPT_MODE_CBC
)));


$authenticate = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['user'])) {
            $_SESSION['urlRedirect'] = $app->request()->getPathInfo();
            $app->deleteCookie('accessToken');
            $app->halt(401, 'Login required');
        }
    };
};

$app->hook('slim.before.dispatch', function() use ($app) {
        $user = null;
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $app->setCookie('accessToken', md5(trim($user)));
        }
    }
);



// Database config
require 'include/db.php';

// Routes
require 'include/user.php';




$app->run();

?>