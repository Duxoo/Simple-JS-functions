var http = require('http');
var chat = require('./chat');
var fs = require('fs');

var server = http.createServer(function(req,res) {
	switch(req.url){
	case "/":
		sendFile('index.html',res);
		break;
		//подписка на сообщения
	case "/subscribe":
		//объект, который будет запоминать, что пришел клиент
		chat.subscribe(req,res)
		break;
		//отправка сообщений
	case "/publish":
		//для того,чтобы считать метод POST из request нужно работать с ним как с потоком
		//временная переменная
		var body = '';
			req
				//когди данные приходят читаем их
				.on('data', function(data) {

					body+=data;
					//защита от больших сообщений,чтобы сервер не упал при переполнении буфера
					if(body.length > 1e4) {
						res.statusCode = 413;
						res.end("Your message is too big");
					}
				})
				//когда данные получены
				.on('end', function() {
					//разбираем данные как JSON
					body = JSON.parse(body);
					//после чего публикуем
					chat.publish(body.message);
					res.end("ok");
				});
		break;
	default:
		res.end("File not found");
		res.statusCode = 404;
		break;
}
});

server.listen(8080,"127.0.0.1");

function sendFile(fileName, res) {
  var fileStream = fs.createReadStream(fileName);
  fileStream
  	//обработка ошибки
    .on('error', function() {
      res.statusCode = 500;
      res.end("Server error");
    })
    //чтение
    .pipe(res)
    //закрытие
    .on('close', function() {
      fileStream.destroy();
    });
}