<?php
/**
 * Created by PhpStorm.
 * User: KTA-PC 21
 * Date: 4/14/15
 * Time: 2:24 PM
 */


$x= require_once('../php/codebird-php-develop/src/codebird.php');
\Codebird\Codebird::setConsumerKey('Nv2ZZ7Nci3iCYYx67hDYkUGYC', 'pvckS5yE0E93AgU2oH6YWgkovUpgeXgQXMIsxsojU8lxqnvNIw'); // static, see 'Using multiple Codebird instances'

$cb = \Codebird\Codebird::getInstance();
//var_dump($cb);
//var_dump($x);
//$logid = $_GET["id"];
session_start();
//print_r(isset($_SESSION['oauth_token']));

//print_r('hi');
if( (strlen($_GET["id"])>5)){
    $_SESSION['loginid'] = $_GET["id"];
    //exit;
  //  print_r('yeah');
};

//print_r($_SESSION['getid']);

if (! isset($_SESSION['oauth_token'])) {
    // get the request token
   // echo "get the request token";
    $reply = $cb->oauth_requestToken(array(
        'oauth_callback' => 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']
    ));

    // store the token
    $cb->setToken($reply->oauth_token, $reply->oauth_token_secret);
    $_SESSION['oauth_token'] = $reply->oauth_token;
    $_SESSION['oauth_token_secret'] = $reply->oauth_token_secret;
    $_SESSION['oauth_verify'] = true;

    // redirect to auth website
    $auth_url = $cb->oauth_authorize();
    header('Location: ' . $auth_url);
    die();

} elseif (isset($_GET['oauth_verifier']) && isset($_SESSION['oauth_verify'])) {
    // verify the token
   // echo "verify the token";
    $cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
    unset($_SESSION['oauth_verify']);

    // get the access token
    $reply = $cb->oauth_accessToken(array(
        'oauth_verifier' => $_GET['oauth_verifier']
    ));

    // store the token (which is different from the request token!)
    $_SESSION['oauth_token'] = $reply->oauth_token;
    $_SESSION['oauth_token_secret'] = $reply->oauth_token_secret;

    // send to same URL, without oauth GET parameters
    header('Location: ' . basename(__FILE__));
    die();
}
//print_r($_SESSION['getid']);
// assign access token on each page load
$cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
//print_r($_SESSION['oauth_token']);
// print_r($cb);


$twitter_token = $_SESSION['oauth_token'];
$twitter_token_secret = $_SESSION['oauth_token_secret'];




//echo $twitter_token;
//echo '<br>';
//echo 'twitter_token_secret      '.$twitter_token_secret;

//echo $twitter_token."<br>";
//echo $twitter_token_secret;
//$reply = $cb->account_settings();
//exit;
//print_r($reply->screen_name);
//unset($_SESSION['oauth_token']);


/*$reply = $cb->users_show(array(
    'screen_name'=>$reply->screen_name));
print_r($reply->profile_image_url);*/

//echo "http://influxiq.com:3015/twitter?oauth_token=".$twitter_token.'&oauth_token_secret='.$twitter_token_secret.'&logid ='.$logid;
//print_r($_SESSION['getid']);
$headers = [];
//print_r("http://influxiq.com:3015/twitter?oauth_token=".$twitter_token.'&oauth_token_secret='.$twitter_token_secret.'&logid='.$_SESSION['loginid']);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://influxiq.com:3015/twitter?oauth_token=".$twitter_token.'&oauth_token_secret='.$twitter_token_secret.'&logid='.$_SESSION['loginid'],
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
unset($_SESSION['oauth_token']);
//echo "<br>";
//print_r($err);
//print_r($response);
//exit;
header('Location: http://development.magneticbroadcast.com/#/dashboard');