//переменные и функции являются глобальными только для данного модуля(файла)                
var db = require('../db');
db.connect();
var log = require ('../logger')(module);

function User(name) {
	this.name=name;
}
User.prototype.hello =function(who) {
	log(db.getPhrase("Hello") + ', ' + who.name);
};
//объект exports то, что туда положить вернется как результат require               
//exports.User = User;
module.exports = User; 