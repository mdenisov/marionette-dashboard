<?php

$app->get('/user/login/:login/:password', 'login');
$app->get('/user/logout', 'logout');
$app->get('/user/:id', 'getUser');
$app->put('/user/:id', 'updateUser');
$app->post('/user', 'addUser');
$app->delete('/user/:id',  'deleteUser');
$app->get('/user/list',  'getUsers');

function login ($email, $password) {
    $app = \Slim\Slim::getInstance();

    if ($email && $password) {
        $sql = "select * FROM users WHERE email=:email AND password=:password";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $email);
            $stmt->bindParam("password", md5(md5(trim($password))));
            $stmt->execute();
            $user = $stmt->fetchObject();
            $db = null;

            if ($user) {
                unset($user->password);
                echo json_encode($user);
            } else {
//                $app->halt(401, 'login or password is incorrect');
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

function updateUser($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $user = json_decode($body);
    $sql = "UPDATE users SET name=:name WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $user->name);
//            $stmt->bindParam("rights", $user->rights);
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

function addUser() {
    $request = \Slim\Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $sql = "INSERT INTO users (email, name, role, photo) VALUES (:email, :name, :role, :photo)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $user->email);
        $stmt->bindParam("name", $user->name);
        $stmt->bindParam("role", $user->role);
        $stmt->bindParam("photo", $user->photo);
        $stmt->execute();
        $user->id = $db->lastInsertId();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
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

?>