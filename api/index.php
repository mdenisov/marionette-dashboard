<?php

    require 'Slim/Slim.php';
    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();

    $app->get('/login/:login/:password', 'authenticate');
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

    function authenticate ($email, $password) {
        if ($email && $password) {
            $sql = "select * FROM users WHERE email=:email AND password=:password";
            try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("email", $email);
                $stmt->bindParam("password", $password);
                $stmt->execute();
                $user = $stmt->fetchObject();
                $db = null;
                echo json_encode(array("user" => $user));
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {
            echo '{"error":{"text": login and password required}}';
        }
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