'use strict';

/*
 * Make sure a single EPOLLONESHOT event can be handled.
 *
 * This test expects a newline as input on stdin.
 */
const Epoll = require('../').Epoll;
const util = require('./util');

const stdin = 0; // fd for stdin 

let eventCount = 0;

const epoll = new Epoll((err, fd, events) => {
  eventCount += 1;

  if (eventCount === 1) {
    setTimeout(() => {
      util.read(fd); // read stdin (the newline)
      epoll.remove(fd).close();
    }, 100);
  } else {
    console.log('*** Error: unexpected event');
  }
});

epoll.add(stdin, Epoll.EPOLLIN | Epoll.EPOLLONESHOT);

