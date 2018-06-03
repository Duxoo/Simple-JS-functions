var http = require('http');
var fs = require('fs');
//domain нужен для того, чтобы обрабатывать ошибки и чтобы сервер не падал при них
var domain = require('domain');
//специальный объект(который и называет доменом) в контексте домена можно запускать функции и он перхватит любые ошибки,влючая асинхронные
var serverDomain = domain.create();

function handler(req, res) {
	if(req.url == '/') {
		fs.readFile('index.html', function(err, content) {
			if(err) throw err;
			res.end(content);
		})
	}
	else {
		res.statusCode = 404;
		res.end("No such file");
	}
}
var server = http.createServer(handler);
module.exports = server;