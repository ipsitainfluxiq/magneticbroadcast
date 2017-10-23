<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');



$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://influxiq.com:3015/broadcastposts",
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
// print_r(($response));
$response = json_decode($response);
 print_r(($response));
echo "<br>-------------------------------------------------------------------<br>";
foreach($response as $value) {
    $newarray[] = $value->logid.$value->categoryid;
   // $newarray[] = array('logid' => $value->logid, 'categoryid' => $value->categoryid);
}
print_r($newarray);
echo "<br>-------------------------------------------------------------------<br>";
/*print_r($newarray[0]);
print_r($newarray[0]->logid);*/
/*print_r($response[0]->logid.$response[0]->categoryid);
echo "<br>";
print_r($newarray[0]);*/
for ($i = 0; $i < (count($response)); $i++)
{
   if (in_array(($response[$i]->logid.$response[$i]->categoryid), $newarray))
    {
        echo "matched";
        echo "<br>";
        $matched[] = $response[$i];
    }
    else
    {
        echo "not matched";
        echo "<br>";
        $not_matched[] = $response[$i];
    }
}
//print_r(($matched));