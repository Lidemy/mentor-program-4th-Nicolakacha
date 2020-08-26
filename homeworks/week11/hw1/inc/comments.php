<section>
  <?php
    $stmt = $conn->prepare(
      'SELECT c.id as id, c.content as content, c.created_at as created_at, u.nickname as nickname, u.username as username FROM nicolakacha_comments as c LEFT JOIN nicolakacha_users as u ON c.username = u.username WHERE c.is_deleted IS NULL ORDER BY c.id DESC limit ? offset ? '
    );
    $stmt->bind_param('ii', $items_per_page, $offset);
    $result = $stmt->execute();
    if (!$result) {
      die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
  ?>
  <?php while($row = $result->fetch_assoc()) { ?>
    <div class="card">
      <div class="card__avatar">
        <img src="https://i.pinimg.com/564x/08/61/b7/0861b76ad6e3b156c2b9d61feb6af864.jpg" alt="">
      </div>
      <div class="card__body">
        <div class="card__info">
          <span class="card__author">
            <?php echo escape($row['nickname']) ?>
            <span class="username">(@<?php echo escape($row['username']) ?>)</span>
          </span>
          <span class="card__time">
            <?php  echo escape($row['created_at']); ?>                     
          </span>
          <?php if ($user['role'] == 2 || $row['username'] === $username) { ?>
            <span class="ud-form">
              <a class='btn__icon' href="update_comment.php?id=<?php echo $row['id']?>&CSRFToken=<?php echo $_COOKIE['CSRFToken']?>"><i class='fa fa-pencil' aria-hidden='true'></i></a>
              <form class= "delete_comment_form" method='POST' action='handle_delete_comment.php'>
                <input type='hidden' name='id' value='<?php echo $row['id'] ?>'>
                <input type="hidden" name='CSRFToken' value='<?php echo $CSRFToken ?>'>
                <button class='btn__icon' type='submit'><i class='fa fa-trash-o' aria-hidden='true'></i></button>
              </form>
          </span>
          <?php } ?>
        </div>
        <p class="card__content"><?php echo escape($row['content']); ?></p>
      </div>
    </div>          
  <?php } ?>
  <div class="board__hr"></div>
</section>