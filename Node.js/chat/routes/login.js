var User = require('../models/user').User;
var createError = require('http-errors');
var async = require('async');
var session = require('express-session');
//.waterfall получает массив задач и выполняет их одна за другой
exports.get = function(req, res) {
	res.render('login');
};

exports.post = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	async.waterfall([
		//сначала выпонляется эта функция
		function(callback) {
			User.findOne({username: username},callback);
		},
		//затем передастся сюда, если найдено - первый аргумент user, иначе null
		function(user, callback) {
			//есть ли такой пользователь
			if(user) {
				//проверка пароля
				if(user.checkPassword(password)) {
					//если все хорошо, передаем следующей функции
					callback(null, user);
				}
				//иначе выдаем ошибку 403
				else {
					return next(createError(403, "Invalid password"))
					next()
				}
			}
			//если пользователя нет
			else {
				//создаем его
				var user = new User({username: username, password: password});
				//записываем в базу
				user.save(function(err) {
					if(err) return next(err);
					//передаем управление следующей функции
					callback(null,user);
				});
			}
		}

		], function(err, user) {
			//если пришла ошибка, возвращаем ее
			if(err) return next(err);
			//иначе записываем в сесси id пользователя
			else {
				req.session.user = user.id;
				res.send({});
			}
		});
}
