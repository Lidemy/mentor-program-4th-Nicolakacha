<?php
  session_start();
  require_once('inc/conn.php');

  $nickname = trim($_POST['nickname']);
  $username = trim($_POST['username']);
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role = 1;

  if (
    empty($nickname) || 
    empty($username) ||
    empty($_POST['password'])
  ) {
    header('Location: register.php?errorCode=1');
    die();
  }

  $sql = 'INSERT INTO nicolakacha_users(nickname, username, password, role) VALUES(?, ?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssss', $nickname, $username, $password, $role);
  $result = $stmt->execute();

  if(!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header('Location: register.php?errorCode=2');      
    }
    die($conn->error);
  }
  $_SESSION['username'] = $username;
  header('Location: index.php');
?>
