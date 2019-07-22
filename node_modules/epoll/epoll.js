module.exports = (() => {
  const osType = require('os').type();

  if (osType == 'Linux') {
    return require('bindings')('epoll.node');
  }

  console.warn(`Warning: epoll is built for Linux and not intended for usage on ${osType}.`);

  return {
    Epoll: {}
  };
})();

