void setup()
{
  Serial.begin(9600);
}

void loop()
{
  Serial.write("Hello");
  delay(2000);
}