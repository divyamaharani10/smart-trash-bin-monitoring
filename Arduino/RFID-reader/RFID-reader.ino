#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN   22     // Reset pin for MFRC522
#define SS_PIN    21     // Slave Select pin for MFRC522

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance

void setup() {
  Serial.begin(9600);      // Initialize serial communication
  SPI.begin();             // Initialize SPI bus
  mfrc522.PCD_Init();      // Initialize MFRC522 RFID reader
  delay(500);              // Wait for MFRC522 to stabilize
}

void loop() {
  // Check if there is any card present
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    // Get the card tag and print it as a HEX string
    String tag = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      tag += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      tag += String(mfrc522.uid.uidByte[i], HEX);
    }
    Serial.println("Card Tag: " + tag);
    delay(1000);   // Wait for a second before reading another card
  }
}

