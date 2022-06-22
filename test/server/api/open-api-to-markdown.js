'use strict'

import Lab from '@hapi/lab'
import Code from '@hapi/code'
import Hapi from '@hapi/hapi'
import Config from '../../../config.js'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import { plugin as OpenApiToMarkdownPlugin } from '../../../server/open-api-to-markdown/index.js'

const lab = Lab.script()
let request, server

lab.beforeEach(async () => {
  const plugins = [
    Inert,
    Vision,
    OpenApiToMarkdownPlugin
  ]
  server = new Hapi.Server({ port: Config.get('/port/api') })
  await server.register(plugins)
})

lab.experiment('Open API to Markdown Plugin', function () {
  lab.beforeEach(function () {
    request = {
      method: 'GET',
      url: '/'
    }
  })

  lab.test('it displays the home page', async () => {
    request = {
      method: 'GET',
      url: '/'
    }
    const response = await server.inject(request)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('it converts a document', async () => {
    request = {
      method: 'POST',
      url: '/',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      payload: 'openapi=%7B%22swagger%22%3A%222.0%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22basePath%22%3A%22%2F%22%2C%22schemes%22%3A%5B%22http%22%5D%2C%22info%22%3A%7B%22title%22%3A%22http%3A%2F%2Fadaxisoft.be%2Fapi%22%2C%22version%22%3A%221.0.0%22%7D%2C%22tags%22%3A%5B%7B%22name%22%3A%22names%22%2C%22description%22%3A%22Returns+random+names%22%2C%22externalDocs%22%3A%7B%22description%22%3A%22Full+list+of+names%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fadaxi%2Fadaxisoft-api%2Ftree%2Fmaster%2Fdata%22%7D%7D%5D%2C%22paths%22%3A%7B%22%2Fapi%2Fname%2F%7Bnumber%7D%22%3A%7B%22get%22%3A%7B%22operationId%22%3A%22getApiNameNumber%22%2C%22parameters%22%3A%5B%7B%22type%22%3A%22number%22%2C%22minimum%22%3A1%2C%22maximum%22%3A100%2C%22name%22%3A%22number%22%2C%22in%22%3A%22path%22%7D%5D%2C%22tags%22%3A%5B%22names%22%5D%2C%22responses%22%3A%7B%22200%22%3A%7B%22schema%22%3A%7B%22type%22%3A%22string%22%2C%22x-alternatives%22%3A%5B%7B%22type%22%3A%22string%22%7D%2C%7B%22%24ref%22%3A%22%23%2Fx-alt-definitions%2FFull%2520name%2520response%22%7D%5D%7D%2C%22description%22%3A%22Successful%22%7D%7D%7D%7D%2C%22%2Fapi%2Fname%2Ffirst%2F%7Bnumber%7D%22%3A%7B%22get%22%3A%7B%22operationId%22%3A%22getApiNameFirstNumber%22%2C%22parameters%22%3A%5B%7B%22type%22%3A%22number%22%2C%22default%22%3A1%2C%22minimum%22%3A1%2C%22maximum%22%3A100%2C%22name%22%3A%22number%22%2C%22in%22%3A%22path%22%7D%5D%2C%22tags%22%3A%5B%22names%22%5D%2C%22responses%22%3A%7B%22200%22%3A%7B%22schema%22%3A%7B%22type%22%3A%22string%22%2C%22x-alternatives%22%3A%5B%7B%22type%22%3A%22string%22%7D%2C%7B%22%24ref%22%3A%22%23%2Fx-alt-definitions%2FFull%2520name%2520response%22%7D%5D%7D%2C%22description%22%3A%22Successful%22%7D%7D%7D%7D%2C%22%2Fapi%2Fname%2Flast%2F%7Bnumber%7D%22%3A%7B%22get%22%3A%7B%22operationId%22%3A%22getApiNameLastNumber%22%2C%22parameters%22%3A%5B%7B%22type%22%3A%22number%22%2C%22default%22%3A1%2C%22minimum%22%3A1%2C%22maximum%22%3A100%2C%22name%22%3A%22number%22%2C%22in%22%3A%22path%22%7D%5D%2C%22tags%22%3A%5B%22names%22%5D%2C%22responses%22%3A%7B%22200%22%3A%7B%22schema%22%3A%7B%22type%22%3A%22string%22%2C%22x-alternatives%22%3A%5B%7B%22type%22%3A%22string%22%7D%2C%7B%22%24ref%22%3A%22%23%2Fx-alt-definitions%2FFull%2520name%2520response%22%7D%5D%7D%2C%22description%22%3A%22Successful%22%7D%7D%7D%7D%7D%2C%22definitions%22%3A%7B%7D%2C%22x-alt-definitions%22%3A%7B%22Full+name+response%22%3A%7B%22type%22%3A%22array%22%2C%22items%22%3A%7B%22type%22%3A%22string%22%7D%7D%7D%7D&markdown=&submit='
    }
    const response = await server.inject(request)
    Code.expect(response.statusCode).to.equal(200)
  })
})

export { lab }
