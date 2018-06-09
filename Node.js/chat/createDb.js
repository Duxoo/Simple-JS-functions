/*var MongoClient = require('mongodb').MongoClient
,	format = require('util').format;

//присоедениться к БД, когда соединение будет установлено вызовет Callback
MongoClient.connect('mongodb://127.0.0.1:27017/chat', function(err,client) {
	if(err) throw err;
	var db = client.db('chat');
	//возьмет эту коллекцию из базы(если ее нет, то она будет создана)
	var collection = db.collection('test_insert');
		//удаление всех записей из БД
	collection.remove({}, function(err,affected) {
		if(err) throw err;
	});
	//вставить в нее документ
	collection.insert({a:2}, function(err,docs) {//подсчет записей
	collection.count(function(err, count) {
		console.log(format("count = %s", count));
	});
	//вывод записей
	collection.find().toArray(function(err, results) {
		console.dir(results);
		client.close();
	});
});
})*/
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema({
	name: String
});
schema.methods.meow = function () {
	console.log(this.get('name'));
}
//объвление класса, где задается имя и описание полей
var Cat = mongoose.model('Cat',schema);
//создание объекта класса
var kitty = new Cat({
	name: "Zildjian"
});
//сохранить объект в БД
kitty.save(function(err,kitty,affected) {
	if(err) throw err;
	kitty.meow();
})*/
var User = require('./models/user').User;

var user = new User({
	username: "Tester4",
	password: "secret"
});
user.save(function(err,user,affected) {
	if(err) throw err;

	User.findOne({username: "Tester2"}, function(err,tester) {
		console.log(tester);
	});
});