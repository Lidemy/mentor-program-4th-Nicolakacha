<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['site_key'])) {
    $json = [
      'ok' => false, 
      'message' => 'Please send site_key in url'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }
  $siteKey = $_GET['site_key'];

  if (!empty($_GET['cursor'])) {
    $cursor = $_GET['cursor'];
  }

  if (!empty($_GET['cursor'])) {
    $sql = "SELECT nickname, content, created_at, id FROM nicolakacha_discussion WHERE (site_key =? AND id < ?) ORDER BY id DESC LIMIT 6";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $siteKey, $cursor);
  } else {
    $sql = "SELECT nickname, content, created_at, id FROM nicolakacha_discussion WHERE site_key =? ORDER BY id DESC LIMIT 6";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $siteKey);
  };
  
  $result = $stmt->execute();
  if(!$result) {
    $json = [
      'ok' => false, 
      'message' => $conn->error
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $discussion = [];
  while ($row = $result->fetch_assoc()) {
    array_push($discussion, [
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'created_at' => $row['created_at'],
      'id' => $row['id']
    ]);
  }

  $json = [
    'ok' => true, 
    'discussion' => $discussion
  ];
  $response = json_encode($json);
  echo $response;
?>