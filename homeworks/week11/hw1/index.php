<?php
  session_start();
  require_once('inc/utils.php');
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  $user = getCurrentUser();
  if (!empty($_COOKIE["CSRFToken"])) {
    $CSRFToken = $_COOKIE["CSRFToken"];
  }
?>

<?php include('inc/header.php'); ?>

  <main class="board">

    <!-- check login status to show navbar -->
    <nav>
      <?php if (empty($user['username']) || $user == "") { ?>
        <a href="login.php" class="nav_btn">Login</a>
        <a href="register.php" class="nav_btn">Join free</a>
      <?php } else { ?>
        <?php if ($user['role'] == 2) { ?>
          <a href="manage.php" class="nav_btn">Manage</a>
        <?php } ?>
          <a href="logout.php" class="nav_btn">Logout</a>
      <?php } ?>
    </nav>
    
    <!-- include light & dark mode -->
    <?php include('inc/theme.php'); ?>

    <!-- check login status to show welcome message -->
    <div class="board__welcome-message">
      <h1 class="board__title"><i class="fa fa-commenting-o" aria-hidden="true"></i> Boarddd</h1>
      <?php if (!empty($user['username'])) { ?>
        <div class="board__nickname">
          <?php echo '<h2> Hi! ' . escape($user['nickname']) . '</h2>'; ?>
          <span class="update-nickname">Change nickname</span>
        </div>
        <form class="hide board__row update-nickname-form" method="POST" action="update_user.php">
          <input type="text" name="nickname" maxlength="25"/ placeholder="New nickname"> 
          <button type="submit">Submit</button>
        </form>
        <?php if ($user['role'] == 0) {
          $msg = 'Sorry, your account has been suspended.';
          echo '<p class=remind>' . $msg . '</p>';
        } ?>
      <?php } else {?>
        <?php 
          echo '<h2>The best board in the world!</h2>';
          echo '<p>Please login or create an account.';
        ?>
      <?php } ?>
    </div>

    <!-- check login to show new comment form -->
    <div class="board__form">
      <?php if(!empty($user['username']) && $user['role'] != 0) { ?>
        <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
          <textarea name="content" rows="5" maxlength="200"></textarea>
          <input type="hidden" name='CSRFToken' value='<?php echo $CSRFToken ?>'>
          <div class="submit">
            <button type="submit">POST</button>
            <?php checkValidComment() ?>
          </div>
        </form>
      <?php } ?>
      <div class="board__hr"></div>
    </div>
    
    <!-- show comments -->
    <section>
      <?php
        $page = 1;
        $items_per_page = 5;
        if (!empty($_GET['page'])) {
          $page = intval($_GET['page']);
        }
        $result = getTopComments($page, $items_per_page);
      ?>
      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="card">
          <div class="card__avatar">
            <img src="https://i.pinimg.com/564x/08/61/b7/0861b76ad6e3b156c2b9d61feb6af864.jpg" alt="">
          </div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__author">
                <?php echo escape($row['nickname']) ?>
                <span class="username">(@<?php echo escape($row['username']) ?>)</span>
              </span>
              <span class="card__time">
                <?php  echo escape($row['created_at']); ?>                     
              </span>
              <?php if ($user['role'] == 2 || $row['username'] === $username) { ?>
                <span class="ud-form">
                  <form class= "update_comment_form" method='POST' action='update_comment.php'>
                    <input type='hidden' name='id' value='<?php echo $row['id'] ?>'>
                    <input type="hidden" name='CSRFToken' value='<?php echo $CSRFToken ?>'>
                    <button class='btn__icon' type='submit'><i class='fa fa-pencil' aria-hidden='true'></i></button>
                  </form>
                  <form class= "delete_comment_form" method='POST' action='handle_delete_comment.php'>
                    <input type='hidden' name='id' value='<?php echo $row['id'] ?>'>
                    <input type="hidden" name='CSRFToken' value='<?php echo $CSRFToken ?>'>
                    <button class='btn__icon' type='submit'><i class='fa fa-trash-o' aria-hidden='true'></i></button>
                  </form>
              </span>
              <?php } ?>
            </div>
            <p class="card__content"><?php echo escape($row['content']); ?></p>
          </div>
        </div>          
      <?php } ?>
      <div class="board__hr"></div>
    </section>

    <!-- show page -->
    <div class="page">
      <?php $countPages = countPages($items_per_page); ?>
      <div class="page__info">
        <div> Total <?php echo $countPages['comment_numbers'] ?> comments</div>
        <div> Page: <?php echo $page; ?>/<?php echo $countPages['total_page']; ?></div>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <a href="index.php?page=1">First</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">Previous</a>
        <?php } ?>
        <?php if ($page != $countPages['total_page']) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">Next</a>
          <a href="index.php?page=<?php echo $countPages[total_page] ?>">Last</a>
        <?php } ?>
      </div>
    </div>

  </main>

  <script src="inc/script.js"></script>    
<?php include('inc/footer.php'); ?>
