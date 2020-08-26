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

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }

  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;
?>

<?php include('inc/header.php'); ?>

  <main class="board">

    <!-- check login and show navbar -->
    <?php include('inc/nav.php'); ?>
    
    <!-- light & dark mode -->
    <?php include('inc/theme.php'); ?>

    <!-- check login and show welcome message -->
    <?php include('inc/board_welcome-message.php'); ?>

    <!-- check login and show new comment form -->
    <?php include('inc/board_form.php'); ?>

    <!-- show comments -->
    <?php include('inc/comments.php'); ?>

    <!-- show paginator -->
    <?php include('inc/page.php'); ?>
    
  </main>

  <script src="script/script.js"></script>    
<?php include('inc/footer.php'); ?>
