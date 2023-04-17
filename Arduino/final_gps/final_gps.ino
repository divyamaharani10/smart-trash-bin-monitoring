#include <Adafruit_SSD1306.h>
#include <splash.h>
#include <Wire.h>
#include <TinyGPS++.h>

#include <NewPing.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>


#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#define WIFI_SSID "wifi_name"
#define WIFI_PASSWORD "wifi_password"
#define API_KEY "AIzaSyBHU4RdWH-Gd_xgW13hrASRx8wkCPFETUo"
#define DATABASE_URL "https://esp-32-data-bc47b-default-rtdb.asia-southeast1.firebasedatabase.app" 

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

#define RXD2 16
#define TXD2 17
HardwareSerial neogps(1);

TinyGPSPlus gps;

void setup() {
  Serial.begin(9600);
  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);
  delay(2000);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  boolean newData = false;
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
   
    while (neogps.available())
    {
      Serial.println(gps.encode(neogps.read()));     
      if (gps.encode(neogps.read()))
      {
        newData = true;
      }
    }
  }

  if(newData == true)
  {
    newData = false;
    Serial.println(gps.satellites.value());
    print_location();
  }
  else
  {
    Serial.println(gps.encode(neogps.read()));

    Serial.println("No Data, please move to a better location because newdata is false"); 
  }  
  
}

void print_location()
{    
  if (gps.location.isValid() == 1){
    Serial.print("Lat: ");
    Serial.println(gps.location.lat(),6);
    Serial.print("Lng: ");
    Serial.println(gps.location.lng(),6);
    Serial.print("SAT:");
    Serial.println(gps.satellites.value());
    Serial.print("ALT:");
    Serial.println(gps.altitude.meters(), 0);
    if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
      sendDataPrevMillis = millis();
      Firebase.RTDB.setInt(&fbdo, "location/lat", gps.location.lat());
      Firebase.RTDB.setInt(&fbdo, "location/lng", gps.location.lng());
      Firebase.RTDB.setInt(&fbdo, "location/sat", gps.satellites.value());  
      Firebase.RTDB.setInt(&fbdo, "location/alt", gps.altitude.meters());          
    }
  }
  else
  {
    Serial.println("No Data, please move to a better location"); 
  }  

}
