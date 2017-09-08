<?php
// This script is a simple example of how to send a user off to authentication using Tumblr's OAuth

// Start a session.  This is necessary to hold on to  a few keys the callback script will also need
session_start();

// Include the TumblrOAuth library
require_once('tumblroauth/tumblroauth.php');


// Define the needed keys
$consumer_key = "aKjLDtrgW1cnp20jBwmwtR0bjg5k5xmAqOPEeSMJCCJXBUGfVF";
$consumer_secret = "F0yNV7Ou0OrdyvFvPZ49v3qlrTqlsMIjgwNBVAvD93JFvs2WdO";

// The callback URL is the script that gets called after the user authenticates with tumblr
// In this example, it would be the included callback.php
$logid = $_GET["id"];
$callback_url = "http://development.magneticbroadcast.com/php/callbackfortumblr.php?id=$logid";
// Let's begin.  First we need a Request Token.  The request token is required to send the user
// to Tumblr's login page.

// Create a new instance of the TumblrOAuth library.  For this step, all we need to give the library is our
// Consumer Key and Consumer Secret
$tum_oauth = new TumblrOAuth($consumer_key, $consumer_secret);

// Ask Tumblr for a Request Token.  Specify the Callback URL here too (although this should be optional)
$request_token = $tum_oauth->getRequestToken($callback_url);
//print_r($request_token);

// Store the request token and Request Token Secret as out callback.php script will need this
$_SESSION['request_token'] = $token = $request_token['oauth_token'];
$_SESSION['request_token_secret'] = $request_token['oauth_token_secret'];
//print_r($_SESSION['request_token']);
//echo "<br>";
//print_r($_SESSION['request_token_secret']);

// Check the HTTP Code.  It should be a 200 (OK), if it's anything else then something didn't work.
// Check the HTTP Code.  It should be a 200 (OK), if it's anything else then something didn't work.
if ($tum_oauth->http_code==200) {

        // Ask Tumblr to give us a special address to their login page
        $url = $tum_oauth->getAuthorizeURL($token);

        // Redirect the user to the login URL given to us by Tumblr
        header('Location: ' . $url);

        // That's it for our side.  The user is sent to a Tumblr Login page and
        // asked to authroize our app.  After that, Tumblr sends the user back to
        // our Callback URL (callback.php) along with some information we need to get
        // an access token.


}
exit();

/*      $headers = [];
      $curl = curl_init();
      curl_setopt_array($curl, array(
          CURLOPT_URL => "http://influxiq.com:3015/tumblr?request_token=".$_SESSION['request_token'].'&request_token_secret='.$_SESSION['request_token_secret'].'&logid='.$logid,
          // CURLOPT_URL => "http://influxiq.com:3015/twitter",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "GET",
      ));

      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      $response = curl_exec($curl);
      $err = curl_error($curl);

      header('Location: http://development.magneticbroadcast.com/#/dashboard');*/



?>