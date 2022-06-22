'use strict'

import Lab from '@hapi/lab'
import Code from '@hapi/code'
import Manifest from '../manifest.js'

const lab = Lab.script()

lab.experiment('Manifest', function () {
  lab.test('it gets manifest data', () => {
    Code.expect(Manifest.get('/')).to.be.an.object()
  })

  lab.test('it gets manifest meta data', () => {
    Code.expect(Manifest.meta('/')).to.match(/this file defines adaxisoft-api/i)
  })
})

export { lab }
