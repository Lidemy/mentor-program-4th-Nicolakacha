<?php
  require_once('inc/conn.php');

  if (!isset($_POST['role'])) {
    header('Location: manage.php');
    die();
  }

  $role = $_POST['role'];
  $id = $_POST['id'];
  $sql ="UPDATE nicolakacha_users SET role=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  echo "<script>alert('Change Successfully'); location.href = 'manage.php'</script> ";
?>
