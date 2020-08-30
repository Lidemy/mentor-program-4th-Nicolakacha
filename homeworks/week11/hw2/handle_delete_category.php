<?php
  require_once('inc/conn.php');
  require_once('inc/utils.php');

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
  echo $id;
  $number = countArticles($id);
  echo $number;
  if ($number != 0) {
    echo "hahaha";
    header('Location: admin_categories.php?errorCode=2');
    die();
  } else {
    $stmt = $conn->prepare("DELETE FROM nicolakacha_blog_categories WHERE id=?");
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if (!result) {
      die($conn->$error);
    }
    header('Location: admin_categories.php');
  }
?>