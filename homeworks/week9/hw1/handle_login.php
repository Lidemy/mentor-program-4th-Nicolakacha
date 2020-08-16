<?php
  //啟用 session
  session_start();
  require_once('conn.php');

  //從 login.php 的 POST 取得 username 和 password
  $username = $_POST['username'];
  $password = $_POST['password'];

  //如果 username 或 password 沒有輸入，就導回 login.php 並顯示錯誤
  if (empty($username) || empty($password)) {
    header('Location: login.php?errorCode=1');
    die();
  }

  // 把拿到的 username 和 password 比對 users table
  $sql = sprintf(
    "SELECT * FROM nicolakacha_users WHERE username='%s' and password ='%s'",
    $username,
    $password
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  //如果有找到對應的資料，就把 username 存在 session 裡，導回 index.php
  if ($result->num_rows) {
    $_SESSION['username'] = $username;
    header('Location: index.php');      
  } else {
    //比對失敗，，導回 index.php，顯示出錯誤
    header('Location: login.php?errorCode=2');
    die($conn->error);
  }
?>