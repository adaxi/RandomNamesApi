'use strict'

const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const Manifest = require('../manifest')

const lab = exports.lab = Lab.script()

lab.experiment('Manifest', function () {
  lab.test('it gets manifest data', () => {
    Code.expect(Manifest.get('/')).to.be.an.object()
  })

  lab.test('it gets manifest meta data', () => {
    Code.expect(Manifest.meta('/')).to.match(/this file defines adaxisoft-api/i)
  })
})
