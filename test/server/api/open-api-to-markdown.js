'use strict'

const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const Config = require('../../../config')
const Hapi = require('@hapi/hapi')
const OpenApiToMarkdownPlugin = require('../../../server/open-api-to-markdown')

const lab = exports.lab = Lab.script()
let request, server

lab.beforeEach(async () => {
  const plugins = [
    require('@hapi/inert'),
    require('@hapi/vision'),
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
      payload: 'openapi=openapi%3A+3.0.0%0D%0Ainfo%3A%0D%0A++title%3A+Sample+API%0D%0A++description%3A+Optional+multiline+or+single-line+description+in+%5BCommonMark%5D%28http%3A%2F%2Fcommonmark.org%2Fhelp%2F%29+or+HTML.%0D%0A++version%3A+0.1.9%0D%0Aservers%3A%0D%0A++-+url%3A+http%3A%2F%2Fapi.example.com%2Fv1%0D%0A++++description%3A+Optional+server+description%2C+e.g.+Main+%28production%29+server%0D%0A++-+url%3A+http%3A%2F%2Fstaging-api.example.com%0D%0A++++description%3A+Optional+server+description%2C+e.g.+Internal+staging+server+for+testing%0D%0Apaths%3A%0D%0A++%2Fusers%3A%0D%0A++++get%3A%0D%0A++++++summary%3A+Returns+a+list+of+users.%0D%0A++++++description%3A+Optional+extended+description+in+CommonMark+or+HTML.%0D%0A++++++responses%3A%0D%0A++++++++%27200%27%3A++++%23+status+code%0D%0A++++++++++description%3A+A+JSON+array+of+user+names%0D%0A++++++++++content%3A%0D%0A++++++++++++application%2Fjson%3A%0D%0A++++++++++++++schema%3A+%0D%0A++++++++++++++++type%3A+array%0D%0A++++++++++++++++items%3A+%0D%0A++++++++++++++++++type%3A+string&markdown=%23+Sample+API%0D%0AOptional+multiline+or+single-line+description+in+%5BCommonMark%5D%28http%3A%2F%2Fcommonmark.org%2Fhelp%2F%29+or+HTML.%0D%0A%0D%0A%23%23+Version%3A+0.1.9%0D%0A%0D%0A%23%23%23+%2Fusers%0D%0A%0D%0A%23%23%23%23+GET%0D%0A%23%23%23%23%23+Summary%3A%0D%0A%0D%0AReturns+a+list+of+users.%0D%0A%0D%0A%23%23%23%23%23+Description%3A%0D%0A%0D%0AOptional+extended+description+in+CommonMark+or+HTML.%0D%0A%0D%0A%23%23%23%23%23+Responses%0D%0A%0D%0A%7C+Code+%7C+Description+%7C%0D%0A%7C+----+%7C+-----------+%7C%0D%0A%7C+200+%7C+A+JSON+array+of+user+names+%7C%0D%0A&submit='
    }
    const response = await server.inject(request)
    Code.expect(response.statusCode).to.equal(200)
  })
})
