<?php
/**
 * Created by PhpStorm.
 * User: KTA-PC 21
 * Date: 4/14/15
 * Time: 2:24 PM
 */
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');


$logid = $_GET["id"];
$oauth_token = $_GET["oauth_token"];
$oauth_token_secret = $_GET["oauth_token_secret"];
/*echo $oauth_token."<br>";
echo $oauth_token_secret."<br>";
echo $logid."<br>";*/

$x= require_once('../php/codebird-php-develop/src/codebird.php');
\Codebird\Codebird::setConsumerKey('Nv2ZZ7Nci3iCYYx67hDYkUGYC', 'pvckS5yE0E93AgU2oH6YWgkovUpgeXgQXMIsxsojU8lxqnvNIw'); // static, see 'Using multiple Codebird instances'

$cb = \Codebird\Codebird::getInstance();


// assign access token on each page load
$cb->setToken($oauth_token,$oauth_token_secret);

// print_r($cb);
$reply = $cb->account_settings();
//print_r($reply);
//print_r($reply->screen_name);


$reply = $cb->users_show(array(
    'screen_name'=>$reply->screen_name));

//print_r($reply->profile_image_url);

$arr['name'] = $reply->screen_name;
$arr['image'] = $reply->profile_image_url;
print_r(json_encode($arr));
