<?php

	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require '../vendor/autoload.php';

	
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

	$configuration = [
	    'settings' => [
	        'displayErrorDetails' => true,
	    ],
	];
	$c = new \Slim\Container($configuration);

	$app = new Slim\App($c);

	// $app->add(new \terwey\SlimSwagger(array(), array('baseDir' => __DIR__.'/../src/api/')));

	// $app->group('/api', function () use ($app) {
		$app->get('/api/users', 'getAllUsers');
		$app->get('/api/users/{userdata}', function($request, $response, $args) {
		    getUser($args['userdata']);
		});
		$app->post('/users', function($request, $response, $args) {
		    addUser($request->getBody());//Request object’s <code>getParsedBody()</code> method to parse the HTTP request 
		});
	// })


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
	        echo json_encode($users);
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
		    	echo json_encode($user);
		    }else{
		    	$response['status'] = 'error';
		    	$response['message'] = 'User does not exist';
	            echo json_encode($response);;
		    }
	}

	function addUser($data) {
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
			$createUser = $db->prepare('INSERT INTO personal(username,email,password) VALUES(:username, :email, :password)');
			$createUser->bindParam("username", $user->username);
	        $createUser->bindParam("email", $user->email);
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