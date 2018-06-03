var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
//поток это объект,который получает информацию о ресурсе
var stream = new fs.ReadStream(__filename, {encoding:"UTF-8"});

var ROOT = path.normalize( __dirname + "/public/");

stream.on('readable', function() {
	var data = stream.read();
	console.log(data);
});

stream.on('end', function() {
	console.log("THE END");
});

stream.on('error',function(err) {
	if(err == "ENOENT") {
		console.log("Файла нет");
	}
	else {
		console.log(err);
	}
});

var server = http.createServer(function(req,res) {
	//если ключевое слово неверно
	if(!checkAccess(req)) {
		res.statusCode = 403;
		res.end("You should know a secret key P.S what platform are u using?");
		return;
	}
	sendFileSafe(url.parse(req.url).pathname, res);
});

server.listen(8080,"127.0.0.1");

//проверка доступа,проверяем url на ключевое слово
function checkAccess(req) {
	return url.parse(req.url, true).query.secret == "nodejs";
};

//проверяем на "безопасность", чтобы отослать файл
function sendFileSafe(filePath, res) {
	try {
		filePath = decodeURIComponent(filePath);//декодинг URL 
	} catch(e) {
		res.statusCode = 400;
		res.end("Bad request");
		return;
	}
	//0 байт в строке URL,может быть специально передан, т.к некоторые функции JS работают с ним некорректно
	if(~filePath.indexOf('\0')) {
		res.statusCode = 400;
		res.end("Bad request");
		return;
	}
	//join объединяет пути, normalize удаляет из пути . .. и т.д
	filePath = path.normalize(path.join(ROOT, filePath));
	if (filePath.indexOf(ROOT) != 0) {
		res.statusCode = 400;
		res.end("Bad request");
		return;
	}

	//проверим что лежит по пути,если ничего нет, то stat вернет ошибку
	//или если ошибки нет, то проверить, файл ли это
	fs.stat(filePath, function(err,stats) {
		if(err || !stats.isFile()) {
			res.statusCode = 400;
			res.end("Bad request1");
			return;
		}
		sendFile(filePath, res);
	});
};

//отправка файла
function sendFile(filePath, res) {
	fs.readFile(filePath, function(err,data) {
		if(err) throw Error;
		res.end(data);
	});
};