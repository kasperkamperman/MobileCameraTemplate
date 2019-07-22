'use strict';

/*
 * Determine approximately how many EPOLLIN events can be handled per second.
 *
 * This test expects a newline as input on stdin. It polls for events on stdin
 * but doesn't read stdin until the test has completed. This results in a
 * continuous stream of events while the test is running.
 *
 * Note that the rate determined is misleading as epoll is notifying us about
 * the same newline all the time.
 *
 * The newline should be piped in for reasonable results:
 * echo | node performance-check
 */
const Epoll = require('../').Epoll;
const util = require('./util');

const stdin = 0; // fd for stdin

let time;
let count = 0;

const epoll = new Epoll((err, fd, events) => {
  count += 1;
});

setTimeout(() => {
  time = process.hrtime(time);
  const rate = Math.floor(count / (time[0] + time[1] / 1E9));
  console.log('  ' + rate + ' events per second');

  epoll.remove(stdin).close();
  util.read(stdin); // read stdin (the newline)
}, 1000);

epoll.add(stdin, Epoll.EPOLLIN);
time = process.hrtime();

