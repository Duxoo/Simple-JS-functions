//domain нужен для того, чтобы обрабатывать ошибки и чтобы сервер не падал при них
var domain = require('domain');
//специальный объект(который и называет доменом) в контексте домена можно запускать функции и он перхватит любые ошибки,влючая асинхронные
var serverDomain = domain.create();

serverDomain.on('error',function(err) {
	console.error("Server error", err);
	if(server) server.close();
	setTimeout(function() {
		process.exit(1);
	}, 1000).unref();
});

serverDomain.run(function() {
	var server = require('./server');
	var handler = require('handler');
	server.createServer(function(req,res) {
		var reqDomain = domain.create();
		reqDomain.add(req);
		reqDomain.add(res);
		reqDomain.on('error', function(err) {
			res.statusCode = 500;
			res.end("Sorry, " + err);
			//emit передает ошибку в serverDomain.on('error')
			serverDomain.emit('error', err);
		});
		reqDomain.run(function() {
			handler(req,res);
		});
	});
	server.listen(3000);
});