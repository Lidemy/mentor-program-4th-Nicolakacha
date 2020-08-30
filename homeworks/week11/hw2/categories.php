<?php
  require_once('inc/conn.php');
  require_once('inc/utils.php');
  session_start();
  // get categories list
  $result = getCategories();
?>

<?php include_once('inc/header.php')?>

<!-- show categories -->
<div class="container-wrapper list">
  <div class="list-categories">
    <?php while($row = $result->fetch_assoc()) { ?>
      <?php
        $category_id = $row['id'];
        // get all articles are there in a category
        $result_article = getArticlesByCategory($category_id);
        $count = countArticles($category_id);
      ?>
      <!-- if there is no article in a category, then don't show this category -->
      <?php if ($count != 0) { ?>
        <div class="list-category normal">
          <div class="list-category__title">
            <h3><i class="fa fa-bookmark-o" aria-hidden="true"></i><?php echo $row['category'] . ' (' . $count . ')'?></h3>
          </div>
          <div class="list-category-articles">
            <ul>
              <!-- get the article id in order to visit the article by this link -->
              <?php while($row_article = $result_article->fetch_assoc()) { ?>
                <li><a href="blog.php?id=<?php echo $row_article['id']; ?>">
                  <?php echo $row_article['title']; ?>
                </a></li>
              <?php } ?>
            </ul>
          </div>
        </div>
      <?php } ?> 
    <?php } ?>
  </div>
</div>

<?php include_once('inc/footer.php')?>
