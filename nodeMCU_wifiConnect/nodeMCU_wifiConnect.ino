#include <ESP8266WiFi.h>

const char* ssid = "ssid";
const char* pwd = "pwd"; 


void setup() {
  Serial.begin(9600);
  

  Serial.println("");
  Serial.println("it's on!");

  WiFi.begin(ssid, pwd);
  
  Serial.println("");
  Serial.println("connecting");
  while(WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println("");
  Serial.println(WiFi.localIP() );
  }

void loop() {
  // put your main code here, to run repeatedly:

}
