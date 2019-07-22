[![Build Status](https://travis-ci.org/fivdi/epoll.svg?branch=master)](https://travis-ci.org/fivdi/epoll)
[![npm Version](http://img.shields.io/npm/v/epoll.svg)](https://www.npmjs.com/package/epoll)
[![Downloads Per Month](http://img.shields.io/npm/dm/epoll.svg)](https://www.npmjs.com/package/epoll)

# epoll

A low-level **Node.js** binding for the Linux epoll API for monitoring multiple
file descriptors to see if I/O is possible on any of them.

This module was initially written to detect EPOLLPRI events indicating that
urgent data is available for reading. EPOLLPRI events are triggered by
interrupt generating [GPIO](https://www.kernel.org/doc/Documentation/gpio/)
pins. The epoll module is used by [onoff](https://github.com/fivdi/onoff)
to detect such interrupts.

epoll supports Node.js versions 4, 6, 8, 10 and 12.

## Installation

Note that although it should be possible to install epoll on non-Linux systems
the functionality offered by epoll is only available on Linux systems.

```
npm install epoll
```

## API

  * Epoll(callback) - Constructor. The callback is called when epoll events
    occur and it gets three arguments (err, fd, events).
  * add(fd, events) - Register file descriptor fd for the event types specified
    by events.
  * remove(fd) - Deregister file descriptor fd.
  * modify(fd, events) - Change the event types associated with file descriptor
    fd to those specified by events.
  * close() - Deregisters all file descriptors and free resources.

Event Types

  * Epoll.EPOLLIN
  * Epoll.EPOLLOUT
  * Epoll.EPOLLRDHUP
  * Epoll.EPOLLPRI
  * Epoll.EPOLLERR
  * Epoll.EPOLLHUP
  * Epoll.EPOLLET
  * Epoll.EPOLLONESHOT

Event types can be combined with | when calling add or modify. For example,
Epoll.EPOLLPRI | Epoll.EPOLLONESHOT could be passed to add to detect a single
GPIO interrupt.

## Example - Watching Buttons

The following example shows how epoll can be used to detect interrupts from a
momentary push-button connected to GPIO #4 (pin P1-7) on the Raspberry Pi.
The source code is available in the
[example directory](https://github.com/fivdi/epoll/tree/master/example/watch-button)
and can easily be modified for using a different GPIO on the Pi or a different
platform such as the BeagleBone.

The first step is to export GPIO #4 as an interrupt generating input using
the export bash script from the examples directory.

```
./export
```

export:

```bash
#!/bin/sh
echo 4 > /sys/class/gpio/export
sleep 1
echo in > /sys/class/gpio/gpio4/direction
echo both > /sys/class/gpio/gpio4/edge
```

Then run watch-button to be notified every time the button is pressed and
released. If there is no hardware debounce circuit for the push-button, contact
bounce issues are very likely to be visible on the console output.
watch-button terminates automatically after 30 seconds.

```
node watch-button
```

watch-button:

```js
const Epoll = require('epoll').Epoll;
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
```

When watch-button has terminated, GPIO #4 can be unexported using the
unexport bash script.

```
./unexport
```

unexport:

```bash
#!/bin/sh
echo 4 > /sys/class/gpio/unexport
```

## Example - Interrupts Per Second

The following example shows how epoll can be used to determine the number of
hardware interrupts that can be handled per second on the Raspberry Pi.
The source code is available in the
[example directory](https://github.com/fivdi/epoll/tree/master/example/interrupts-per-second)
and can easily be modified to use different GPIOs on the Raspberry Pi or a
different platform such as the BeagleBone.

In this example, GPIO #7 is wired to one end of a 1kΩ current limiting
resistor and GPIO #8 is wired to the other end of the resistor. GPIO #7 is an
input and GPIO #8 is an output.

The first step is to export GPIOs #7 and #8 using the export bash script from
the examples directory.

```
./export
```

export:

```bash
#!/bin/sh
echo 7 > /sys/class/gpio/export
echo 8 > /sys/class/gpio/export
sleep 1
echo in > /sys/class/gpio/gpio7/direction
echo both > /sys/class/gpio/gpio7/edge
echo out > /sys/class/gpio/gpio8/direction
```

Then run interrupts-per-second. interrupts-per-second toggles the state of the
output every time it detects an interrupt on the input. Each toggle will
trigger the next interrupt. After five seconds, interrupts-per-second prints
the number of interrupts it detected per second.

```
node interrupts-per-second
```

interrupts-per-second:

```js
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
```

When interrupts-per-second has terminated, GPIOs #7 and #8 can be unexported
using the unexport bash script.

```
./unexport
```

unexport:

```bash
#!/bin/sh
echo 7 > /sys/class/gpio/unexport
echo 8 > /sys/class/gpio/unexport
```

Here are some results from the "Interrupts Per Second" example.

**Raspberry Pi 3, 1.2Ghz, Raspbian:**

node | epoll | kernel | interrupts / sec
:---: | :---: | :---: | ---:
v10.7.0 | v2.0.2 | 4.14.50-v7+ | 22468
v8.11.3 | v2.0.2 | 4.14.50-v7+ | 21022
v6.14.3 | v2.0.2 | 4.14.50-v7+ | 22745
v4.9.1 | v2.0.2 | 4.14.50-v7+ | 21693

