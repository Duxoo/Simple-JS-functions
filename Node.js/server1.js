/*
ЭХО-СЕРВЕР
*/

var http = require('http');
var url = require('url');
//сервер для обслуживания запросов
var server = new http.Server(function(req, res) {
	//вывод в консоль метода запроса(Get,Post) и url
	console.log(req.method,req.url);
	//разобрать строку запроса
	var urlParsed = url.parse(req.url, true);
	//строка запроса выглядит как объект,обращаемся к свойству pathname и query.message для того
	//чтобы вывести сообщение, иначе выводим ошибку в браузер, что страница не найдена
	if(urlParsed.pathname === '/echo' && urlParsed.query.message) {
		res.end(urlParsed.query.message);
}
 	else {
 		res.statusCode = 404;
 		res.end("Page not found");
 	}
});

//прослушивание сервера на запросы (порт, адрес)
server.listen(1337,'127.0.0.1');
