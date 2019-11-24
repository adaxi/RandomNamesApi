'use strict'

const Pug = require('pug')
const Path = require('path')
const JsYaml = require('js-yaml')

const transformInfo = require('swagger-markdown/bin/transformers/info')
const transformPath = require('swagger-markdown/bin/transformers/path')
const transformSecurityDefinitions = require('swagger-markdown/bin/transformers/securityDefinitions')
const transformExternalDocs = require('swagger-markdown/bin/transformers/externalDocs')
const transformDefinition = require('swagger-markdown/bin/transformers/definitions')

exports.plugin = {
  name: 'OpenAPIToMarkdown',
  version: '1.0.0',
  register: (server, options) => {
    server.views({
      engines: { pug: Pug },
      relativeTo: __dirname,
      path: 'templates',
      compileOptions: {
        // By default Pug uses relative paths (e.g. ../root.pug), when using absolute paths (e.g. include /root.pug), basedir is prepended.
        // https://pugjs.org/language/includes.html
        basedir: Path.join(__dirname, 'templates')
      }
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: async (request, h) => {
        return h.view('index')
      }
    })

    server.route({
      method: 'POST',
      path: '/',
      handler: async ({ payload: { openapi } }, h) => {
        const document = []
        const inputDoc = JsYaml.safeLoad(openapi)
        // Collect parameters
        const parameters = ('parameters' in inputDoc) ? inputDoc.parameters : {}
        // Process info
        if ('info' in inputDoc) {
          document.push(transformInfo(inputDoc.info))
        }
        if ('externalDocs' in inputDoc) {
          document.push(transformExternalDocs(inputDoc.externalDocs))
        }
        // Security definitions
        if ('securityDefinitions' in inputDoc) {
          document.push(transformSecurityDefinitions(inputDoc.securityDefinitions))
        } else if (inputDoc.components && inputDoc.components.securitySchemas) {
          document.push(transformSecurityDefinitions(inputDoc.components.securityDefinitions))
        }
        // Process Paths
        if ('paths' in inputDoc) {
          Object.keys(inputDoc.paths).forEach(path => document.push(transformPath(
            path,
            inputDoc.paths[path],
            parameters
          )))
        }
        // Models (definitions)
        if ('definitions' in inputDoc) {
          document.push(transformDefinition(inputDoc.definitions))
        } else if (inputDoc.components && inputDoc.components.schemas) {
          document.push(transformDefinition(inputDoc.components.schemas))
        }

        const markdown = document.join('\n')
        return h.view('index', {
          openapi,
          markdown
        })
      }
    })
  }
}
