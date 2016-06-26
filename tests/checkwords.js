var fs = require('fs');
var q = require('q');
var colors = require('colors/safe');

/**
 * Read file, return promise
 */
var read = path => {  
  var deferred = q.defer();
  fs.readFile(path, 'utf-8', (err, data) => (err) 
  	? deferred.reject(err) 
  	: deferred.resolve(data));
  return deferred.promise;
};

/*
 * Parse into array
 */
var parseWoordenlijst = list => {
	return list.replace(/\s+/g,' ').split(' ');
}

/*
 * Remove punctuation, capitalization, normalize word boundaries 
 */
var parseGedicht = gedicht => {
	return ' ' + gedicht.replace(/\s+/g,' ')
	.split(' ')
	.filter(e=>e.match(/\w/))
	.map(e => e.toLowerCase().replace(/(^\W+|\W+$)/g,''))
	.join(' ') + ' ';
}

/**
 * Check if all words of gedicht appear in woordenlijst
 */
var test = data => {	
	var gedicht = parseGedicht(data[0]);
	
	for  (word of parseWoordenlijst(data[1])){
		var regex = new RegExp('\\W' + word + '\\W');
		gedicht = gedicht.replace(regex,' ');
	};

	console.log(
		gedicht.match(/\w/)
		? colors.bold.red('ontbrekend in woordenlijst:' + gedicht)
		: colors.bold.green('OK')
	);
}

/**
 * Error handler
 */
var onerror = err => console.log(err.message);

/**
 * Export the function that performs the test
 */
module.exports = path => {
	q.all([read(path),read(path.replace('gedicht','woordenlijst'))])
	.then(test)
	.catch(onerror);
};




