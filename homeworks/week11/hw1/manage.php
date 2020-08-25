<?php
  session_start();
  require_once('inc/conn.php');
  require_once('inc/utils.php');

  checkValidAdmin();
  $result = getAllUsers();
?>

<?php include('inc/header.php'); ?>

  <main class="board simple">
    <nav>
      <a href="index.php" class="nav_btn">Back to Boarddd</a>
    </nav>

    <?php include('inc/theme.php'); ?>

    <div class="admin__welcome-message">
      <h2>Users Management</h2>
    </div>

    <div class="user__board">
      <?php while($row = $result->fetch_assoc()) { ?>
        <div class="user-info">
          <div class="user-info__item username">
            <h3>@<span> <?php echo escape($row['username']) ?></span></h3>
          </div>
          <div class="user-info__item nickname">
            Nickname: &nbsp;&nbsp;<span><?php echo escape($row['nickname']) ?></span>
          </div>
          <div class="user-info__item role">
            Role: &nbsp;&nbsp;
            <span>
              <?php
                if ($row['role'] == 0) { 
                echo "Blocked"; 
                } elseif ($row['role'] == 1) {
                  echo "User";
                } elseif ($row['role'] == 2) {
                  echo "Admin";
                }
              ?>
            </span>
          </div>
            
          <form class="update-role__form" method="POST" action="handle_update_role.php">
            <div class="update-option">
              <label><input type="radio" name="role" value="2">Admin</label>
            </div>
            <div class="update-option">
              <label><input type="radio" name="role" value="1">User</label>
            </div>
            <div class="update-option">
              <label><input type="radio" name="role" value="0">Blocked</label>
            </div>
            <div class="update-id" hidden>
              <input name="id" value="<?php echo $row['id'] ?>">
            </div>
            <button class="update-role" type="submit">Submit</button>
          </form>
        </div>
      <?php } ?>
    </div>

  </main>

  <script src="inc/script.js"></script>
<?php include('inc/footer.php'); ?>
