<?php
  require_once('inc/utils.php');
  require_once('inc/conn.php');
  session_start();
  checkLogin();
  if (!empty($_COOKIE["CSRFToken"])) {
    $CSRFToken = $_COOKIE["CSRFToken"];
  };
?>

<?php include_once('inc/header.php')?>

  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <!-- check edit old article or add a new one -->
        <?php if (!empty($_GET['id'])) {
            $id = $_GET['id'];
            $row = getArticle($id);
            $title = $row['title'];
            $content = $row['content'];
            $article_category_id = $row['category_id'];
        } ?> 
        <form action="handle_edit_article.php" method="POST">

          <!-- show remind message if form is not complete -->
          <h3 class="remind">
            <?php echo getReminder(); ?>
          </h3>
          <!-- article title -->
          <div class="title">
            <div class="edit-post__title">
              發表文章：
            </div>
            <div class="edit-post__input-wrapper">
              <input type="text" name="title" class="edit-post__input" placeholder="請輸入文章標題" value="<?php if(!empty($title)) {echo $title;} ?>"/>
            </div>
          </div>

          <!-- article category -->
          <div class="edit-post__input-wrapper">
            文章分類：
            <select name="category_id">
              <!-- get categories list and show the selected by default -->
              <?php $result = getCategories() ?>
              <?php while($row = $result->fetch_assoc()) { ?>
                <?php
                  $selected = "";
                  if(!empty($row['id'])) {
                    $category_id = $row['id'];
                    if ($row['id'] == $article_category_id){
                    $selected =" SELECTED";}
                  }
                ?>
                <option value="<?php echo $category_id ?>"<?php echo $selected ?>>
                  <?php echo escape($row['category']) ?>
                </option>
              <?php } ?>
            </select>
          </div>

          <!-- article content -->
          <div class="edit-post__input-wrapper">
            <textarea name="content" rows="20" class="edit-post__content"><?php if(!empty($content)) {echo $content;} ?></textarea>
          </div>

          <!-- check CSRFToken-->
          <div class="edit-post__input-wrapper">
            <input hidden name="id" value="<?php if(!empty($id)) {echo $id;}?>"/>
            <input hidden name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
          </div>

          <!-- submit the form -->
          <div class="edit-post__btn-wrapper">
              <button type="submit" class="edit-post__btn">送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <?php include_once('inc/footer.php')?>