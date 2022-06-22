'use strict'

import Lab from '@hapi/lab'
import Code from '@hapi/code'
import Config from '../config.js'

const lab = Lab.script()

lab.experiment('Config', function () {
  lab.test('it gets config data', () => {
    Code.expect(Config.get('/')).to.be.an.object()
  })

  lab.test('it gets config meta data', () => {
    Code.expect(Config.meta('/')).to.match(/this file configures adaxisoft-api/i)
  })
})

export { lab }
