<?php
  //啟用 session
  session_start();
   //引入連線和功能的 php
  require_once('conn.php');
  require_once('utils.php');

  //從 session 拿到 username，再透過 getUserFromUsername 函式拿到 users table 的資料
  $user = getUserFromUsername($_SESSION['username']);
  $nickname = $user['nickname'];
  $content = $_POST['content'];

  //判斷有沒有 content
  if(empty($content)) {
    header('Location: index.php?errorCode=1');
    die();
  }

  //把資料寫回去 comments table
  $sql = sprintf(
    'INSERT INTO nicolakacha_comments(nickname, content) VALUES("%s", "%s")',
    $nickname,
    $content
  );
  $result = $conn->query($sql);
  
  //錯誤處理，如果有成功則導回 index.php，不成功則印出錯誤資訊
  if(!$result) {
    die($conn->error);
  }
  header('Location: index.php');
?>