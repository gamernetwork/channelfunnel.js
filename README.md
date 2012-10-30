Channelfunnel.js
================

A reimplementation of the Eurogamer Network Aggregator frontend in Node.js.

To be used as a node performance investigation tool and as an example
scaffold for future Node projects.

Attempts to bundle modules and utils providing features I'm used to having
as a Django developer (except for an ORM - there are none as good as Django
ORM yet).

Uses:

  - Express.
  - Swig.
  - Reversable-Router for DRY URLs.
    - a SWIG tag for reverse URLs.
  - pg for database access.
    - TODO switch to node-dbi, which I believe is API compatible.
  - async.
    - To help transition us from synchronous to async code.
  - config for cascading configuration files.
