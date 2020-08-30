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

$category = $_POST['category'];
if (!empty($_POST['id'])) {
  $id = $_POST['id'];
}

if (empty($category)) {
  header('Location: admin_categories.php?errorCode=1');
  die();
}

if (!empty($id)) {
  $stmt = $conn->prepare("UPDATE nicolakacha_blog_categories SET category=? WHERE id=?");
  $stmt->bind_param('si', $category, $id);
} else {
  $stmt = $conn->prepare("INSERT INTO nicolakacha_blog_categories(category) VALUES (?)");
  $stmt->bind_param('s', $category);
}

$result = $stmt->execute();
if (!result) {
  die($conn->$error);
}
if(!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header('Location: admin_categories.php?errorCode=3');      
  }
  die($conn->error);
}
header('Location: admin_categories.php');

?>