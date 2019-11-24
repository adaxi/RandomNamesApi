#!/usr/bin/env nodejs

'use strict'

var Composer = require('./index')

async function startServer () {
  try {
    const server = await Composer()
    await server.start()
    console.log('Started the plot device on port ' + server.info.port)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
