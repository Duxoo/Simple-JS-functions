var http = require('http');
var fs = require('fs');

fs.readFile(__filename, {encoding:"utf-8"}, function(err, data) {
	if(err) {
		console.log("error");
	}
	else {
		console.log(data);
	}
});

var server = http.createServer(function(req,res) {

});

server.listen(8080,'127.0.0.1');