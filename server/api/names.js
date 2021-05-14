'use strict'

const Joi = require('joi')
const Fs = require('fs')
const Path = require('path')
const Readline = require('readline')

const randomElement = function (array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

const NameManager = function (firstNameList, lastNameList) {
  const load = function (file) {
    return new Promise(function (resolve, reject) {
      const names = []
      const nameStream = Readline.createInterface({
        input: Fs.createReadStream(file)
      })
      nameStream.on('line', function (name) {
        names.push(name)
      })
      nameStream.on('close', function () {
        resolve(names)
      })
    })
  }

  this.lastNames = load(lastNameList)
  this.firstNames = load(firstNameList)
}

NameManager.prototype.getLastName = function () {
  return this.lastNames.then(randomElement)
}

NameManager.prototype.getFirstName = function () {
  return this.firstNames.then(randomElement)
}

NameManager.prototype.getNames = function (count) {
  count = count || 1
  const names = []
  for (let i = 0; i < count; i++) {
    const name = Promise.all([
      this.getFirstName(),
      this.getLastName()
    ]).then(function (result) {
      return result[0] + ' ' + result[1]
    })
    names.push(name)
  }
  return Promise.all(names)
}

exports.plugin = {
  name: 'RandomNames',
  version: '1.0.0',
  register: (server, options) => {
    const nameManager = new NameManager(
      Path.join(__dirname, '..', '..', 'data', 'first_names.txt'),
      Path.join(__dirname, '..', '..', 'data', 'last_names.txt')
    )

    const replyAccordingToAccept = ({ headers: { accept } }, h, response) => {
      if (accept && (accept.indexOf('application/json') > -1)) {
        return response
      } else {
        return h.response(response.join('\n')).type('text/plain')
      }
    }

    server.route({
      method: 'GET',
      path: '/{number?}',
      handler: async (request, h) => {
        const names = await nameManager.getNames(request.params.number)
        return replyAccordingToAccept(request, h, names)
      },
      options: {
        tags: ['api'],
        validate: {
          params: Joi.object({
            number: Joi.number().optional().min(1).max(100)
          })
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/first/{number?}',
      handler: async (request, h) => {
        const names = []
        for (let i = 0; i < request.params.number; i++) {
          names.push(nameManager.getFirstName())
        }
        const response = await Promise.all(names)
        return replyAccordingToAccept(request, h, response)
      },
      options: {
        tags: ['api'],
        validate: {
          params: Joi.object({
            number: Joi.number().optional().min(1).max(100).default(1)
          })
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/last/{number?}',
      handler: async (request, h) => {
        const names = []
        for (let i = 0; i < request.params.number; i++) {
          names.push(nameManager.getLastName())
        }
        const response = await Promise.all(names)
        return replyAccordingToAccept(request, h, response)
      },
      options: {
        tags: ['api'],
        validate: {
          params: Joi.object({
            number: Joi.number().optional().min(1).max(100).default(1)
          })
        }
      }
    })
  }
}
