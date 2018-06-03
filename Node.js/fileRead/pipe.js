var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req,res) {
		if(req.url == '/') {
	var file = new fs.ReadStream(__filename);
}
});

server.listen(8080,'127.0.0.1');
/*

ВСЮ ЭТУ ФУНКЦИЮ МОЖНО ЗАМЕНИТЬ file.pipe(res), где file, то откуда читать, res - куда записывать

*/
function sendFile(file, res) {
	//ждем данные
	file.on('readable', write);
	//читаем данные и отправляем их в ответ
		var fileContent = file.read();//считать
		//если res принимает данные очень быстро, то он вернет true
		//если res вернул false, то буфер переполнен
		if( fileContent && !res.write(fileContent)) {//отправить
			//временно отказываем выполнять событие readable на файле
			file.removeListener('readable', write);
			//событие drain-когда данные будут успешно отданы в ответ
			res.once('drain', function() {//подождать
				file.on('readable', write);
				write();
			});
	}
}

file.on('end', function() {
	res.end();
})

function sendFilePipe(file,res) {
	file.pipe(res);
	file.on('error', function(err) {
		res.statusCode = 500;
		res.end("Server error");
		console.log(err);
	});
	//если соединение оборвано, то надо закрыть файл и закрыть все ресурсы
	res.on('close', function() {
		file.destroy();
	});
};