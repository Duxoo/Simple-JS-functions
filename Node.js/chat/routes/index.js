var express = require('express');
var createError = require('http-errors');
var checkAuth = require('../middleware/checkAuth');
//обработчик маршрутов
var router = express.Router();
/* GET home page. */
router.get('/', require('./frontpage').get);
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);
router.get('/chat', checkAuth, require('./chat').get);
router.post('/logout', require('./logout').post);

module.exports = router;