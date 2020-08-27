<?php
session_start();
require_once('inc/conn.php');
require_once('inc/utils.php');

$username = $_POST['username'];
$password = $_POST['password'];

if (empty($username) || empty($password)) {
  header('Location: login.php?errorCode=1');
  die();
}

$sql = "SELECT * FROM nicolakacha_users WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();
if (!$result) {
  header('Location: login.php?errorCode=2');
  die($conn->error);
}
$result = $stmt->get_result();

$row = $result->fetch_assoc();
if (password_verify($password, $row['password'])) {
  if ($row['username'] != 'admin') {
    header('Location: login.php?errorCode=3');
    exit();
  }
  $_SESSION['username'] = $username;
  $CSRFToken = generateToken(10);
  setcookie("CSRFToken", $CSRFToken, time() + 3600 * 240, "/");
  header('Location: admin.php');
}
?>