var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res) {
	var info;
	 if(req.url == '/') {
	 	//метод readfile является ассинхронным, так как вторым аргументом мы передаем callback function
	 	fs.readifile('index.html', function(err,info) { // функция обратного вызова-функция,которая передается в качестве аргумента
	 		//!!!ОЧЕНЬ ВАЖНО ОБРАБАТЫВАТЬ ОШИБКИ ПРИ АСИНХРОННОЙ РАЗРАБОТКЕ!!! 
	 		if(err) {
	 			console.error(err);
	 			res.statusCode = 500;
	 			console.log("Ошибка на сервере");
	 			return;
	 		}
	 		//если файл прочитан нормально, то выводим
	 		res.end(info);
	 	});
	 }

});

server.listen(8080, "127.0.0.1");

setTimeout(function() {
	server.close();
},2500);

var timer = setInterval(function() {
	console.log(process.memoryUsage());
},1000);

timer.unref();