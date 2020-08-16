<?php
  //啟用 session
  session_start();
  //連線資料庫
  require_once('conn.php');

  //取得 POST 來的註冊資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  //判斷註冊有沒有填寫
  if (
    empty($nickname) || 
    empty($username) || 
    empty($password)
  ) {
    header('Location: register.php?errorCode=1');
    die();
  }

  //把資料寫回去 users table
  $sql = sprintf(
    'INSERT INTO nicolakacha_users(nickname, username, password) VALUES("%s", "%s", "%s")',
    $nickname,
    $username,
    $password
  );
  $result = $conn->query($sql);

  //如果有 result，判斷是否重複，重複則顯示提醒
  if(!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header('Location: register.php?errorCode=2');      
    }
    die($conn->error);
  }
  $_SESSION['username'] = $username;
  header('Location: index.php');
?>