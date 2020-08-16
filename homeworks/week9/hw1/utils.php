<?php
  require_once("conn.php");

  //getUserFromUsername
  function getUserFromUsername($username) {
    //在 function 裡面用 $conn 要特別做 global 宣告
    global $conn;
    $sql = sprintf(
      'SELECT * FROM nicolakacha_users WHERE username = "%s"',
       $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  };

  //保護輸入被解讀成純字串
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>