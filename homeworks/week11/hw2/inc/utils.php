<?php
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function generateToken($length) {
    $s = '';
    for ($i = 1; $i <= $length; $i++) {
      $s .= chr(rand(65, 90));
    }
    return $s;
  }

  function checkLogin() {
    if (!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      if ($username != 'admin') {
        header('Location: index.php');
        die();
      }
    } else {
      header('Location: index.php');
      die();
    }
  }

  function showAdmin() {
    if (!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      if($username == 'admin') {
        $current_file = basename($_SERVER['PHP_SELF']);
        if ($current_file == 'admin.php') {
          echo "<a href='edit.php'>新增文章</a>";
        } else {
          echo "<a href='admin.php'>管理後台</a>";
        }
      }
    }
  }

  function showLoginOrLogout() {
    if (!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      if($username == 'admin') {
        echo "<a href='handle_logout.php'>登出</a>";
      } else {
        echo "<a href='login.php'>登入</a>";
      }
    } else {
      echo "<a href='login.php'>登入</a>";
    }
  }

  function showEditBtn($id) {
    if (!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      if ($username == 'admin') {
        echo "<a class='post__action' href='edit.php?id=" . $id . "'>編輯</a>";
      }
    }
  }

  function checkValidLogin() {
    if (!empty($_GET['errorCode'])) {
      $code = $_GET['errorCode'];
      $msg = 'Error';
      if ($code === '1') {
        $msg = '密碼和帳號都要填啦 (σﾟ∀ﾟ)σ';
      }
      if ($code === '2') {
        $msg = '忘記帳號或密碼了嗎？母湯哦！';
      }
      if ($code === '3') {
        $msg = '你不是管理員啦！';
      }
      echo $msg;
    }
  }

  function countPages($items_per_page) {
    global $conn;
    $stmt = $conn->prepare(
      'SELECT count(id) as count FROM nicolakacha_blog_articles WHERE is_deleted IS NULL'
    );
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil( $count / $items_per_page);
    $countPages = ['total_page'=>$total_page, 'numbers'=>$count]; 
    return $countPages;
  }

  function getTopArticles($items_per_page, $offset) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM nicolakacha_blog_articles WHERE is_deleted IS NULL ORDER BY id DESC limit ? offset ?");
    $stmt->bind_param('ii', $items_per_page, $offset);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }
?>