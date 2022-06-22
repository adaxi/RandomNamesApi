'use strict'

import Pug from 'pug'
import Path from 'path'
import JsYaml from 'js-yaml'
import * as url from 'url'

import transformInfo from 'swagger-markdown/bin/transformers/info.js'
import transformPath from 'swagger-markdown/bin/transformers/path.js'
import transformSecurityDefinitions from 'swagger-markdown/bin/transformers/securityDefinitions.js'
import transformExternalDocs from 'swagger-markdown/bin/transformers/externalDocs.js'
import transformDefinition from 'swagger-markdown/bin/transformers/definitions.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const plugin = {
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
        const inputDoc = JsYaml.load(openapi)

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
