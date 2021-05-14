'use strict'

const Confidence = require('confidence')

const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  $meta: 'This file configures adaxisoft-api.',
  projectName: 'adaxisoft-api',
  port: {
    api: {
      $filter: 'env',
      test: 9090,
      $default: '/var/run/adaxisoft-api/adaxisoft-api.sock'
    }
  }
}

const store = new Confidence.Store(config)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
