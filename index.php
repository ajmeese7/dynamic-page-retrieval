<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dynamic PHP Request</title>
    <meta charset="utf-8">
  </head>
  <body>
    <p>
      <?php
        function curl_download($URL) {
          if (!function_exists('curl_init')){

              die('cURL is not installed. Install and try again.');

          }

          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $URL);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

          $output = curl_exec($ch);
          curl_close($ch);

          return $output;
        }

        print curl_download('https://www.nasa.gov/multimedia/imagegallery/iotd.html');
      ?>

      <?php
        require('simple_html_dom.php');

        $URL = "https://www.nasa.gov/multimedia/imagegallery/iotd.html";

        // Create DOM from URL or file
        $html = file_get_html($URL);
        echo $html;
      ?>
    </p>
  </body>
</html>
