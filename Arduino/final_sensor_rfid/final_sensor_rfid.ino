#include <MFRC522.h>
#include <NewPing.h>

#define RST_PIN         22          // Configurable, see typical pin layout above
#define SS_PIN          21  

#define TRIGGER_PIN     4
#define ECHO_PIN        2
#define MAX_DISTANCE    500

MFRC522 rfid(SS_PIN, RST_PIN); // Create MFRC522 instance.
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // Create NewPing instance.

byte authorizedTag[] = {0x8a, 0xea, 0xed, 0x0e}; // Replace with the tag you want to authorize
int distance = 0; // Variable to hold distance measurement

void setup() {
  Serial.begin(9600); // Initialize serial communication
  SPI.begin();        // Initialize SPI bus
  rfid.PCD_Init();     // Initialize MFRC522
}

void loop() {
  distance = sonar.ping_cm(); // Measure the distance in cm
  if (distance < 10) { // Check if distance is less than 10cm
    // Look for new RFID cards
    if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
      // Check if the RFID tag matches the authorized tag
      if (memcmp(rfid.uid.uidByte, authorizedTag, sizeof(authorizedTag)) == 0) {
        Serial.println("Access granted");
        delay(10000); // Wait for 1 second
      } else {
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
}

