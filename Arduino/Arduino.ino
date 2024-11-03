#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverAddress = "http://192.168.1.100:3000/data"; // Change to your server IP

const int analogPin = A0;  // ESP8266 analog pin

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Read analog sensor
    int sensorValue = analogRead(analogPin);
    
    // Create HTTP client
    WiFiClient client;
    HTTPClient http;
    
    // Prepare data
    String data = "value=" + String(sensorValue);
    
    // Send POST request
    http.begin(client, serverAddress);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    
    int httpCode = http.POST(data);
    
    if (httpCode > 0) {
      Serial.printf("HTTP Response: %d\n", httpCode);
    }
    
    http.end();
  }
  
  delay(5000); // Wait 5 seconds before next reading
}