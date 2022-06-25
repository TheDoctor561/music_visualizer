<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Digital Ocean</title>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js"></script>
  <link rel="stylesheet" href="space_style.css">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/addons/p5.sound.min.js"></script>
  
    
 <script src="digital_ocean.js"></script> -
</head>



<body>
  <form method="POST" enctype="multipart/form-data">
    <input type="file" name="file"> 
    <button type="submit" name="submit">UPLOAD</button>
  </form>
</body>
<?php 

if (isset($_POST['submit'])){

  $file = $_FILES['file'];
  $fileName = $_FILES['file']['name']; 
  $fileTmpName = $_FILES['file']['tmp_name']; 
  $fileSize = $_FILES['file']['size']; 
  $fileError = $_FILES['file']['error']; 
  $fileType = $_FILES['file']['type']; 
  $fileExt = explode('.', $fileName);
  $fileActualExt = strtolower(end($fileExt)); 

  $allowed = array('mp3'); 

  if (in_array($fileActualExt, $allowed)){
      if($fileError === 0) {
          if($fileSize < 20000000){
              $fileNameNew = "curr".".".$fileActualExt; 
              $fileDestimation = 'uploads/'.$fileNameNew; 
              move_uploaded_file($fileTmpName, $fileDestimation); 
              echo "Success"; 
          } else {
              echo "File size too big"; 
          }
      } else {
          echo "There was an error uploading your file"; 
      }
  } else {
      echo "Only mp3 files allowed"; 
  }
  
}
?>


</html>