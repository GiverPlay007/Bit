#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>

const char* ssid = "ssid";
const char* password = "pass";

void setup()
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.println("Connecting...");
  
  while(WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(1000);
  }
  
  Serial.println("");
  Serial.println("WiFi connection successful") ;
  Serial.print("ESP8266 IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop()
{
}
