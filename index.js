'use strict'

import Glue from '@hapi/glue'
import * as url from 'url'
import Manifest from './manifest.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const composeOptions = {
  relativeTo: __dirname
}

export default Glue.compose.bind(Glue, Manifest.get('/'), composeOptions)
