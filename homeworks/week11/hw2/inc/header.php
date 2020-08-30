<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>部落格 v1.1</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" href="inc/favicon.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="inc/favicon.ico" type="image/x-icon" />
</head>

<body>
  <input type="checkbox" id="menu-switch">
  <div class="navbar-mobile">
    <div class="container">
        <li><a href="articles.php">文章列表</a></li>
        <li><a href="categories.php">文章分類</a></li>
        <li><a href="about.php">關於我</a></li>
    </div>
  </div>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Nicolas's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="articles.php">文章列表</a></li>
          <li><a href="categories.php">文章分類</a></li>
          <li><a href="about.php">關於我</a></li>
        </div>
        <div>
          <?php showAdmin() ?>
          <li> <?php showLoginOrLogout() ?> </li>
        </div>
      </ul>
      <label class="navbar__icon" for="menu-switch">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </label>
    </div>
  </nav>
  
  <section class="banner">
    <div class="banner__wrapper">
      <h1>我只是一個簡單的部落格，不要玩壞我</h1>
      <div>If you're not having fun, lower your standards.</div>
    </div>
  </section>