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
          echo "<li><a href='admin_categories.php'>管理分類</a></li><li><a href='edit_article.php'>新增文章</a></li>";
        } else {
          echo "<li><a href='admin_categories.php'>管理分類</a></li><li><a href='admin.php'>管理文章</a></li>";
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
        echo "<a class='post__action' href='edit_article.php?id=" . $id . "'>編輯</a>";
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
    $stmt = $conn->prepare("SELECT a.id as id, a.title as title, a.content as content, a.created_at as created_at, a.category_id as category_id, c.category as category FROM nicolakacha_blog_articles as a LEFT JOIN nicolakacha_blog_categories as c ON a.category_id = c.id WHERE a.is_deleted IS NULL ORDER BY a.id DESC limit ? offset ?");
    $stmt->bind_param('ii', $items_per_page, $offset);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function getAllArticles() {
    global $conn;
    $sql = "SELECT a.id as id, a.title as title, a.content as content, a.created_at as created_at, a.category_id as category_id, c.category as category FROM nicolakacha_blog_articles as a LEFT JOIN nicolakacha_blog_categories as c ON a.category_id = c.id WHERE a.is_deleted IS NULL ORDER BY a.id DESC";
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }
    return $result;
  }

  function getArticle($id) {
    global $conn;
    $stmt = $conn->prepare("SELECT a.title as title, a.content as content, a.id as id, a.created_at as created_at, a.category_id as category_id, c.category as category FROM nicolakacha_blog_articles as a LEFT JOIN nicolakacha_blog_categories as c ON a.category_id = c.id WHERE a.id=?");
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->$error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function getCategories() {
    global $conn;
    $stmt = $conn->prepare('SELECT category, id FROM nicolakacha_blog_categories ORDER BY id');
    $result = $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
      die($conn->error);
    }
    return $result;
  }

  function getArticlesByCategory($category_id) {
    global $conn;
    $stmt = $conn->prepare('SELECT a.id as id, a.title as title, c.id as category_id FROM nicolakacha_blog_articles as a LEFT JOIN nicolakacha_blog_categories as c ON a.category_id = c.id WHERE a.is_deleted IS NULL AND c.id = ? ORDER BY a.id DESC');
    $stmt->bind_param('i', $category_id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
      die($conn->error);
    }
    return $result;
  }

  function countArticles($category_id) {
    global $conn;
    $stmt = $conn->prepare('SELECT count(a.title) as number FROM nicolakacha_blog_articles as a LEFT JOIN nicolakacha_blog_categories as c ON a.category_id = c.id WHERE a.is_deleted IS NULL AND c.id = ?');
    $stmt->bind_param('i', $category_id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    if (!$result) {
      die($conn->error);
    }
    $row = $result->fetch_assoc();
    return $row['number'];
  }

  function getReminder() {
    if (!empty($_GET['errorCode'])) {
      $code = $_GET['errorCode'];
      $msg = 'Error';
      if ($code === '1') {
        $msg = '請輸入內容或標題 (σﾟ∀ﾟ)σﾟ∀ﾟ)σﾟ';
      }
      if ($code === '2') {
        $msg = '該分類還有文章，無法刪除';
      }
      if ($code === '3') {
        $msg = '這個分類已經有惹';
      }
      return $msg;
    }
  }
?>