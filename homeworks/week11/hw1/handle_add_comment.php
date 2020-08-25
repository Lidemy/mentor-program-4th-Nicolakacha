<?php
  session_start();
  require_once('inc/conn.php');
  require_once('inc/utils.php');
  
  $username = $_SESSION['username'];
  $content = trim($_POST['content']);
  
  if(empty($content)) {
    header('Location: index.php?errorCode=1');
    die();
  }

  $sql = "INSERT INTO nicolakacha_comments(username, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>
