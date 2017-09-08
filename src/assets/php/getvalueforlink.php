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
/*$response=$OBJ_linkedin->retrieveTokenAccess($linkoauth_token,$linkoauth_token_secret,$linkoauth_verifier);
echo "<pre>";
print_r($response);
echo "</pre>";
if($response['success'] === TRUE) {
    $_SESSION['oauth_verifier'] = $_GET['oauth_verifier'];
    // $oauth_verifier=$_GET['oauth_verifier'];
    // the request went through without an error, gather user's 'access' tokens
    $_SESSION['oauth']['linkedin']['access'] = $response['linkedin'];
}*/
//$OBJ_linkedin->setTokenAccess($_SESSION['oauth']['linkedin']['access']);
$OBJ_linkedin->setTokenAccess($arr1);
$OBJ_linkedin->setResponseFormat(LINKEDIN::_RESPONSE_XML);
$response = $OBJ_linkedin->profile('~:(id,first-name,last-name,picture-url)');
if($response['success'] === TRUE) {
    $response['linkedin'] = new SimpleXMLElement($response['linkedin']);
    //    echo "<pre>" . print_r($response['linkedin'], TRUE) . "</pre>";
    $i = $response['linkedin'];

    function object2array($object) { return @json_decode(@json_encode($object),1); }
    $xml_array=object2array($i);

    $arrnew['fname'] = $xml_array['first-name'];
    $arrnew['lname'] = $xml_array['last-name'];
    $arrnew['image'] = $xml_array['picture-url'];
    print_r(json_encode($arrnew));
}
//print_r($response);

exit;

function oauth_session_exists() {
    if((is_array($_SESSION)) && (array_key_exists('oauth', $_SESSION))) {
        return TRUE;
    } else {
        return FALSE;
    }
}

try {
    // include the LinkedIn class
    require_once('linkedin_3.2.0.class.php');

    // display constants
    $API_CONFIG = array(
        'appKey' => '86p7hc0any64sm',
        'appSecret' => 'UWR1TiVxRQZspxFK',
        'callbackUrl' => NULL
    );
    define('DEMO_GROUP', '4010474');
    define('DEMO_GROUP_NAME', 'Simple LI Demo');
    define('PORT_HTTP', '80');
    define('PORT_HTTP_SSL', '443');


    // set the callback url
    $API_CONFIG['callbackUrl'] = $protocol . '://' . $_SERVER['SERVER_NAME'] . ((($_SERVER['SERVER_PORT'] != PORT_HTTP) || ($_SERVER['SERVER_PORT'] != PORT_HTTP_SSL)) ? ':' . $_SERVER['SERVER_PORT'] : '') . $_SERVER['PHP_SELF'] . '?' . LINKEDIN::_GET_TYPE . '=initiate&' . LINKEDIN::_GET_RESPONSE . '=1';
    $OBJ_linkedin = new LinkedIn($API_CONFIG);

    // check for response from LinkedIn
    $_GET[LINKEDIN::_GET_RESPONSE] = (isset($_GET[LINKEDIN::_GET_RESPONSE])) ? $_GET[LINKEDIN::_GET_RESPONSE] : '';
    if (!$_GET[LINKEDIN::_GET_RESPONSE]) {




        $OBJ_linkedin = new LinkedIn($API_CONFIG);
        $OBJ_linkedin->setTokenAccess($_SESSION['oauth']['linkedin']['access']);
        $OBJ_linkedin->setResponseFormat(LINKEDIN::_RESPONSE_XML);

        $response = $OBJ_linkedin->profile('~:(id,first-name,last-name,picture-url)');
        if($response['success'] === TRUE) {
            $response['linkedin'] = new SimpleXMLElement($response['linkedin']);
            //    echo "<pre>" . print_r($response['linkedin'], TRUE) . "</pre>";
            $i = $response['linkedin'];
            echo "<pre>";
            print_r($i);
            echo "</pre>";
        }

        exit;

        // LinkedIn hasn't sent us a response, the user is initiating the connection

        // send a request for a LinkedIn access token
        $response = $OBJ_linkedin->retrieveTokenRequest($_GET['linkoauth_token'],$linkoauth_token_secret,$linkoauth_verifier);
        if ($response['success'] === TRUE) {

            // store the request token
           /* $_SESSION['oauth']['linkedin']['request'] = $response['linkedin'];
            $linkdn=$response['linkedin'];
            $link_oauth_token = $linkdn['oauth_token'];
            $link_oauth_token_secret = $linkdn['oauth_token_secret'];*/





            $response = $OBJ_linkedin->profile('~:(id,first-name,last-name,picture-url)');
            if($response['success'] === TRUE) {
                $response['linkedin'] = new SimpleXMLElement($response['linkedin']);
                //    echo "<pre>" . print_r($response['linkedin'], TRUE) . "</pre>";
                $i = $response['linkedin'];
                echo "<pre>";
                print_r($i);
                echo "</pre>";
            }


        }
    }
}
catch(LinkedInException $e) {
    // exception raised by library call
    echo $e->getMessage();
}
