<?php
  require_once('inc/conn.php');
  require_once('inc/utils.php');
  session_start();

  // count page
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  // get articles per page
  $result = getTopArticles($items_per_page, $offset);
?>

<?php include_once('inc/header.php')?>

<!-- show articles -->
<div class="container-wrapper list">
  <div class="list-posts">
    <?php while($row = $result->fetch_assoc()) { ?>
      <?php
        if ($row)  
      ?>
      <div class="list-post">
        <div class="list-post__title">
            <a href="blog.php?id=<?php echo $row['id']?>">
              <?php 
                echo '[' . escape($row['category']) . '] ' . escape($row['title'])
              ?>
            </a>
        </div>
        <div class="list-post__info">
          <div class="list-post__created-at">
            <?php echo $row['created_at']?>
          </div>
        </div>
      </div>
    <?php } ?>
  </div>
</div>

<!-- show paginator -->
<div class="page">
    <?php $countPages = countPages($items_per_page); ?>
    <div class="page__info">
      <div> 總共 <?php echo $countPages['numbers'] ?> 篇文章</div>
      <div> 頁數： <?php echo $page; ?>/<?php echo $countPages['total_page']; ?></div>
    </div>
    <div class="paginator">
      <?php if ($page != 1) { ?>
        <a href="articles.php?page=1">首頁</a>
        <a href="articles.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if ($page != $countPages['total_page']) { ?>
        <a href="articles.php?page=<?php echo $page + 1 ?>">下一頁</a>
        <a href="articles.php?page=<?php echo $countPages['total_page'] ?>">最末頁</a>
      <?php } ?>
    </div>
</div>

<?php include_once('inc/footer.php')?>
