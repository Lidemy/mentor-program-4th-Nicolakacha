<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boarddd</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>

  <main class="board simple">
    <nav>
      <a href="index.php" class="nav_btn">Boarddd</a>
      <a href="login.php" class="nav_btn">Login</a>
    </nav>

    <div class="theme-switch-wrapper">
        <i class="toggle-icon fa fa-sun-o" aria-hidden="true"></i>
        <label class="theme-switch">
            <input type="checkbox">
            <div class="slider round"></div>
        </label>
    </div>

      <h1 class="board__title"><i class="fa fa-commenting-o" aria-hidden="true"></i> Boarddd</h1>

      <div class="board__welcome-message">
        <h2>Get an account now!</h2>
      </div>


      <form method="POST" action="handle_register.php">
        <div class="board__row">
            <span>Nickname &nbsp;</span>
            <input type="text" name="nickname" maxlength="25"/>
        </div>
        <div class="board__row">
            <span>Username &nbsp;</span>
            <input type="text" name="username" maxlength="25"/>
        </div>
        <div class="board__row">
            <span>Password &nbsp;&nbsp; </span>
            <input type="password" name="password" maxlength="25"/>
        </div>
        <div class="submit">
          <button class="submit_btn" type="submit">Sign Up</button>
          <!-- 註冊資料重複或不完整時出現提醒 -->
          <?php
            if (!empty($_GET['errorCode'])) {
              $code = $_GET['errorCode'];
              $msg = 'Error';
              if ($code === '1') {
                $msg = 'Oh! You forget something? (σﾟ∀ﾟ)σﾟ∀ﾟ)σﾟ';
              } else if ($code === '2') {
                $msg = 'Sorry, this username has already been used...';
              }
              echo '<p class=remind>' . $msg . '</p>';
            }          
          ?>
        </div>
      </form>
  </main>
  <script src="script.js"></script>
</body>
</html>

