'use strict';

const Epoll = require('../epoll').Epoll;
const assert = require('assert');

const stdin = 0;

const poller = new Epoll(() => {});

const closePoller = () => {
  if (!poller.closed) {
    poller.remove(stdin).close();
  }
};

assert(poller.closed === false);

poller.add(stdin, Epoll.EPOLLIN);

closePoller();
closePoller();

assert(poller.closed === true);

