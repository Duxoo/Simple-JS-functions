//user= { User:function }
var user = require('./user');
var db = require('./db');
//объект, реализующий работу с событиями
var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

//подписчики, вызываются в таком же порядке, в котором назначены
server.on('request', function(request) {
	request.approved = true;
});

server.on('request', function(request) {
	console.log(request);
});
//метод emit генерирует событие и передает данные? эти данные попадают в функцию обработчик
server.emit('request', {from: "Клиент"});
server.emit('request', {from: "Еще клиент"});

function run () {
var vasya = new user("Vanya");
vasya.hello(vasya);
	db.getPhrase("Hello");
};

//если этот модуль кто-то наследует, то функция run не выполняется
if(module.parent) {
	exports.run = run;
} else {
	run();
}
/*
var http = require('http');
var server = new http.Server();//EventEmiter
//в хроме счетчик будет +1 из-за favicon
var counter = 0;
server.listen(1337, '127.0.0.1');
server.on('request', function(req, res) {
	res.end("Привет" + ++counter);
})*/