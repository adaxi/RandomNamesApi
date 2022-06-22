'use strict'

import Fs from 'fs/promises'
import Confidence from 'confidence'

const Package = JSON.parse(await Fs.readFile(new URL('./package.json', import.meta.url)))

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
      $default: 8080
    }
  },
  logger: {
    formats: {
      log: ':time[iso] [":level"]:tags :host[uri] :message'
    }
  },
  swagger: {
    info: {
      title: 'http://adaxisoft.be/api',
      version: Package.version
    },
    grouping: 'tags',
    tags: [
      {
        name: 'names',
        description: 'Returns random names',
        externalDocs: {
          description: 'Full list of names',
          url: 'https://github.com/adaxi/adaxisoft-api/tree/master/data'
        }
      }
    ]
  }
}

const store = new Confidence.Store(config)

const get = function (key) {
  return store.get(key, criteria)
}

const meta = function (key) {
  return store.meta(key, criteria)
}

export default { get, meta }
