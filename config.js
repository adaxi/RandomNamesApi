'use strict';

var Confidence = require('confidence');

var criteria = {
    env: process.env.NODE_ENV
};


var config = {
    $meta: 'This file configures adaxisoft-api.',
    projectName: 'adaxisoft-api',
    port: {
        api: {
            $filter: 'env',
            test: 9090,
            $default: '/'
        }
    },
    address: {
        api: {
            $filter: 'env',
            test: '0.0.0.0',
            $default: '/var/run/adaxisoft-api.sock'
        }
    }
};


var store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
