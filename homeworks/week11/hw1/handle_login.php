<?php
  session_start();
  require_once('inc/conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    header('Location: login.php?errorCode=1');
    die();
  }

  $sql = "SELECT * FROM nicolakacha_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  
  if ($result->num_rows === 0) {
    header('Location: login.php?errorCode=2');
    exit();    
  }

  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header('Location: login.php?errorCode=2');
  }
?>
