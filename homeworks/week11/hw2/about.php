<?php
require_once('inc/conn.php');
require_once('inc/utils.php');
session_start();
?>

<?php include_once('inc/header.php')?>

  <!-- show article content -->
  <div class="container-wrapper">
   <div class="profile">
     <div class="profile-photo">
       <div class="img">
         <img src="img/profile.jpg" alt="me">
       </div>
     </div>
     <div class="profile-title">
       <h1>Nicolas Cheng</h1>
     </div>
     <div class="profile-content">
       <p>
        Assez vu. La vision s'est rencontrée à tous les airs.
        Assez eu. Rumeurs des villes, le soir, et au soleil, et toujours.
        Assez connu. Les arrêts de la vie. - Ô Rumeurs et Visions !
        Départ dans l'affection et le bruit neufs !
        </p>
     </div>
   </div>
  </div>

<?php include_once('inc/footer.php')?>