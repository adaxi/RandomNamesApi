'use strict'

var Lab = require('@hapi/lab')
var Code = require('@hapi/code')
var Config = require('../../../config')
var Hapi = require('@hapi/hapi')
var RandomNamesPlugin = require('../../../server/api/names')

var lab = exports.lab = Lab.script()
var request, server

lab.beforeEach(async () => {
  var plugins = RandomNamesPlugin
  server = new Hapi.Server({ port: Config.get('/port/api') })
  await server.register(plugins)
})

lab.experiment('Name Plugin', function () {
  lab.beforeEach(function () {
    request = {
      method: 'GET',
      url: '/'
    }
  })

  lab.test('it returns a name', async () => {
    request.headers = {
      accept: 'text/plain'
    }
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns a name in json format', async () => {
    request.url = '/'
    request.headers = {
      accept: 'application/json'
    }
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns 4 name in json format', async () => {
    request.url = '/4'
    request.headers = {
      accept: 'application/json'
    }
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns 2 names', async () => {
    request.url = '/2'
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns last name', async () => {
    request.url = '/last'
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns a first name', async () => {
    request.url = '/first'
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns 4 last names', async () => {
    request.url = '/last/4'
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it returns 3 first names', async () => {
    request.url = '/first/3'
    const response = await server.inject(request)
    Code.expect(response.result).to.match(/.*/i)
    Code.expect(response.statusCode).to.equal(200)
  })
})
