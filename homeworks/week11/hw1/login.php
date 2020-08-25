<?php include('inc/header.php'); ?>
<?php require_once('inc/utils.php'); ?>

  <main class="board simple">
    <nav>
      <a href="index.php" class="nav_btn">Boarddd</a>
      <a href="register.php" class="nav_btn">Join free</a>
    </nav>

    <?php include('inc/theme.php'); ?>

    <div class="board__welcome-message">
      <h1 class="board__title"><i class="fa fa-commenting-o" aria-hidden="true"></i> Boarddd</h1>
      <h2>Log In</h2>
    </div>

    <form method="POST" action="handle_login.php">
      <div class="board__row">
        <span>Username &nbsp;</span><input type="text" name="username" maxlength="25"/>
      </div>

      <div class="board__row">
        <span>Password &nbsp;&nbsp; </span><input type="password" name="password" maxlength="25"/>
      </div>

      <div class="submit">
        <button class="submit_btn" type="submit">Log In</button>
        <?php checkValidLogin() ?>        
      </div>
    </form>
  </main>
  <script src="inc/script.js"></script>
  
<?php include('inc/footer.php'); ?>
