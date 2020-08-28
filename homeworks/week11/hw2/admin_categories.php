<?php
require_once('inc/conn.php');
require_once('inc/utils.php');
session_start();

// check login status
checkLogin();
if (!empty($_COOKIE["CSRFToken"])) {
  $CSRFToken = $_COOKIE["CSRFToken"];
}
// get categories list
$result = getCategories();
?>

<?php include_once('inc/header.php')?>

<div class="categories container-wrapper list">
  <div class="add-categories">
    <form action="handle_add_category.php" method="POST">
      新增分類：<input type="text" placeholder="分類名稱" name="category">
      <input hidden name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
      <button type="submit">新增</button>
    </form>
  </div>

  <!-- get reminder if input is incorrect -->
  <div class="remind-category">
    <?php echo getReminder() ?>
  </div>

  <!-- show categories list-->
  <div class="list-categories">
    <?php while($row = $result->fetch_assoc()) { ?>
      <div class="list-category">
        <div class="list-category__title">
          <h3><i class="fa fa-bookmark-o" aria-hidden="true"></i><?php echo $row['category']?></h3>
        </div>
        <div class="list-post__info">
          <form action="handle_add_category.php" method="POST">
            <input type="text" placeholder="更改分類名稱" name="category">
            <input hidden name="id" value="<?php echo $row['id']?>">
            <input hidden name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
            <button type="submit" class="list-post__btn">修改</button>
          </form>
          <form action="handle_delete_category.php" method="POST">
            <input hidden name="id" value="<?php echo $row['id']?>">
            <input hidden name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
            <button type="submit" class="list-post__btn">刪除</button>
          </form>
        </div>
      </div>
    <?php } ?>  
  </div>
</div>

<?php include_once('inc/footer.php')?>

