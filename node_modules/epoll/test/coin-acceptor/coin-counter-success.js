"use strict";

// This program successfully detects the pulses for 10.000 five peso coins.

const Gpio = require('onoff').Gpio;

const coinPulse = new Gpio(21, 'in', 'both');
let fallingPulses = 0;
let risingPulses = 0;
let errors = 0;

setInterval(() => {
  console.log(
    'fallingPulses: ' + fallingPulses +
     ', risingPulses: ' + risingPulses +
     ', errors: ' + errors
  );
}, 1000);

coinPulse.watch((err, value) => {
  if (err) {
    throw err;
  }

  if (value === 0) {
    fallingPulses += 1;
  } else if (value === 1) {
    risingPulses += 1;
  } else {
    errors += 1;
  }
});

