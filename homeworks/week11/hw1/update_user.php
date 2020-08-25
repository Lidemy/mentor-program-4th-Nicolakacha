<?php
  session_start();
  require_once('inc/conn.php');
  require_once('inc/utils.php');
  
  if(empty($_POST['nickname']) || trim($_POST['nickname']) == "") {
    header('Location: index.php?errorCode=1');
    die();
  }

  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];
 
  $sql = "UPDATE nicolakacha_users SET nickname=? WHERE username =?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>
