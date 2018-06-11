var express = require('express');
var createError = require('http-errors');
//обработчик маршрутов
var router = express.Router();
/* GET home page. */
router.get('/', require('./frontpage').get);
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);
router.get('/chat', require('./chat').get);

module.exports = router;