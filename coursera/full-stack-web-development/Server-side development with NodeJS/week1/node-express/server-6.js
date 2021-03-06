var express = require('express');
var morgan = require('morgan');
var promoRouter = require('./promoRouter.js');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/promotions',promoRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port,hostname,function() {
	console.log(`Server running at http://${hostname}:${port}/`);
})
