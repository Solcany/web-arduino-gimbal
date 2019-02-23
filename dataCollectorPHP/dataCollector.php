<?php

/*
  ESP8266: send data to your Domain(or mine)
  Embedded-iot.net/dht11/dataCollector.php

  Uses POST command to send DHT data to a designated website
  The circuit:
  * DHT
  * Post to Domain

   Stephen Borsay
   Embedded-iot.net
   www.udemy.com/all-about-arduino-wireless
   https://www.hackster.io/detox
   https://github.com/sborsay/Arduino_Wireless
*/


date_default_timezone_set("America/Los_Angeles");
$TimeStamp = "The current time is " . date("h:i:sa");
file_put_contents('dataDisplayer.html', $TimeStamp, FILE_APPEND);


   if( $_REQUEST["Val"]) 
   {
   echo " The VAL is: ". $_REQUEST['Val']. "<br />";
   }
	  
	
$var1 = $_REQUEST['Val'];


$WriteMyRequest=
"<p> The val is : "       . $var1 . " </p>";


file_put_contents('dataDisplayer.html', $WriteMyRequest, FILE_APPEND);


?>