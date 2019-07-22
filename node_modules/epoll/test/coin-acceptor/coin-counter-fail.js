"use strict";

// This program fails to detect all the pulses for 10.000 five peso coins.
// Each pulse is low for 20 milliseconds and high for 100 milliseconds. The
// program fails to detect approximately 7% of the pulses. The failures occur
// because the program blocks the main JavaScript thread by executing
// synchronous code for 30 milliseconds once per second. 

const Gpio = require('onoff').Gpio;

const coinPulse = new Gpio(21, 'in', 'both');
let fallingPulses = 0;
let risingPulses = 0;
let errors = 0;

const sleepus = (usDelay) => {
  let startTime = process.hrtime();
  let deltaTime;
  let usWaited = 0;

  while (usDelay > usWaited) {
    deltaTime = process.hrtime(startTime);
    usWaited = (deltaTime[0] * 1E9 + deltaTime[1]) / 1000;
  }
};

setInterval(() => {
  console.log(
    'fallingPulses: ' + fallingPulses +
     ', risingPulses: ' + risingPulses +
     ', errors: ' + errors
  );
}, 1000);

setInterval(() => {
  sleepus(30000); // Blocks for approx. 30 milliseconds
}, 100);

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

