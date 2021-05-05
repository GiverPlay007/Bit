#include <SoftwareSerial.h>

SoftwareSerial esp(2, 3);

void setup()
{
  Serial.begin(9600);
  esp.begin(9600);
  delay(5000);
}

void loop()
{
  String inStr = "";
  boolean strRead = false;

  while(esp.available())
  {
    inStr = esp.readString();
    strRead = true;

    if(strRead)
    {
      Serial.println("Input: " + inStr);
    }
  }
}