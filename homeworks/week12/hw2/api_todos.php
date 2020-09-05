<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['userID'])) {
    $json = [
      'message' => 'no todos.'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }
  $userID = $_GET['userID'];
  $sql = "SELECT * FROM nicolakacha_todos WHERE userID=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $userID);
  $result = $stmt->execute();
  if(!$result) {
    $json = [
      'ok' => false, 
      'message' => $conn->error
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $todos = [];
  $row = $result->fetch_assoc();
  array_push($todos, ['userID' => $row['userID'], 'todos' => $row['todos'],]);

  $json = [
    'ok' => true, 
    'todos' => $todos
  ];
  $response = json_encode($json);
  echo $response;
?>