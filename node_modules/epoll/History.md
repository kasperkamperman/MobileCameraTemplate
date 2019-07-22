2.0.9 - Mar 14 2019
===================
  * update dependencies (nan v2.13.0, jshint v2.10.2)

2.0.8 - Mar 02 2019
===================
  * add simple stub for non-linux installs
  * don't compile epoll.cc on non-linux systems
  * lint with jshint
  * add travis build

2.0.7 - Dec 19 2018
===================
  * fix deprecation warnings on node.js v12 nightly
  * update dependencies (nan v2.12.1, bindings v1.3.1)

2.0.6 - Oct 14 2018
===================
  * suppress warnings complaining about casting between incompatible function types (see https://github.com/nodejs/nan/issues/807)

2.0.5 - Oct 13 2018
===================
  * fix deprecation warnings on node.js v10.12 (see https://github.com/nodejs/nan/pull/811)

2.0.4 - Sep 29 2018
===================
  * update dependencies (nan v2.11.1)
  * adapt to V8 7.0: replace v8Value->Int32Value() with Nan::To<int32_t>(v8Value).FromJust()

2.0.3 - Jul 28 2018
===================
  * code style

2.0.2 - Jul 22 2018
===================
  * add coin acceptor stress test
  * replace new Buffer with Buffer.from or Buffer.alloc
  * sleep for one second after exporting gpios to avoid permission issues
  * construct AsyncResource for callback when callback is stored

2.0.1 - Apr 02 2018
===================
  * update dependencies (nan v2.10.0)

2.0.0 - Feb 25 2018
===================
  * update dependencies (nan v2.9.2)
  * fix deprecations
  * drop support for node.js v0.10, v0.12, v5 and v7

1.0.2 - Dec 24 2017
===================
  * don't suppress deprecated-declaration warnings
  * nan 2.8.0

1.0.1 - Nov 04 2017
===================
  * suppress deprecated-declaration warnings
  * document node 9 support

1.0.0 - Oct 15 2017
===================
  * update dependencies (bindings v1.3.0, nan v2.7.0)
  * document supported node versions

0.1.22 - Jun 18 2017
====================
  * nan 2.6.2

0.1.21 - Feb 12 2017
====================
  * require node v0.10 or higher
  * nan 2.5.1

0.1.20 - Jul 22 2016
====================
  * document dependency on Linux
  * nan 2.4.0

0.1.19 - May 03 2016
====================
  * add accessor for closed property to instance template

0.1.18 - Apr 27 2016
====================
  * upgrade to NAN v2.3.2 for Node.js v6.0.0 compatability

0.1.17 - Jan 29 2016
====================
  * nan 2.2.0
  * documentation

0.1.16 - Oct 10 2015
====================
  * documentation
  * nan 2.1.0

0.1.15 - Aug 24 2015
====================
  * fix null passed to callback

0.1.14 - Aug 24 2015
====================
  * nan2 migration

0.1.13 - May 07 2015
====================
  * io.js v2.0.0+ compatibility [#13](https://github.com/fivdi/epoll/issues/13)

0.1.12 - Feb 10 2015
====================
  * nan 1.6.2
  * refactored interrupts-per-second example [#11](https://github.com/fivdi/epoll/issues/11)

0.1.11 - Jan 17 2015
====================
  * support io.js [#10](https://github.com/fivdi/epoll/issues/10)

0.1.10 - Nov 02 2014
====================
  * nan 1.4.0

0.1.9 - Aug 09 2014
===================
  * nan 1.3.0

0.1.8 - Jul 12 2014
===================
  * nan 1.2.0
  * bindings 1.2.1

0.1.7 - May 29 2014
===================
  * Fixed date in History.md

0.1.6 - May 29 2014
===================
  * Replace NanSymbol with NanNew<v8:String> [#9](https://github.com/fivdi/epoll/issues/9)

0.1.5 - May 04 2014
===================
  * nan 1.0.0 alignment [#8](https://github.com/fivdi/epoll/issues/8)

0.1.4 - Apr 18 2014
===================
  * Documented BeagleBone Ångström prerequisites
  * Use bindings for laoding

0.1.3 - Mar 23 2014
===================
  * 0.11.5+ compatibility [#7](https://github.com/fivdi/epoll/issues/7)
  * Updated dependencies: nan 0.6.2 -> 0.8.0

0.1.2 - Nov 21 2013
===================
  * 0.11.9+ compatibility [#6](https://github.com/fivdi/epoll/issues/6)
  * Updated dependencies: nan 0.5.2 -> 0.6.0

0.1.1 - Nov 19 2013
===================
  * A hopefully successfull attempt to fix an npm install issue

0.1.0 - Nov 18 2013
===================
  * Updated dependencies: nan 0.4.1 -> 0.5.2
  * removed using namespace v8 (bad practice)

0.0.8 - Oct 14 2013
===================
  * Epoll thread code improved (#4)
  * EINTR handling (#3)

0.0.7 - Oct 05 2013
===================
  * closed property added (#1)
  * Segfault issue fixed (#5)
  * add and modify now accept Epoll.EPOLLET as an event (#2)

0.0.6 - Oct 01 2013
===================
  * Example for watching outputs added
  * Tests improved

0.0.5 - Sep 25 2013
===================
  * Link removed from readme

0.0.4 - Sep 25 2013
===================
  * Url in readme fixed so that it displays correctly at npmjs.org, hopefully

0.0.3 - Sep 25 2013
===================
  * Content added to readme
  * Examples for the BeagleBone and RaspberryPi
  * Minor bug fixes
  * Tests improved

0.0.2 - Sep 22 2013
===================
  * Tests extended and improved
  * Allow installation on non-Linux systems but provide no functionality (needed for firmata-pi tests)

0.0.1 - Sep 22 2013
===================
  * Initial release

