<?php

header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$x= require_once('../php/codebird-php-develop/src/codebird.php');
\Codebird\Codebird::setConsumerKey('Nv2ZZ7Nci3iCYYx67hDYkUGYC', 'pvckS5yE0E93AgU2oH6YWgkovUpgeXgQXMIsxsojU8lxqnvNIw'); // static, see 'Using multiple Codebird instances'

//print_r($_POST) ;
$val = file_get_contents("php://input");
//print_r($val);
$data=json_decode($val);
/*echo "<br>";
print_r (strlen($data -> linkval));
echo "<br>";
print_r (strlen($data -> title));*/
//$title = $data -> title;
$linkval = $data -> linkval;
$oauth_token = $data -> oauth_token;
$oauth_token_secret = $data -> oauth_token_secret;
$image = $data -> image;
/*$logid = $_GET["id"];
$linkval = $_GET["linkval"];
$oauth_token = $_GET["oauth_token"];
$oauth_token_secret = $_GET["oauth_token_secret"];*/




$cb = \Codebird\Codebird::getInstance();
/*echo $oauth_token."<br>";
echo $oauth_token_secret."<br>";
echo $linkval."<br>";*/

// assign access token on each page load
$cb->setToken($oauth_token,$oauth_token_secret);

// print_r($cb);
$reply = $cb->account_settings();

//print_r($reply);
//print_r($reply->screen_name);

$reply = $cb->users_show(array(
    'screen_name'=>$reply->screen_name));


/*echo $oauth_token."<br>";
echo $oauth_token_secret."<br>";
echo $linkval."<br>";
exit;*/
/*print_r($reply->profile_image_url);
exit;*/
//$arr['name'] = $reply->screen_name;
//$arr['image'] = $reply->profile_image_url;
//print_r(json_encode($arr));

//$reply = $cb->statuses_update('status=Woohooooo, I just tweeted for today!!');


/*$params = array(
    //'status' => 'Welcome to my timeline....................',
    'status' => 'Checkout new gear here: https://github.com/jublonet/codebird-php/issues/77',
    'media[]' => 'http://wowslider.com/sliders/demo-85/data1/images/southtyrol350698.jpg'
);
$reply = $cb->statuses_updateWithMedia($params);
print_r($reply);*/

/*
$params1 = array(
    'status' => 'Checkout new gear here: https://github.com/jublonet/codebird-php/issues/77'
);
$reply = $cb->statuses_update($params1);*/



/*$params1 = array(
    'status' => $linkval,
   // 'status' => 'hiiiiiiiiiiii'
);
$reply = $cb->statuses_update($params1);
print_r($reply);*/

$params1 = array(
    'status' => $linkval,
    'media[]' => $image
);
$reply = $cb->statuses_updateWithMedia($params1);
print_r($reply);