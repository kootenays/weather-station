#include "config.h"

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include <ArduinoJson.h> //ArduinoJson Library Source: https://github.com/bblanchon/ArduinoJson

// MQTT topics for the device
#define AWS_IOT_PUBLISH_TOPIC "devices/" THINGNAME "/data"
#define AWS_IOT_SUBSCRIBE_TOPIC "devices/" THINGNAME "/data"

BearSSL::X509List client_crt(AWS_CERT_CRT);
BearSSL::PrivateKey client_key(AWS_CERT_PRIVATE);
BearSSL::X509List rootCert(AWS_CERT_CA);

WiFiClientSecure wiFiClient;
void messageReceived(char *topic, byte *payload, unsigned int len);
PubSubClient pubSubClient(AWS_IOT_ENDPOINT, 8883, messageReceived, wiFiClient);

/**
 * Set the current time for the device from the NTP Server. Without syncing this
 * properly, the connection will fail as our certificates are likely to be
 * flagged as expired.
 */
void setCurrentTime()
{
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2)
  {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}

time_t printLocalTime()
{
  time_t rawtime;
  struct tm *timeinfo;
  time(&rawtime);
  timeinfo = localtime(&rawtime);

  return rawtime;
}

/**
 * Connect to the WiFi
 */
void connectWiFi()
{

  // Then try to connect
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.print(", WiFi connected, IP address: ");
  Serial.println(WiFi.localIP());
}

/**
 * Connect to the AWS MQTT Broker
 */
void connectAWS()
{
  if (!pubSubClient.connected())
  {
    Serial.print("PubSubClient connecting to: ");
    Serial.println(AWS_IOT_ENDPOINT);
    while (!pubSubClient.connected())
    {
      Serial.print("Attempting MQTT connection...");
      // Attempt to connect until it works
      if (!pubSubClient.connect(THINGNAME))
      {
        Serial.print("failed, rc=");
        Serial.print(pubSubClient.state());
        Serial.println(" try again in 5 seconds");

        char buf[256];
        wiFiClient.getLastSSLError(buf, 256);
        Serial.print("WiFiClientSecure SSL error: ");
        Serial.println(buf);

        // Wait 5 seconds before retrying
        delay(5000);
      }
    }
    Serial.println(" connected");
    pubSubClient.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
  }
}

/**
 * Setup the device
 */
void setup()
{
  // Setup serial for debugging
  Serial.begin(115200);
  Serial.println();

  Serial.println("ESP8266 - Initializing");

  // Setup the certificates for the WiFi
  wiFiClient.setTrustAnchors(&rootCert);
  wiFiClient.setClientRSACert(&client_crt, &client_key);

  connectWiFi();
  setCurrentTime();
  connectAWS();
}

unsigned long lastPublish;
int msgCount;

/**
 * Publish a message to the MQTT Broker
 */
void publishMessage()
{
  // TODO: Send data from sensors and setup the time to send as unix timestamp
  time_t now = time(nullptr);

  // Create a JSON document of size 200 bytes, and populate it
  // See https://arduinojson.org/
  StaticJsonDocument<200> doc;
  doc["timestamp"] = ctime(&now);
  doc["humidity"] = random(100);
  //  doc["temperature"] = random(100000);
  // doc["barometric_pressure"] = random(200000);
  // doc["wind_speed"] = random(100);
  // doc["wind_direction"] = random(360);
  // doc["rainfall"] = random(500);
  // doc["snowfall"] = random(500);
  // doc["precipitation"] = random(500);
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  // Publish to the topic
  // String msg = String("Hello from ESP8266: ");
  pubSubClient.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
  Serial.print("Sent a message to: ");
  Serial.println(AWS_IOT_PUBLISH_TOPIC);
}

/**
 * The callback when it receives a message from the broker it subscribes to
 */
void messageReceived(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message received on ");
  Serial.print(topic);
  Serial.print(": ");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void loop()
{
  publishMessage();
  pubSubClient.loop();
  delay(5000);
}
