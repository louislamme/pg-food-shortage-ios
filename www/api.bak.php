<?php

	header('Content-type: application/json');

	define('DBhost', 'localhost');
	define('DBuser', 'louisla1__vtc');
	define('DBPass', 'Fv3NN]?ErAT{');
	define('DBname', 'louisla1_vtc_mordern_web');

	try{
		$DB_con = new PDO("mysql:host=".DBhost.";dbname=".DBname,DBuser,DBPass);
	}catch(PDOException $e){
		die($e->getMessage());
	}

	$method = $_SERVER['REQUEST_METHOD'];
	//echo $method;


	switch ($method){
		case 'POST':
		$username = $_POST['username'];
		$email = $_POST['email'];
		$password = $_POST['password'];
  		$checkUser = $DB_con->prepare('SELECT * FROM members WHERE email=:email');
  		$checkUser->bindParam(':email', $email);
  		$checkUser->execute();
  		if ($checkUser->rowCount() >= 1) {
			$response['status'] = 'fail'; // email exist
			$response['title'] = 'Registration Fail';
			$response['message'] = 'This email is used for registration.<br/>Please go to login page or try another email.';
		}else{
			$createUser = $DB_con->prepare('INSERT INTO members(username,email,password) VALUES(:username, :email, :password)');
			$createUser->bindParam(':username', $username);
			$createUser->bindParam(':email', $email);
			$createUser->bindParam(':password', $password );
			$createUser->execute();
	  
	        if ($createUser->rowCount() == 1) {
				$response['status'] = 'success';
				$response['title'] = 'Register success';
				$response['message'] = 'New user created successfully';
	        } else {
				$response['status'] = 'error';
				$response['title'] = 'Registration Fail';
				$response['message'] = 'Unknown error occur, please try again later.';
	        }
		}
		break;
	}

	echo json_encode($response);
?>