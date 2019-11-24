'use strict'

var Confidence = require('confidence')
var Config = require('./config')

var criteria = {
  env: process.env.NODE_ENV
}

var manifest = {
  $meta: 'This file defines adaxisoft-api.',
  server: {
    debug: {
      request: ['error']
    },
    port: Config.get('/port/api'),
    routes: {
      security: true
    }
  },
  register: {
    plugins: [
      {
        plugin: '@hapi/inert'
      },
      {
        plugin: '@hapi/vision'
      },
      {
        plugin: 'laabr'
      },
      {
        plugin: './server/api/names',
        routes: { prefix: '/api/name' }
      },
      // {
      //   plugin: './server/open-api-to-markdown',
      //   routes: { prefix: '/open-api-to-markdown' }
      // },
      {
        plugin: 'hapi-swagger'
      }
    ]
  }
}

var store = new Confidence.Store(manifest)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
