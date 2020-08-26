<?php
  session_start();
  require_once('inc/conn.php');
  require_once('inc/utils.php');
  $CSRFToken = $_POST['CSRFToken'];
  if(empty($_POST['content'])) {
    header('Location: update_comment.php?errorCode=1&id='. $_POST['id'] . '&CSRFToken=' . $CSRFToken);
    die();
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $role = $user['role'];
  $id = $_POST['id'];
  $content = $_POST['content'];
  if ($username == 'admin' || $role == '2') {
    $sql = "UPDATE nicolakacha_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = "UPDATE nicolakacha_comments SET content=? WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");
?>
