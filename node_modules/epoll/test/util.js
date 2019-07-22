'use strict';

const fs = require('fs');

module.exports = {
  read: (fd) => {
    const buf = Buffer.alloc(1024);
    fs.readSync(fd, buf, 0, buf.length, null);
  }
};

