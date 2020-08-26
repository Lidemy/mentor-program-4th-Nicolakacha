<?php
  session_start();
  require_once('inc/conn.php');
  require_once('inc/utils.php');
  if (!empty($_POST['id'])) {
    $id = $_POST['id'];
  } else {
    $id = $_GET['id'];
  }
  $row = selectCommentFromComments($id);
  if (!empty($_POST['CSRFToken'])) {
    $CSRFToken = $_POST['CSRFToken'];
  } else {
    $CSRFToken = $_GET['CSRFToken'];
  }
?>

<?php include('inc/header.php'); ?>

  <main class="board">

    <nav>
      <a href="index.php" class="nav_btn">Back to Boarddd</a>
    </nav>

    <?php include('inc/theme.php'); ?>
    <h1 class="board__title">Edit comment</h1>
    
    <div class="board__form">
      <form class="board__new-comment-form" method="POST" action="handle_update_comment.php">
        <textarea name="content" rows="5" maxlength="200"><?php echo $row['content'];?></textarea>
        <input type="hidden" name="id" value="<?php echo $id?>"/>
        <input type="hidden" name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
        <div class="submit">
          <button type="submit">POST</button>
          <?php checkValidComment() ?>
        </div>
      </form>
    </div>

  </main>

  <script src="inc/script.js"></script>
<?php include('inc/footer.php'); ?>
