<?php
  require_once('inc/conn.php');

  if (!empty($_POST['CSRFToken'])) {
    $CSRFToken = $_POST['CSRFToken'];
    if ($CSRFToken != $_COOKIE['CSRFToken']) {
      die('You bad bad!');
    }
  } else {
    die('You bad bad!');
  }

  if (empty($_POST['id'])) {
    header(index.php);
    die;
  }
  $id = $_POST['id'];

  $stmt = $conn->prepare("UPDATE nicolakacha_blog_articles SET is_deleted=1 WHERE id=?");
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!result) {
    die($conn->$error);
  }
  header('Location: admin.php');
?>