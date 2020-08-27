<?php
require_once('inc/conn.php');
$title = $_POST['title'];
$content = $_POST['content'];

if (!empty($_POST['CSRFToken'])) {
  $CSRFToken = $_POST['CSRFToken'];
  if ($CSRFToken != $_COOKIE['CSRFToken']) {
    die('You bad bad!');
  }
} else {
  die('You bad bad!');
}


if (!empty($_POST['id'])) {
  $id = $_POST['id'];
}


if (empty($title) || empty($content)) {
  if (!empty($id)) {
    header('Location: edit.php?id='. $id .'&errorCode=1');
    die();
  }
    header('Location: edit.php?errorCode=1');
    die();
}

if (!empty($id)) {
  $stmt = $conn->prepare("UPDATE nicolakacha_blog_articles SET title=?, content=? WHERE id=?");
  $stmt->bind_param('ssi', $title, $content, $id);
} else {
  $stmt = $conn->prepare("INSERT INTO nicolakacha_blog_articles(title, content) VALUES (?, ?)");
  $stmt->bind_param('ss', $title, $content);
}

$result = $stmt->execute();
if (!result) {
  die($conn->$error);
}
header('Location: admin.php');

?>