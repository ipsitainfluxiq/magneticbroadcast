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

/*
$logid = $_GET["id"];
$linkoauth_token = $_GET["linkoauth_token"];
$linkoauth_token_secret = $_GET["linkoauth_token_secret"];
//$linkoauth_verifier = $_GET["linkoauth_verifier"];


$arr['oauth_token'] = $linkoauth_token;
$arr1['oauth_token'] = '3ead89f4-0cdc-4699-8623-102f993bc468';
$arr['oauth_token_secret'] = $linkoauth_token_secret;
$arr1['oauth_token_secret'] = 'b6303b4d-1e89-465a-9e34-672f892f350d';
$arr['oauth_verifier'] = $linkoauth_verifier;*/
$logid = $_GET["id"];
$arr1['oauth_token'] = $_GET["linkoauth_token"];
$arr1['oauth_token_secret'] = $_GET["linkoauth_token_secret"];

require_once('linkedin_3.2.0.class.php');
$API_CONFIG = array(
    'appKey' => '86p7hc0any64sm',
    'appSecret' => 'UWR1TiVxRQZspxFK',
    'callbackUrl' => NULL
);
define('DEMO_GROUP', '4010474');
define('DEMO_GROUP_NAME', 'Simple LI Demo');
define('PORT_HTTP', '80');
define('PORT_HTTP_SSL', '443');


$OBJ_linkedin = new LinkedIn($API_CONFIG);
$OBJ_linkedin->setTokenAccess($arr1);
$OBJ_linkedin->setResponseFormat(LINKEDIN::_RESPONSE_XML);

/*$response = $OBJ_linkedin->profile('~:(id,first-name,last-name,picture-url)');
if($response['success'] === TRUE) {
    $response['linkedin'] = new SimpleXMLElement($response['linkedin']);
    $i = $response['linkedin'];
    function object2array($object) { return @json_decode(@json_encode($object),1); }
    $xml_array=object2array($i);

    /* $arrnew['fname'] = $xml_array['first-name'];
    $arrnew['lname'] = $xml_array['last-name'];
    $arrnew['image'] = $xml_array['picture-url'];
    print_r(json_encode($arrnew));*/
//}

$title = 'this is title';
$hasParams = true;
$description = 'this is description';
$comment = ' this is comment';

$post = array('comment' => $comment, 'content' => array('title' => $title, 'description' => $description));

$response = $OBJ_linkedin->post('/people/~/shares', $post);
if($response['success'] === TRUE) {
    $response['linkedin'] = new SimpleXMLElement($response['linkedin']);
    $i = $response['linkedin'];
    function object2array($object) { return @json_decode(@json_encode($object),1); }
    $xml_array=object2array($i);

    /* $arrnew['fname'] = $xml_array['first-name'];
    $arrnew['lname'] = $xml_array['last-name'];
    $arrnew['image'] = $xml_array['picture-url'];
    print_r(json_encode($arrnew));*/
}