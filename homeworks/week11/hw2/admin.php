<?php
require_once('inc/conn.php');
require_once('inc/utils.php');
session_start();
checkLogin();
if (!empty($_COOKIE["CSRFToken"])) {
  $CSRFToken = $_COOKIE["CSRFToken"];
}
// get articles list
$result = getAllArticles();
?>

<?php include_once('inc/header.php')?>

  <!-- show article list -->
  <div class="container-wrapper list">
    <div class="list-posts">
      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="list-post">
          <div class="list-post__title">
              <?php echo '[' . escape($row['category']) . '] '. escape($row['title'])?>
          </div>
          <div class="list-post__info">
            <div class="list-post__created-at">
              <?php echo $row['created_at']?>
            </div>
            <a class="list-post__btn" href="edit_article.php?id=<?php echo $row['id']?>">編輯</a>
            <form action="handle_delete_article.php" method="POST">
              <input hidden name="id" value="<?php echo $row['id']?>">
              <input type="hidden" name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
              <button type="submit" class="list-post__btn">刪除</button>
            </form>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>

<?php include_once('inc/footer.php')?>

