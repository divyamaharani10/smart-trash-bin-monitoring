#include <MFRC522.h>
#include <NewPing.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#define WIFI_SSID "Grateful"
#define WIFI_PASSWORD "Fw902902$&@"
#define API_KEY "AIzaSyBHU4RdWH-Gd_xgW13hrASRx8wkCPFETUo"
#define DATABASE_URL "https://esp-32-data-bc47b-default-rtdb.asia-southeast1.firebasedatabase.app" 

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

#define RST_PIN         22          // Configurable, see typical pin layout above
#define SS_PIN          21  

#define TRIGGER_PIN     4
#define ECHO_PIN        2
#define MAX_DISTANCE    500

MFRC522 rfid(SS_PIN, RST_PIN); // Create MFRC522 instance.
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // Create NewPing instance.
byte authorizedTag[] = {0x8a, 0xea, 0xed, 0x0e}; // Replace with the tag you want to authorize
int distance = 0; // Variable to hold distance measurement
String temp;

void setup() {
  Serial.begin(9600); // Initialize serial communication
  SPI.begin();        // Initialize SPI bus
  rfid.PCD_Init();     // Initialize MFRC522
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
  distance = sonar.ping_cm(); // Measure the distance in cm
  temp = "Access denied";
  if (distance < 10) { // Check if distance is less than 10cm
    // Look for new RFID cards
    if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
      // Check if the RFID tag matches the authorized tag
      if (memcmp(rfid.uid.uidByte, authorizedTag, sizeof(authorizedTag)) == 0) {
        temp = "Access granted";
        Serial.println("Access granted");
        delay(10000); // Wait for 1 second
      } else {
        temp = "Access denied";
        Serial.println("Access denied");
        delay(10000); // Wait for 1 second
        }
      rfid.PICC_HaltA(); // Halt PICC
      rfid.PCD_StopCrypto1(); // Stop encryption on PCD
    }  
  }
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(5000); 
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    Firebase.RTDB.setInt(&fbdo, "data/distance", distance);
    Firebase.RTDB.setString(&fbdo, "data/authority", temp);        
  }
}


