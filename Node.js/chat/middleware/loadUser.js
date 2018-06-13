var User = require('../models/user').User;

module.exports = function(req, res, next) {
	  req.user = res.locals.user = null;
	//если пользователя нет продолжаем выполнением
	if(!req.session.user) return next();
	//получаеам записываем в req и идем дальше
	User.findById(req.session.user, function(err, user) {
		if(err) return next(err);
		//то, что мы запишем в этот объект будет доступно всем шаблонам
		req.user = res.locals.user = user;
		next();
	});
};
