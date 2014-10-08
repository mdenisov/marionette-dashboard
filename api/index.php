<?php

    session_start(); // Add this to the top of the file

    if(!empty($_POST['method']) && $_POST['method'] == 'login') {

        if(!empty($_POST['email']) && !empty($_POST['password'])) {
            // normally you would load credentials from a database.
            // This is just an example and is certainly not secure
            if($_POST['email'] == 'admin@test.com' && $_POST['password'] == 'admin') {

                $user = array(
                    "email" => "admin@test.com",
                    "name" => "Maxim Denisov",
                    "role" => "admin",
                    "token" => "***fakeAccessToken***"
                );
                $_SESSION['user'] = $user;

                echo json_encode($user);

            } else {

                echo '{"error":{"text":"You shall not pass..."}}';

            }
        } else {

            echo '{"error":{"text":"Username and Password are required."}}';

        }

    }

?>