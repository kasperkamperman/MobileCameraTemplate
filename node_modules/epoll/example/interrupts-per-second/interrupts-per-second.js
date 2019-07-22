'use strict';

const Epoll = require('../../').Epoll;
const fs = require('fs');

const value = Buffer.alloc(1); // The three Buffers here are global
const zero = Buffer.from('0'); // to improve performance.
const one = Buffer.from('1');

const inputfd = fs.openSync('/sys/class/gpio/gpio7/value', 'r+');
const outputfd = fs.openSync('/sys/class/gpio/gpio8/value', 'r+');

let count = 0;

// Create a new Epoll. The callback is the interrupt handler.
const poller = new Epoll((err, fd, events) => {
  count += 1;

  // Read GPIO value file. Reading also clears the interrupt.
  fs.readSync(inputfd, value, 0, 1, 0);

  // Toggle GPIO value. This will eventually result
  // in the next interrupt being triggered.
  const nextValue = value[0] === zero[0] ? one : zero;
  fs.writeSync(outputfd, nextValue, 0, nextValue.length, 0);
});

let time = process.hrtime(); // Get start time.

// Start watching for interrupts. This will trigger the first interrupt
// as the value file already has data waiting for a read.
poller.add(inputfd, Epoll.EPOLLPRI);

// Print interrupt rate to console after 5 seconds.
setTimeout(() => {
  time = process.hrtime(time); // Get run time.
  const rate = Math.floor(count / (time[0] + time[1] / 1E9));
  console.log(rate + ' interrupts per second');

  // Stop watching.
  poller.remove(inputfd).close();
}, 5000);

