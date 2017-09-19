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
print_r($oauth_token_secret);
exit;*/

$tum_oauth = new TumblrOAuth($consumer_key, $consumer_secret, $oauth_token,$oauth_token_secret);
$userinfo = $tum_oauth->get('http://api.tumblr.com/v2/user/info');
//print_r($userinfo);
$screen_name = $userinfo->response->user->name;

//print_r($screen_name);
//$imageurl='https://api.tumblr.com/v2/blog/'.$screen_name.'.tumblr.com/avatar';
//$arr['name'] = $userinfo->response->user->name;
//$arr['image'] = $imageurl;
// print_r(json_encode($arr));
//echo json_encode($arr);

/*$arrMessage = array(
    'type' => 'photo',
    'caption' => 'Photo details',
    'source' =>'https://pixabay.com/en/image-flower-nature-delicate-flower-2747860/',
              'format' => 'html'
              );*/

//$test=$tum_oauth->post('https://api.tumblr.com/v2/blog/'.$screen_name.'/post',array('state'=>'published','type'=>'text','title'=>'this is new test from api by Ipsita','body'=>'new test by Ipsita and its  body'));


//$test=$tum_oauth->post('https://api.tumblr.com/v2/blog/'.$screen_name.'/post',array('type'=>'photo','caption'=>'Photo details','source'=>'https://cdn.pixabay.com/photo/2016/08/04/11/21/painted-lady-1568926_960_720.jpg','link'=>'http://www.cuelogic.com/blog/integration-of-tumblr-api-with-php/','format' => 'jpg'));

$test=$tum_oauth->post('https://api.tumblr.com/v2/blog/'.$screen_name.'/post',array('type'=>'link','caption'=>'Photo details','source'=>'https://cdn.pixabay.com/photo/2016/08/04/11/21/painted-lady-1568926_960_720.jpg','link'=>'http://www.cuelogic.com/blog/integration-of-tumblr-api-with-php/',
    "description"=> "<blockquote>\n<p>On my Ipad, of course!<\/p><p>Nothing better than the latest technology to get the job done.Look at all my apps!<\/p> <p><img height=\"555\" width=\"500\" src=\"http:\/\/farm5.static.flickr.com\/4006\/4445161463_31da0327c2_o.jpg\" alt=\"my iPad\"\/><\/p><p>My favourite markers are an Edding 400, a Sharpie and a
                Copic Ciao. The white gouache is from Dr Martins and does a
                decent job covering up whatever needs to be covered up, and
                flows.<\/p><\/blockquote>"));


var_dump($test);
?>
