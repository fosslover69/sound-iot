#include <WiFi.h>
#include <HTTPClient.h>

// Replace ssid and password
const char* ssid = "YourWifiSSID";
const char* password = "YourWifiPassword";

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  pinMode(15, INPUT);
  // Send HTTP GET request
}

void loop() {

    HTTPClient http;
  http.begin("http://serverip:5173/update"); // Replace with your local server IP
  int value = digitalRead(15);
  Serial.println(value);
  if(value>0){
  int httpCode = http.GET();
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.println(httpCode);
  }
  }
  http.end();
  delay(500);
}
