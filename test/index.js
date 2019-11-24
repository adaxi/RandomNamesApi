'use strict'

const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const Composer = require('../index')

const lab = exports.lab = Lab.script()

lab.experiment('App', function () {
  lab.test('it composes a server', async () => {
    const composedServer = await Composer()
    Code.expect(composedServer).to.be.an.object()
  })
})
