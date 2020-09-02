<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if (
    empty($_POST['site_key']) ||
    empty($_POST['nickname']) ||
    empty($_POST['content'])
    ) {
    $json = [
      'ok' => false, 
      'message' => 'Please input all fields'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }
  $siteKey = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $created_at = date('Y-m-d h:i:s',time()+28800);
  $sql = "INSERT INTO nicolakacha_discussion(site_key, nickname, content) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $siteKey, $nickname, $content);
  $result = $stmt->execute();

  $result ? $json = [
    'ok' => true, 
    'message' => 'Add successfully',
    'created_at' => $created_at]
     : $json = ['ok' => false, 'msg' => $conn->error];
  $response = json_encode($json);
  echo $response;
?>