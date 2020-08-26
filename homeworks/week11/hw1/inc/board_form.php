<div class="board__form">

  <?php if(!empty($user['username']) && $user['role'] != 0) { ?>
    <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
      <textarea name="content" rows="5" maxlength="200"></textarea>
      <input type="hidden" name='CSRFToken' value='<?php echo $CSRFToken ?>'>
      <div class="submit">
        <button type="submit">POST</button>
        <?php checkValidComment() ?>
      </div>
    </form>
  <?php } ?>
  
  <div class="board__hr"></div>

</div>