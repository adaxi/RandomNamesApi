'use strict';

var Lab = require('lab');
var Code = require('code');
var Config = require('../../../config');
var Hapi = require('hapi');
var IndexPlugin = require('../../../server/api/names');


var lab = exports.lab = Lab.script();
var request, server;


lab.beforeEach(function (done) {

    var plugins = [IndexPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, function (err) {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Name Plugin', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/'
        };

        done();
    });


    lab.test('it returns a name', function (done) {

        server.inject(request, function (response) {

            request.headers = {
                accept: 'text/plain'
            };
            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns a name in json format', function (done) {

        request.url = '/';
        request.headers = {
            accept: 'application/json'
        };
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns 4 name in json format', function (done) {

        request.url = '/4';
        request.headers = {
            accept: 'application/json'
        };
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns 2 names', function (done) {

        request.url = '/2';
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns last name', function (done) {

        request.url = '/last';
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns a first name', function (done) {

        request.url = '/first';
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns 4 last names', function (done) {

        request.url = '/last/4';
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

    lab.test('it returns 3 first names', function (done) {

        request.url = '/first/3';
        server.inject(request, function (response) {

            Code.expect(response.result.message).to.match(/.*/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });

});
