<?php
  require_once('inc/utils.php');
  session_start();
?>

<?php include_once('inc/header.php')?>

  <div class="login-wrapper">
    <h2>Login</h2>
    <form action="handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <h3 class="remind">
        <?php checkValidLogin(); ?>
      </h3>
      <input class='login-btn' type='submit' value="登入" />
    </form>
     
  </div>
</body>
</html>
