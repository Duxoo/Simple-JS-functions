var express = require('express');
var createError = require('http-errors');
//обработчик маршрутов
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
var User = require('../models/user').User;
//вывод всех пользователей
router.get('/users', function(req, res, next) {
	User.find({}, function(err,users) {
		if(err) return next(err);
		res.json(users);
	})
});
var User = require('../models/user').User;
//вывод всех пользователей
router.get('/users', function(req, res, next) {
	User.find({}, function(err,users) {
		if(err) return next(err);
		res.json(users);
	})
});
module.exports = router;
