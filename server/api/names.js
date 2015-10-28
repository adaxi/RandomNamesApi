var Joi = require('joi');
var fs = require('fs');
var readline = require('readline');

function NameManager (firstNameList, lastNameList) {
	
	this.lastNames = loadFile(lastNameList);
	this.firstNames = loadFile(firstNameList);


	function loadFile (file) {
		return new Promise(function (fulfill, reject) {
			var names = [];
			var nameStream = readline.createInterface({ 
				input: fs.createReadStream(file)	
			});
			nameStream.on('line', function (name) {
				names.push(name);
			});
			nameStream.on('close', function () {
				fulfill(names);
			});
		});
	}		
}

function randomElement (array) {
	var randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

NameManager.prototype.getLastName = function () {
	return this.lastNames.then(randomElement);
}

NameManager.prototype.getFirstName = function () {
	return this.firstNames.then(randomElement);
}

NameManager.prototype.getNames = function (count) {
	count = count || 1;
	var names = [];
	for (var i = 0; i < count; i++) {
		var name = Promise.all([
			this.getFirstName(),
			this.getLastName()
		]).then(function (result) {
			return result[0] + ' ' + result[1];
		});
		names.push(name);
	}
	return Promise.all(names);
}

exports.register = function(server, options, next) {

	var nameManager = new NameManager('data/first_names.txt', 'data/last_names.txt');

	var replyAccordingToAccept = function (request, reply, response) {
		var accept = request.headers.accept;
		if (accept && (accept.indexOf('application/json') > -1)) {
			reply(response);
		} else {
			if (Array.isArray(response)) {
				reply(response.join('\n')).type('text/plain');
			} else {
				reply(response).type('text/plain');
			}
		}
	}

	server.route({
		method: 'GET',
		path: '/{number?}',
		handler: function (request, reply) {
			nameManager.getNames(request.params.number).then(function (names) {
				replyAccordingToAccept(request, reply, names);
			});
		},
		config: {
			validate: {
				params: {
					number: Joi.number().optional().min(1).max(100)
				}
			}
		}
	});

//	server.route({
//		method: 'GET',
//		path: '/first',
//		handler: function (request, reply) {
//			replyAccordingToAccept(request, reply, nameManager.getFirstName());
//		}
//	});
//
//	server.route({
//		method: 'GET',
//		path: '/last',
//		handler: function (request, reply) {
//			replyAccordingToAccept(request, reply, nameManager.getLastName());
//		}
//	});

	server.route({
		method: 'GET',
		path: '/first/{number?}',
		handler: function (request, reply) {
			var names = [];
			for (var i = 0; i < request.params.number; i++) {
				names.push(nameManager.getFirstName());
			}
			Promise.all(names).then(function (names) {
				replyAccordingToAccept(request, reply, names);
			});
		},
		config: {
			validate: {
				params: {
					number: Joi.number().optional().min(1).max(100).default(1)
				}
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/last/{number?}',
		handler: function (request, reply) {
			var names = [];
			for (var i = 0; i < request.params.number; i++) {
				names.push(nameManager.getLastName());
			}
			Promise.all(names).then(function (names) {
				replyAccordingToAccept(request, reply, names);
			});
		},
		config: {
			validate: {
				params: {
					number: Joi.number().optional().min(1).max(100).default(1)
				}
			}
		}
	});


	next();
}

exports.register.attributes = {
	name: 'RandomNames',
	version: '1.0.0',
}

