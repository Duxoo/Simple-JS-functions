var phrases;

exports.connect = function () {
	phrases = require('./ru')
};

exports.getPhrase = function(name) {
	if(!phrases[name]) {
		throw new Error ("Такой фразы нет");
	}
	return phrases[name];
}