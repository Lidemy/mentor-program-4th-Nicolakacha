<nav>
  <?php if (empty($user['username']) || $user == "") { ?>
    <a href="login.php" class="nav_btn">Login</a>
    <a href="register.php" class="nav_btn">Join free</a>
  <?php } else { ?>
    <?php if ($user['role'] == 2) { ?>
      <a href="manage.php" class="nav_btn">Manage</a>
    <?php } ?>
      <a href="handle_logout.php" class="nav_btn">Logout</a>
  <?php } ?>
</nav>