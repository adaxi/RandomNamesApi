'use strict'

var Lab = require('@hapi/lab')
var Code = require('@hapi/code')
var Config = require('../config')

var lab = exports.lab = Lab.script()

lab.experiment('Config', function () {
  lab.test('it gets config data', () => {
    Code.expect(Config.get('/')).to.be.an.object()
  })

  lab.test('it gets config meta data', () => {
    Code.expect(Config.meta('/')).to.match(/this file configures adaxisoft-api/i)
  })
})
