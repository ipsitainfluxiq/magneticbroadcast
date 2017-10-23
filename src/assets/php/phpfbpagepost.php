<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$val = file_get_contents("php://input");
$data=json_decode($val);

$longterm_token = $data -> longterm_token;
$pageid = $data -> pageid;
$page_access_token = $data -> access_token;

$arr['access_token']=$page_access_token;
$arr['link']='http://landing1.magneticbroadcast.com/#/offer1/123';
/*print_r($arr);
print_r($pageid);
exit;*/
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://graph.facebook.com/v2.10/".$pageid."/feed",
   // CURLOPT_URL => "https://graph.facebook.com/me/?access_token=".$longterm_token."/".$pageid."/feed",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => ($arr)
));

$headers = [];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
print_r($response);
?>