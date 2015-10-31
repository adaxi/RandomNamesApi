'use strict';

var Confidence = require('confidence');
var Config = require('./config');


var criteria = {
    env: process.env.NODE_ENV
};

var manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/api'),
        labels: ['api']
    }],
    plugins: {
        './server/api/names': [{
            routes: {
                prefix: '/name'
            }
        }],
        'good': [{
            options: {
                reporters: [{
                    reporter: require('good-file'),
                    events: { log: '*', response: '*', error: '*', ops: '*' },
                    config: '/var/log/adaxisoft-api.log'
                }]
            }
        }]
    }
};


var store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
