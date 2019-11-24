'use strict'

var Confidence = require('confidence')

var criteria = {
  env: process.env.NODE_ENV
}

var config = {
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

var store = new Confidence.Store(config)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
