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