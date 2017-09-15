<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// Start a session, load the library
session_start();
require_once('tumblroauth/tumblroauth.php');
require_once('Client.php');

// Define the needed keys
$consumer_key = "aKjLDtrgW1cnp20jBwmwtR0bjg5k5xmAqOPEeSMJCCJXBUGfVF";
$consumer_secret = "F0yNV7Ou0OrdyvFvPZ49v3qlrTqlsMIjgwNBVAvD93JFvs2WdO";

$logid = $_GET["id"];
$oauth_token = $_GET["oauth_token"];
$oauth_token_secret = $_GET["oauth_token_secret"];
/*$logid = '599ff0b4745d7f17209305ed';
$oauth_token_secret = 'eAyGhPjoA8nv71a4c2gTUjPBVDiOlvA29cKps1erafkvdcyQA6';
$oauth_token = 'BfvmD0CwZZJBbYwoBH5s4j5oxBCNfDWi6gegQBKnLeVrZfI1na';*/
/*print_r($logid);
print_r($oauth_token);
print_r($oauth_token_secret);*/


$tum_oauth = new TumblrOAuth($consumer_key, $consumer_secret, $oauth_token,$oauth_token_secret);
$userinfo = $tum_oauth->get('http://api.tumblr.com/v2/user/info');
//print_r($userinfo);
$screen_name = $userinfo->response->user->name;
//print_r($screen_name);
$imageurl='https://api.tumblr.com/v2/blog/'.$screen_name.'.tumblr.com/avatar';


$arr['name'] = $userinfo->response->user->name;
$arr['image'] = $imageurl;
// print_r(json_encode($arr));
echo json_encode($arr);
?>
