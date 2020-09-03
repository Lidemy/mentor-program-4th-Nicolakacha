<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  function generateID() {
    $s = '';
    for ($i = 1; $i <= 10; $i++) {
      $s .= chr(rand(65, 90));
    }
    return $s;
  }

  if (empty($_POST['todos'])) {
    $json = [
      'ok' => false, 
      'message' => 'no todos.'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  } else {
     $todos = $_POST['todos'];
  }

  if (!empty($_POST['userID'])) {
    $userID = $_POST['userID'];
    $sql = "UPDATE nicolakacha_todos SET todos = ? WHERE userID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $todos, $userID);
    $result = $stmt->execute();
    $result ? $json = [
      'ok' => true, 
      'message' => 'Save successfully',
      'userID' => $userID]
       : $json = ['ok' => false, 'msg' => $conn->error];
    $response = json_encode($json);
    echo $response;
  } else {
    $userID = generateID();
    $sql = "INSERT INTO nicolakacha_todos(todos, userID) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $todos, $userID);
    $result = $stmt->execute();
    if ($result) {
      $result = $stmt->get_result();
      $json = ['ok' => true, 'userID' => $userID];
    } else {
      $json = ['ok' => false, 'msg' => $conn->error];
    }
    $response = json_encode($json);
    echo $response;
  }
?>
