# Mock Data

All credit for this goes to [clubajax](http://clubajax.org/mock-data-randomizer/).  I just took the source and adapted it to work with node.js

## Examples

	var mock = require('../');

	//random characters (min/max)
	console.log(mock.chars(5, 9));

	//name
	console.log(mock.name());

	//number (max)
	console.log(mock.n(10));

	//bignumber (length)
	console.log(mock.bignumber(10));

	//site
	console.log(mock.url());

	//date
	console.log(mock.date({delimiter:"/", yearRange: -1 }));

	//title (min/max number of words)
	console.log(mock.title(3,4));

	//lorem ipsum (min/max number of sentences, min/max length of words)
	console.log(mock.sentences(5,10,3,8));

	//real text (min/max number of sentences, min/max length of words)
	mock.real = true;
	console.log(mock.sentences(5,10,3,8));

	//bool
	console.log(mock.bool());

	//color
	console.log(mock.color());

	//site
	console.log(mock.site());

	//word
	console.log(mock.word());

	//range
	console.log(mock.range(0, 10));

	//image
	console.log(mock.image(100, 800, 100, 800));

## Installation

	npm install mockdata
