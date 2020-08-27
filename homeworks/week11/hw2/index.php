<?php
require_once('inc/conn.php');
require_once('inc/utils.php');
session_start();

$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$items_per_page = 5;
$offset = ($page - 1) * $items_per_page;
$result = getTopArticles($items_per_page, $offset);
?>

<?php include_once('inc/header.php')?>

  <div class="container-wrapper">
    <div class="posts">
      <?php while($row = $result->fetch_assoc()) { ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($row['title'])?></div>
            <div class="post__actions"><?php showEditBtn($row['id']) ?></div>
          </div>
          <div class="post__info"><?php echo escape($row['created_at'])?></div>
          <div class="post__content"><?php echo escape(mb_substr($row['content'], 0, 200, "utf-8") . ' ...')?></div>
          <a class="btn-read-more" href="blog.php?id=<?php echo $row['id']?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>

  <div class="page">
      <?php $countPages = countPages($items_per_page); ?>
      <div class="page__info">
        <div> 總共 <?php echo $countPages['numbers'] ?> 篇文章，頁數： <?php echo $page; ?>/<?php echo $countPages['total_page']; ?></div>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $countPages['total_page']) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="index.php?page=<?php echo $countPages['total_page'] ?>">最末頁</a>
        <?php } ?>
      </div>
  </div>

<?php include_once('inc/footer.php')?>
