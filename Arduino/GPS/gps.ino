#include <HardwareSerial.h>
#include <TinyGPS++.h>

// Define the serial port to use for the GPS module
HardwareSerial ss(1);

// Define the TinyGPS++ object
TinyGPSPlus gps;

void setup() {
  // Start serial communication with the ESP32
  Serial.begin(9600);
  
  ss.begin(9600, SERIAL_8N1, 16, 17);
}

void loop() {
  // Check if there is data available from the GPS module
  while (ss.available() > 0) {
    // Read the GPS data
    gps.encode(ss.read());
  }

  // Check if there is new location data available
  if (gps.location.isUpdated()) {
    // Print the latitude and longitude to the serial monitor
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
  }
}

