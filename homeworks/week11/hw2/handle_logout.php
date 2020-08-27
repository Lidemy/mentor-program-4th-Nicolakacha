<?php
  session_start();
  session_destroy();
  setcookie("CSRFToken", "", time() -3600, "/");
  header('Location: index.php');
?>
