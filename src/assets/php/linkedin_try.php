<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');



require_once('linkedin_3.2.0.class.php');

$API_CONFIG = array(
    'appKey' => '86p7hc0any64sm',
    'appSecret' => 'UWR1TiVxRQZspxFK',
    'callbackUrl' => NULL
);
    define('CONNECTION_COUNT', 20);
    define('PORT_HTTP', '80');
    define('PORT_HTTP_SSL', '443');
    define('UPDATE_COUNT', 10);



    $val = file_get_contents("php://input");
    $data=json_decode($val);
  //  print_r($data);
    $linkval = $data -> linkval;
    $title = $data -> title;
    $logid = $data -> id;
    $arr1['oauth_token'] =  $data ->linkoauth_token;
    $arr1['oauth_token_secret'] = $data ->linkoauth_token_secret;







$OBJ_linkedin = new LinkedIn($API_CONFIG);
$OBJ_linkedin->setTokenAccess($arr1);



/*$OBJ_linkedin->setResponseFormat(LINKEDIN::_RESPONSE_XML);
$response = $OBJ_linkedin->profile('~:(id,first-name,last-name,picture-url)');
if($response['success'] === TRUE) {
    $response['linkedin'] = new SimpleXMLElement($response['linkedin']);
    //    echo "<pre>" . print_r($response['linkedin'], TRUE) . "</pre>";
    $i = $response['linkedin'];

    function object2array($object)
    {
        return @json_decode(@json_encode($object), 1);
    }

    $xml_array = object2array($i);

    $arrnew['fname'] = $xml_array['first-name'];
    $arrnew['lname'] = $xml_array['last-name'];
    $arrnew['image'] = $xml_array['picture-url'];
    print_r(json_encode($arrnew));

}*/


$content = array();

/*if(!empty($_POST['scomment'])) {
    $content['comment'] = $_POST['scomment'];
}
if(!empty($_POST['stitle'])) {
    $content['title'] = $_POST['stitle'];
}
if(!empty($_POST['surl'])) {
    $content['submitted-url'] = $_POST['surl'];
}
if(!empty($_POST['simgurl'])) {
   $content['submitted-image-url'] = $_POST['simgurl'];

}
if(!empty($_POST['sdescription'])) {
    $content['description'] = $_POST['sdescription'];
}*/


$content['comment'] = 'this is the comment';
$content['title'] = 'this is the title';
$content['description'] = 'this is the sdescription';
$content['submitted-url'] = 'https://stackoverflow.com/questions/37806237/getting-s-412-precondition-failed-invalid-arguments-error-in-linkedin-share-api';
$content['submitted-image-url'] = 'https://www.cleverfiles.com/howto/wp-content/uploads/2016/08/mini.jpg';


if(!empty($_POST['sprivate'])) {
    $private = TRUE;
} else {
    $private = FALSE;
}
$private = TRUE;




$response = $OBJ_linkedin->share('new', $content, $private);
print_r($response);

/*if($response['success'] === TRUE) {
    header('Location: ' . $_SERVER['PHP_SELF']);
} else {
   print_r($OBJ_linkedin);
}*/

?>