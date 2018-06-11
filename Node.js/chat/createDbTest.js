var mongoose = require('./libs/mongoose');
var async = require('async');
var User = require('./models/user').User;
//асихронное выполнение
async.series([
	open,
	dropDataBase,
	createUsers,
	close
], function(err,results) {
	console.log(arguments);
});

//открыть соединение с БД
function open(callback) {
	//объект БД
	mongoose.connection.on('open',callback);
};
//удалить БД
function dropDataBase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
	console.log("Deleted");
};
//создать пользователя
function createUsers(callback) {
	//массив пользователей
	var users = [
	{username: 'Вася', password: 'surepvasya'},
	{username: 'Петя', password: 'superpetya'},
	{username: 'Админ', password: '12qwer'}
	];
/*	
асинхронно для каждого из users будет вызвана функция, которая задана 2 аргументом
если callback вернет null, то управление передается дальше, если ошибку
то вызовется callback, который объявлен 3 аргументом
*/
	async.each(users,function(userData,callback) {
		var user = new User(userData);
		user.save(callback);
	},callback)};
//параллельное выполнение функций
/*	async.parallel([
		function(callback) {
			//экземляр модели
			var vasya = new User ({username: 'Вася', password: 'surepvasya'});
			//сохраняем в базу
			vasya.save(function(err) {
				callback(err,vasya);
			});
		},
		function(callback) {
			//экземляр модели
			var petya = new User ({username: 'Петя', password: 'superpetya'});
			//сохраняем в базу
			petya.save(function(err) {
				callback(err,petya)
			});
		},
		function(callback) {
			//экземляр модели
			var admin = new User ({username: 'Админ', password: '12qwer'});
			//сохраняем в базу
			admin.save(function(err) {
				callback(err,admin)
			});
		},
		],callback)
};*/
//закрыть соединение с БД
function close(callback) {
	mongoose.disconnect(callback);
};




/*
1) drop table
2) create & save 3 users
3) close connection
*/