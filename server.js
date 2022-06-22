#!/usr/bin/env nodejs

'use strict'

import Composer from './index.js'

async function startServer () {
  try {
    const server = await Composer()
    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
