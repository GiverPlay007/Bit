#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>

using namespace websockets;

const char* ssid = ssid
const char* password = "pass";
const char* token = "0fa0a0sad0ais";
const char* server_uri = "ws://192.168.100.31:3001/esp";

WebsocketsClient client;

void onMessageCallback(WebsocketsMessage message)
{
   Serial.print("Received message: ");
   Serial.println(message.data());
}

void onEventCallback(WebsocketsEvent event, String data)
{
  if(event == WebsocketsEvent::ConnectionOpened)
  {
    Serial.println("Connnection Opened");
  } 
  else if(event == WebsocketsEvent::ConnectionClosed)
  {
    Serial.println("Connnection Closed");
  }
  else if(event == WebsocketsEvent::GotPing)
  {
    Serial.println("Got a Ping!");
  }
  else if(event == WebsocketsEvent::GotPong)
  {
    Serial.println("Got a Pong!");
  }
}

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

  client.onMessage(onMessageCallback);
  client.onEvent(onEventCallback);

  client.connect(server_uri);
  client.send("Hello There!");
  client.ping();
}

void loop()
{
  client.poll();
}
