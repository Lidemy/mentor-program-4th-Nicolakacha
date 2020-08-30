<?php
require_once('inc/conn.php');
$title = $_POST['title'];
$content = $_POST['content'];
$category_id = $_POST['category_id'];

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
    header('Location: edit_article.php?id='. $id .'&errorCode=1');
    die();
  }
    header('Location: edit_article.php?errorCode=1');
    die();
}

if (!empty($id)) {
  $stmt = $conn->prepare("UPDATE nicolakacha_blog_articles SET title=?, content=?, category_id =? WHERE id=?");
  $stmt->bind_param('ssii', $title, $content, $category_id, $id);
} else {
  $stmt = $conn->prepare("INSERT INTO nicolakacha_blog_articles(title, content, category_id) VALUES (?, ?, ?)");
  $stmt->bind_param('ssi', $title, $content, $category_id);
}

$result = $stmt->execute();
if (!result) {
  die($conn->$error);
}
header('Location: admin.php');

?>