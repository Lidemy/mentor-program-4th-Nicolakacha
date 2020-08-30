<?php
  session_start();
  require_once('inc/conn.php');
  require_once('inc/utils.php');

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $role = $user['role'];

  if ($_POST["CSRFToken"] != $_COOKIE["CSRFToken"]) {
    die('You bad bad!');
  }

  $id = $_POST['id'];
  if(empty($_POST['id'])) {
    header('Location: index.php');
    die();
  }

  if ($username == 'admin' || $role == '2') {
    $sql = "UPDATE nicolakacha_comments SET is_deleted=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = "UPDATE nicolakacha_comments SET is_deleted=1 WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");
?>
