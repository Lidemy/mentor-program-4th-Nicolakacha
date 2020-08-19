<?php
  //啟用 session
  session_start();
  //重置 session
  session_destroy();
  //回到 index
  header('Location: index.php');
?>