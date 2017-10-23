<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// Start a session, load the library
session_start();

$val = file_get_contents("php://input");
$data=json_decode($val);
//print_r($data);
$longterm_token = $data -> longterm_token;
$id = $data -> id;

/*print_r($longterm_token);
print_r($id);*/


$curl = curl_init();
curl_setopt_array($curl, array(
    /*CURLOPT_URL => "https://graph.facebook.com/me?access_token=".$longterm_token.'&fields=likes{about,band_interests,global_brand_page_name,can_post}',*/
    CURLOPT_URL => "https://graph.facebook.com/me/?access_token=".$longterm_token."&fields=accounts.limit(1000){about,access_token,global_brand_page_name}",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

$headers = [];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
print_r($response);
?>
