<?php
  require_once('inc/conn.php');

  function getUserFromUsername($username) {
    //在 function 裡面用 $conn 要特別做 global 宣告
    global $conn;
    $sql = sprintf(
      'SELECT * FROM nicolakacha_users WHERE username = "%s"',
       $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  };

  function getAllUsers() {
    global $conn;
    $result = $conn->query('SELECT * FROM nicolakacha_users WHERE username != "admin" ORDER BY id DESC');
    if(!$result) {
      die($conn->error);
    }
    return $result;
  }

  function getTopComments($page, $items_per_page) {
    global $conn;
    $offset = ($page-1) * $items_per_page;
    $stmt = $conn->prepare(
      'SELECT '. 
      'c.id as id, '.
      'c.content as content, '.
      'c.created_at as created_at, '.
      'u.nickname as nickname, '.
      'u.username as username '.
      'FROM nicolakacha_comments as c '.
      'LEFT JOIN nicolakacha_users as u '. 
      'ON c.username = u.username '.
      'WHERE c.is_deleted IS NULL ORDER BY c.id DESC '.
      'LIMIT ? OFFSET ?'
    );
    $stmt->bind_param('ii', $items_per_page, $offset);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function countPages($items_per_page) {
    global $conn;
    $stmt = $conn->prepare(
      'SELECT count(id) as count FROM nicolakacha_comments WHERE is_deleted IS NULL'
    );
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil( $count / $items_per_page);
    $countPages = ['total_page'=>$total_page, 'comment_numbers'=>$count]; 
    return $countPages;
  }

  function checkValidRegistration() {
    if (!empty($_GET['errorCode'])) {
      $code = $_GET['errorCode'];
      $msg = 'Error';
      if ($code === '1') {
        $msg = 'Oh! You forget something? (σﾟ∀ﾟ)σﾟ∀ﾟ)σﾟ';
      } else if ($code === '2') {
        $msg = 'Sorry, this username has already been used...';
      }
      echo '<p class=remind>' . $msg . '</p>';
    }  
  }

  function checkValidLogin() {
    if (!empty($_GET['errorCode'])) {
      $code = $_GET['errorCode'];
      $msg = 'Error';
      if ($code === '1') {
        $msg = 'Oh! You forget something? (σﾟ∀ﾟ)σﾟ∀ﾟ)σﾟ';
      } else if ($code === '2') {
        $msg = 'Wrong username or password ヽ(#`Д´)ﾉ';
      }
      echo '<p class=remind>' . $msg . '</p>';
    }  
  }

  function getCurrentUser() {
    $username = NULL;
    $user = NULL;
    if(!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      $user = getUserFromUsername($username);
    }
    return $user;
  }

  function checkValidAdmin() {
    if(!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      $user = getUserFromUsername($username);
      if ($user['role'] != 2) {
        header('Location: index.php');
        die();
      }
    } else {
      header('Location: index.php');
      die();
    }
  }

  function checkValidComment() {
    if (!empty($_GET['errorCode'])) {
      $code = $_GET['errorCode'];
      $msg = 'Error';
      if ($code === '1') {
        $msg = 'Hey! Write Something';
      }
      echo '<p class=remind>' . $msg . '</p>';
    }   
  }

  function selectCommentFromComments() {
    global $conn;
    $username = NULL;
    $user = NULL;
    if(!empty($_SESSION['username'])) {
      $username = $_SESSION['username'];
      $user = getUserFromUsername($username);
    }
  
    $id = $_GET['id'];
  
    $stmt = $conn->prepare('SELECT * FROM nicolakacha_comments WHERE id = ?');
    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
?>