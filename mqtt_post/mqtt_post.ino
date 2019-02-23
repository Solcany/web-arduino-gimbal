#include <MQTT.h>
#include <MQTTClient.h>

#include <ESP8266WiFi.h>

 
const char ssid[] = "";
const char pass[] = "";
const char mqttkey[] = "";
const char mqttpw[] = "";
 
WiFiClient net;
MQTTClient client;

unsigned long lastMillis = 0;
 
void connect() {
  Serial.print("checking wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("WiFi Connected!");
  Serial.print("IP address: ");
  Serial.println(net.localIP());
  delay(2000);
  Serial.println("connecting to MQTT broker...");
  while (!client.connect("msolcany", mqttkey, mqttpw)) {
    Serial.print(".");
    delay(1000);
  }
 
  Serial.println("\nconnected!");
 
  client.subscribe("/nodemcu");
  // client.unsubscribe("/hello");
}
 
void messageReceived(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);
}
 
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
 
  // Note: Local domain names (e.g. "Computer.local" on OSX) are not supported by Arduino.
  // You need to set the IP address directly.
  client.begin("broker.shiftr.io",net);
  client.onMessage(messageReceived);
 
  connect();
}
 
void loop() {
  client.loop();
  delay(10);  // <- fixes some issues with WiFi stability
//  int err = SimpleDHTErrSuccess;
//  if ((err = dht22.read2(&temperature, &humidity, NULL)) != SimpleDHTErrSuccess) {
//    Serial.print("Read DHT22 failed, err="); Serial.println(err);delay(2000);
//    return;
//  }
 
//  Serial.print((float)temperature); Serial.print(" *C, ");
//  Serial.print((float)humidity); Serial.println(" RH%");
  delay(2000);
  if (!client.connected()) {
    connect();
  }
 
  // publish a message roughly every second.
  if (millis() - lastMillis > 5000) {
    lastMillis = millis();
    client.publish("nodemcu/vals", (String) random(10));
  }
}
