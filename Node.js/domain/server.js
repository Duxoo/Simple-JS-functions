var fs = require('fs');

module.exporst = function handler(req, res) {
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
};