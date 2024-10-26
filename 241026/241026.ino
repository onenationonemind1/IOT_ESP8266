#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// WiFi credentials
const char* ssid = "TOMNTOMSGuest";
const char* password = "t1234567890";

// Server settings
const char* serverIP = "172.30.1.50";  // Replace with your computer's IP
const int serverPort = 3000;

const int analogPin = A0;
unsigned long previousMillis = 0;
const long interval = 5000;

void setup() {
  Serial.begin(115200);
  pinMode(analogPin, INPUT);
  
  Serial.println("\nConnecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void sendSensorData(int sensorValue) {
  WiFiClient client;
  HTTPClient http;
  
  String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/data";
  String postData = "value=" + String(sensorValue);
  
  Serial.println("Sending data to: " + url);
  Serial.println("Data: " + postData);
  
  http.begin(client, url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
  int httpCode = http.POST(postData);
  
  if (httpCode > 0) {
    Serial.printf("HTTP Response: %d\n", httpCode);
    String response = http.getString();
    Serial.println("Server response: " + response);
  } else {
    Serial.println("Error sending data");
  }
  
  http.end();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected!");
    return;
  }
  
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    
    int sensorValue = analogRead(analogPin);
    Serial.print("Sensor value: ");
    Serial.println(sensorValue);
    
    sendSensorData(sensorValue);
  }
}