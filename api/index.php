<?php

    session_start(); // Add this to the top of the file

    if(!empty($_GET['method']) && $_GET['method'] == 'login') {

        if(!empty($_POST['email']) && !empty($_POST['password'])) {
            // normally you would load credentials from a database.
            // This is just an example and is certainly not secure
            if($_POST['email'] == 'admin@test.com' && $_POST['password'] == 'admin') {

                $user = array(
                    "id" => 1,
                    "email" => "admin@test.com",
                    "name" => "Maxim Denisov",
                    "photo" => "assets/img/avatar.jpg",
                    "role" => "admin",
                    "token" => "***fakeAccessToken***"
                );
                $_SESSION['user'] = $user;

                echo json_encode(array("user" => $user));

            } else {

                echo '{"error":{"text":"You shall not pass..."}}';

            }
        } else {

            echo '{"error":{"text":"Username and Password are required."}}';

        }

    }

?>