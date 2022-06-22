'use strict'

import Confidence from 'confidence'
import Config from './config.js'

const criteria = {
  env: process.env.NODE_ENV
}

const manifest = {
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
        plugin: 'laabr',
        options: Config.get('/logger')
      },
      {
        plugin: await import('./server/api/names.js'),
        routes: { prefix: '/api/name' }
      },
      {
        plugin: await import('./server/open-api-to-markdown/index.js'),
        routes: { prefix: '/open-api-to-markdown' }
      },
      {
        plugin: 'hapi-swagger',
        options: Config.get('/swagger')
      }
    ]
  }
}

const store = new Confidence.Store(manifest)

const get = function (key) {
  return store.get(key, criteria)
}

const meta = function (key) {
  return store.meta(key, criteria)
}

export default { get, meta }
