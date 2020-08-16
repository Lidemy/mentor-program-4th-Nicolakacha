<?php
  //啟用 session
  session_start();
  //引入連線和功能的 .php
  require_once('conn.php');
  require_once('utils.php');
  // 把 comments table 的資料撈出來
  $result = $conn->query('SELECT * FROM nicolakacha_comments ORDER BY id DESC');
  if(!$result) {
    die($conn->error);
  }
  // 檢查登入狀態，若有登入則把 users table 的資料拿出來
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Board</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>

  <main class="board">
    <!-- 判斷登入狀態顯示不同的按鈕和內容 -->
    <nav>
      <?php if (!$username) { ?>
        <a href="login.php" class="nav_btn">Login</a>
        <a href="register.php" class="nav_btn">Join free</a>
      <?php } else { ?>
        <a href="logout.php" class="nav_btn">Logout</a>
      <?php } ?>
    </nav>
    <div class="theme-switch-wrapper">
        <i class="toggle-icon fa fa-sun-o" aria-hidden="true"></i>
        <label class="theme-switch">
            <input type="checkbox">
            <div class="slider round"></div>
        </label>
    </div>
    <h1 class="board__title"><i class="fa fa-commenting-o" aria-hidden="true"></i> Boarddd</h1>

    <!-- 檢查登入狀態以顯示相應的歡迎訊息-->
    <div class="board__welcome-message">
      <?php if ($username) { ?>
        <?php echo '<h2>Hi! ' . $user['nickname'] . '</h2>'; ?>
      <?php } else {?>
        <?php 
          echo '<h2>The best board in the world!</h2>';
          echo '<p>Please login or create an account.';
        ?>
      <?php } ?>
    </div>
    
    <div class="board__form">
      <?php if($username) { ?>
        <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
          <textarea name="content" rows="5" maxlength="200"></textarea>
          <div class="submit">
            <button class="submit_btn" type="submit">POST</button>
            <?php
              if (!empty($_GET['errorCode'])) {
              $code = $_GET['errorCode'];
              $msg = 'Error';
              if ($code === '1') {
              $msg = 'Hey! Write Something';
              }
              echo '<p class=remind>' . $msg . '</p>';
              }          
            ?>
          </div>
        </form>
      <?php } ?>
    </div>

      <div class="board__hr"></div>
      <section>
        <?php while($row = $result->fetch_assoc()) { ?>
            <div class="card">
              <div class="card__avatar"></div>
              <div class="card__body">
                  <div class="card__info">
                    <span class="card__author">
                      <?php echo escape($row['nickname']) ?> 
                    </span>
                    <span class="card__time">
                      <?php  echo escape($row['created_at']); ?>                     
                    </span>
                  </div>
                  <p class="card__content">
                  <?php echo escape($row['content']) ?>
                  </p>
              </div>
            </div>          
        <?php } ?>
      </section>
  </main>
  <script src="script.js"></script>
</body>
</html>

