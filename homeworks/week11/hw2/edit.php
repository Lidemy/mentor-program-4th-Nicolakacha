<?php
  require_once('inc/utils.php');
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
        <?php if (!empty($_GET['id'])) {
            require_once('inc/conn.php');
            $id = $_GET['id'];
            $stmt = $conn->prepare("SELECT * FROM  nicolakacha_blog_articles WHERE id=?");
            $stmt->bind_param('i', $id);
            $result = $stmt->execute();
            if (!$result) {
              die($conn->$error);
            }
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $title = $row['title'];
            $content = $row['content'];
        } ?> 
          <form action="handle_edit.php" method="POST">
            <h3 class="remind">
              <?php
                if (!empty($_GET['errorCode'])) {
                  $code = $_GET['errorCode'];
                  $msg = 'Error';
                  if ($code === '1') {
                    $msg = '請輸入內容或標題 (σﾟ∀ﾟ)σﾟ∀ﾟ)σﾟ';
                  }
                  echo $msg;
                }
              ?>
            </h3>
            <div class="edit-post__title">
              發表文章：
            </div>
            <div class="edit-post__input-wrapper">
              <input type="text" name="title" class="edit-post__input" placeholder="請輸入文章標題" value="<?php if(!empty($title)) {echo $title;} ?>"/>
            </div>
            <div class="edit-post__input-wrapper">
              <textarea name="content" rows="20" class="edit-post__content"><?php if(!empty($content)) {echo $content;} ?></textarea>
            </div>
            <div class="edit-post__input-wrapper">
              <input hidden name="id" value="<?php if(!empty($id)) {echo $id;}?>"/>
              <input type="hidden" name="CSRFToken" value="<?php echo $CSRFToken ?>"/>
            </div>
            <div class="edit-post__btn-wrapper">
                <button type="submit" class="edit-post__btn">送出</button>
            </div>
          </form>
              
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>