var clients = [];
//при команде subscribe Добавляем новый объект res в массив
exports.subscribe = function(req, res) {
	clients.push(res);
	//если клиент отключился
	res.on('close',function() {
		clients.splice(clients.indexOf(res), 1);
	})
};

exports.publish = function(message) {
	//отправляем каждому клиенту сообщение(в массиве хранятся все подключенные клиенты)
	clients.forEach(function(res) {
		res.end(message);//res.end закрывает соединение и отправляет сообщение
	});
	//очищаем массив клиентов поскольку все соединения закрыты
	clients=[];
};