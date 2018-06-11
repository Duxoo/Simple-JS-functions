var mongoose = require('mongoose');
var config = require('../config/index');
//подключение к БД
mongoose.connect(config.get('mongoose:uri'));
//экспортируем
module.exports  = mongoose;