//криптографический модуль
var crypto = require('crypto');
/*
Mongoose – это ORM для MongoDb сделанная под node.js.
ORM - технология программирования, которая связывает базы данных 
с концепциями объектно-ориентированных языков программирования, 
создавая «виртуальную объектную базу данных».
*/
var mongoose = require('../libs/mongoose'),
/*
В mongoose все завязано на 2х ключевых понятиях 
Схема(Schema) – описание сущности и Модель – сама сущность.
*/
	Schema = mongoose.Schema;
//схема
var schema = new Schema ({
	username:{
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required:true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});
//метод
schema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
};
//для того чтобы писать user.get и вызывалась функция get или set соответственно
schema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._plainPassword;
	});
//метод
schema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};
//создадим модель по схеме и экспортируем ее
exports.User = mongoose.model('User', schema);