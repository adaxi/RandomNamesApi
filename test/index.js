'use strict'

import Lab from '@hapi/lab'
import Code from '@hapi/code'
import Composer from '../index.js'

const lab = Lab.script()

lab.experiment('App', function () {
  lab.test('it composes a server', async () => {
    const composedServer = await Composer()
    Code.expect(composedServer).to.be.an.object()
  })
})

export { lab }
