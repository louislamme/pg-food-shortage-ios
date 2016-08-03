<?php

	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require 'vendor/autoload.php';

	//development
	function getConnection() {
	    $dbhost="127.0.0.1";
	    $dbuser="root";
	    $dbpass="";
	    $dbname="305cde";
	    $tbmember="personal";
	    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    return $dbh;
	}

	//production
	// function getConnection() {
	//     $dbhost="localhost";
	//     $dbuser="louisla1__vtc";
	//     $dbpass="Fv3NN]?ErAT{";
	//     $dbname="louisla1_vtc_mordern_web";
	//     $tbmember="members";
	//     $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	//     $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//     return $dbh;
	// }
	$configuration = [
	    'settings' => [
	        'displayErrorDetails' => true,
	    ],
	];
	$c = new \Slim\Container($configuration);

	$app = new Slim\App($c);

	$app->get('/users', 'getAllUsers');
	$app->get('/users/{userdata}', function($request, $response, $args) {
	    getUser($args['userdata']);
	});
	$app->post('/register', function($request, $response, $args) {
	    register($request->getBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
	});
	$app->post('/login', function($request, $response, $args) {
	    login($request->getBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
	});
	$app->post('/rpassword', function($request, $response, $args) {
	    resetPassword($request->getBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
	});
	$app->post('/update', function($request, $response, $args) {
	    update($request->getBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
	});
	// $app->put('/update_employee', function($request, $response, $args) {
	//     update_employee($request->getParsedBody());
	// });
	// $app->delete('/delete_employee', function($request, $response, $args) {
	//     delete_employee($request->getParsedBody());
	// });
	$app->run();

	 
	function getAllUsers() {
	    $sql = "SELECT * FROM personal ORDER BY id";
	    try {
	        $db = getConnection();
	        $stmt = $db->prepare($sql);
	        $stmt->execute();
	        // $users = $stmt->fetchObject();
	        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
	        $db = null;
	        $response['status'] = 'success';
					// $response['title'] = 'Login success';
					// $response['message'] = 'Login successfully';
					$response['users'] = $users;
		    	echo json_encode($response);
	    } catch(PDOException $e) {
	        echo '{"error":{"text":'. $e->getMessage() .'}}';
	    }
	}

	function getUser($userdata) {
		$sql = "SELECT * FROM personal WHERE `id` = '$userdata' OR `username` = '$userdata' OR `email` = '$userdata'";
	    	$db = getConnection();
		    $stmt = $db->prepare($sql);
		    $stmt->execute();
		    $user = $stmt->fetchAll(PDO::FETCH_OBJ);
		    $db = null;
		    if($user){
					$response['status'] = 'success';
					$response['user'] = $user;
		    	echo json_encode($response);
		    }else{
		    	$response['status'] = 'error';
		    	$response['message'] = 'User does not exist';
          echo json_encode($response);;
		    }
	}


	function login($data) {
	    // $request = Slim::getInstance()->request();
	    $user = json_decode($data);
	    // var_dumb($user);

	    $db = getConnection();
	    $checkUser = $db->prepare('SELECT * FROM personal WHERE username=:username AND password=:password');
		$checkUser->bindParam("username", $user->username);
        $checkUser->bindParam("password", $user->password);
  		$checkUser->execute();
  		$data = $checkUser->fetch();
	    if ($checkUser->rowCount() == 1) {
			$response['status'] = 'success';
			$response['title'] = 'Login success';
			$response['message'] = 'Login successfully';
			$response['info'] = $data;
		}else{
			$response['status'] = 'error';
			$response['title'] = 'Login Fail';
			$response['message'] = 'The username and password you entered do not match.';
		}
		echo json_encode($response);
	}

	function update($data) {
	    // $request = Slim::getInstance()->request();
	    $user = json_decode($data);
	    // var_dumb($user);

	    $db = getConnection();
	    // $checkUser = $db->prepare('SELECT * FROM personal WHERE username=:username AND password=:password');
	    $updatePassword = $db->prepare('UPDATE personal SET username=:nusername, email=:email, gender=:gender WHERE username=:ousername AND password=:password');
		$updatePassword->bindParam("nusername", $user->nusername);
		$updatePassword->bindParam("ousername", $user->ousername);
        $updatePassword->bindParam("email", $user->email);
        $updatePassword->bindParam("gender", $user->gender);
        $updatePassword->bindParam("password", $user->password);
  		$updatePassword->execute();
  		// $result = $updatePassword->fetch();
	    if ($updatePassword->rowCount() == 1) {
			$response['status'] = 'success';
			$response['title'] = 'Info Updated';
			$response['message'] = 'Your basic info is updated successfully.';
		}else{
			$response['status'] = 'error';
			$response['title'] = 'Update Fail';
			$response['message'] = 'Your basic info update failed.';
		}
		echo json_encode($response);
	}

	function resetPassword($data) {
	    // $request = Slim::getInstance()->request();
	    $user = json_decode($data);
	    // var_dumb($user);

	    $db = getConnection();
	    // $checkUser = $db->prepare('SELECT * FROM personal WHERE username=:username AND password=:password');
	    $updatePassword = $db->prepare('UPDATE personal SET password=:npassword WHERE username=:username AND password=:opassword');
		$updatePassword->bindParam("username", $user->username);
        $updatePassword->bindParam("npassword", $user->npassword);
        $updatePassword->bindParam("opassword", $user->opassword);
  		$updatePassword->execute();
  		// $result = $updatePassword->fetch();
	    if ($updatePassword->rowCount() == 1) {
			$response['status'] = 'success';
			$response['title'] = 'Password Changed';
			$response['message'] = 'Your password is updated successfully.';
		}else{
			$response['status'] = 'error';
			$response['title'] = 'Reset Fail';
			$response['message'] = 'The password you entered is not correct.';
		}
		echo json_encode($response);
	}

	function register($data) {
	    // $request = Slim::getInstance()->request();
	    $user = json_decode($data);
	    // var_dumb($user);

	    $db = getConnection();
	    $checkUser = $db->prepare('SELECT * FROM personal WHERE email=:email');
  		$checkUser->bindParam("email", $user->email);
  		$checkUser->execute();

	    if ($checkUser->rowCount() >= 1) {
			$response['status'] = 'fail'; // email exist
			$response['title'] = 'Registration Fail';
			$response['message'] = 'This email is used for registration.<br/>Please go to login page or try another email.';
		}else{
			$createUser = $db->prepare('INSERT INTO personal(username,email,gender,password) VALUES(:username, :email, :gender, :password)');
			$createUser->bindParam("username", $user->username);
	        $createUser->bindParam("email", $user->email);
	        $createUser->bindParam("gender", $user->gender);
	        $createUser->bindParam("password", $user->password);
			$createUser->execute();
			$user->id = $db->lastInsertId();
	        $db = null;
	  
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
		echo json_encode($response);
	}


	



 	// $app->run();
?>