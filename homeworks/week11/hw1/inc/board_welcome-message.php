<div class="board__welcome-message">

  <h1 class="board__title"><i class="fa fa-commenting-o" aria-hidden="true"></i> Boarddd</h1>
  <?php if (!empty($user['username'])) { ?>
    <div class="board__nickname">
      <?php echo '<h2> Hi! ' . escape($user['nickname']) . '</h2>'; ?>
      <span class="update-nickname">Change nickname</span>
    </div>
    <form class="hide board__row update-nickname-form" method="POST" action="handle_update_user.php">
      <input type="text" name="nickname" maxlength="25"/ placeholder="New nickname"> 
      <button type="submit">Submit</button>
    </form>
    <?php if ($user['role'] == 0) {
      $msg = 'Sorry, your account has been suspended.';
      echo '<p class=remind>' . $msg . '</p>';
    } ?>
  <?php } else {?>
    <?php 
      echo '<h2>The best board in the world!</h2>';
      echo '<p>Please login or create an account.';
    ?>
  <?php } ?>
  
</div>