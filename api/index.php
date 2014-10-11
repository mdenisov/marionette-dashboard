<?php

    session_cache_limiter(false);
    session_start();

    require 'Slim/Slim.php';

    \Slim\Slim::registerAutoloader();

    $app = new \Slim\Slim(array(
        'expires' => '20 minutes',
        'cookies.path' => '/',
        'cookies.secret_key' => 'dashboard'
    ));

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

    $app->get('/test', 'test');

    $app->get('/login/:login/:password', 'login');
    $app->get('/logout', 'logout');
    $app->get('/users', 'getUsers');
    $app->get('/users/:id', 'getUser');
    $app->post('/users', 'addUser');
    $app->put('/users/:id', 'updateUser');
    $app->delete('/users/:id',  'deleteUser');

    $app->run();

    function getConnection() {
        $dbhost="127.0.0.1";
        $dbuser="root";
        $dbpass="";
        $dbname="dashboard";
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    function test () {
        var_dump(session_id());
    }

    function login ($email, $password) {
        if ($email && $password) {
            $app = \Slim\Slim::getInstance();
            $sql = "select * FROM users WHERE email=:email AND password=:password";
            try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("email", $email);
                $stmt->bindParam("password", md5(md5(trim($password))));
                $stmt->execute();
                $user = $stmt->fetchObject();
                $db = null;

//                $app->setEncryptedCookie('accessToken', md5($email));
//                $_SESSION['accessToken'] = md5($email);
                $app->setCookie('accessToken', md5($email));

                if ($user) {
                    unset($user->password);
                    echo json_encode(array("user" => $user));
                } else {
                    echo '{"error":{"text": login or password is incorrect}}';
                }
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo '{"error":{"text": login and password required}}';
        }
    }

    function logout () {
        $app = \Slim\Slim::getInstance();
        $app->deleteCookie('accessToken');
        session_destroy();
        session_unset();

        echo '{}';
    }

    function getUsers() {
        $sql = "select * FROM users ORDER BY id";
        try {
            $db = getConnection();
            $stmt = $db->query($sql);
            $users = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo '{"users": ' . json_encode($users) . '}';
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function getUser($id) {
        $sql = "SELECT * FROM users WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $user = $stmt->fetchObject();
            $db = null;
            echo json_encode($user);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function addUser() {
        $request = \Slim\Slim::getInstance()->request();
        $user = json_decode($request->getBody());
        $sql = "INSERT INTO users (email, rights) VALUES (:email, :rights)";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("rights", $user->rights);
            $stmt->execute();
            $user->id = $db->lastInsertId();
            $db = null;
            echo json_encode($user);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function updateUser($id) {
        $request = \Slim\Slim::getInstance()->request();
        $body = $request->getBody();
        $user = json_decode($body);
        $sql = "UPDATE users SET email=:email, rights=:rights WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $user->email);
            $stmt->bindParam("rights", $user->rights);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            echo json_encode($user);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    function deleteUser($id) {
        $sql = "DELETE FROM users WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

?>