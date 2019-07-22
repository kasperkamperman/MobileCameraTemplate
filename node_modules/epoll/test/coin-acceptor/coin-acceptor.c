/*
 * This program simulates the coin acceptor discussed in
 * https://github.com/fivdi/epoll/issues/26 on an atmega328p. Every two
 * seconds the program will generate five pulses to simulate a five peso coin.
 * The program stops after simulating 10.000 coins.
 */
#include <avr/io.h>
#include <util/delay.h>

#define LED PB0
#define LED_DDR DDRB
#define LED_PORT PORTB

#define COIN_PULSE PB1
#define COIN_PULSE_DDR DDRB
#define COIN_PULSE_PORT PORTB

#define setBit(sfr, bit) (_SFR_BYTE(sfr) |= (1 << bit))
#define clearBit(sfr, bit) (_SFR_BYTE(sfr) &= ~(1 << bit))
#define toggleBit(sfr, bit) (_SFR_BYTE(sfr) ^= (1 << bit))

void ledOn() {
  setBit(LED_PORT, LED);
}

void ledOff() {
  clearBit(LED_PORT, LED);
}

void blinkLed(uint32_t seconds) {
  while (seconds > 0) {
    ledOn();
    _delay_ms(500);
    ledOff();
    _delay_ms(500);    
    --seconds;
  }
}

void generateCoinPulses() {
  uint8_t pulsesPerCoin;

  /* Generate 5 pulses for 1 coin */
  for (pulsesPerCoin = 0; pulsesPerCoin != 5; ++pulsesPerCoin) {
    clearBit(COIN_PULSE_PORT, COIN_PULSE);
    _delay_ms(20);
    setBit(COIN_PULSE_PORT, COIN_PULSE);
    _delay_ms(100);
  }
}

int main(void) {
  uint32_t coinCount;

  /* Configure LED and turn it on */
  setBit(LED_DDR, LED);
  ledOn();

  /* Configure COIN_PULSE pin and set it high */
  setBit(COIN_PULSE_DDR, COIN_PULSE);
  setBit(COIN_PULSE_PORT, COIN_PULSE);

  /* Blink LED for 10 seconds */
  /* Start Node.js program while LED blinks */
  blinkLed(10);

  for (coinCount = 0; coinCount != 10000; ++coinCount) {
    _delay_ms(2000);
    ledOn();
    generateCoinPulses();
    ledOff();
  }

  ledOn();

  while (1);

  return (0);
}

