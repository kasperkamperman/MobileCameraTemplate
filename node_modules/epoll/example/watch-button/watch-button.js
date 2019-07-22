'use strict';

const Epoll = require('../../').Epoll;
const fs = require('fs');

const valuefd = fs.openSync('/sys/class/gpio/gpio4/value', 'r');
const buffer = Buffer.alloc(1);

// Create a new Epoll. The callback is the interrupt handler.
const poller = new Epoll((err, fd, events) => {
  // Read GPIO value file. Reading also clears the interrupt.
  fs.readSync(fd, buffer, 0, 1, 0);
  console.log(buffer.toString() === '1' ? 'pressed' : 'released');
});

// Read the GPIO value file before watching to
// prevent an initial unauthentic interrupt.
fs.readSync(valuefd, buffer, 0, 1, 0);

// Start watching for interrupts.
poller.add(valuefd, Epoll.EPOLLPRI);

// Stop watching after 30 seconds.
setTimeout(() => {
  poller.remove(valuefd).close();
}, 30000);

