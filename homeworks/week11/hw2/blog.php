<?php
require_once('inc/conn.php');
require_once('inc/utils.php');
session_start();

$id = $_GET['id'];

// get single article
$row = getArticle($id);
?>

<?php include_once('inc/header.php')?>

  <!-- show article content -->
  <div class="container-wrapper">
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div>
          <?php echo '[' . escape($row['category']) . '] '; ?>
          <?php echo escape($row['title']); ?>
          </div>
          <div class="post__actions">
            <a class="post__action" href="index.php">首頁</a>
            <?php showEditBtn($row['id']) ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['created_at']); ?>
        </div>
        <div class="post__content">
        <?php echo escape($row['content']); ?>
        </div>
      </article>
    </div>
  </div>

<?php include_once('inc/footer.php')?>