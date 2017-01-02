	var mongoose = require('mongoose'),
		assert = require('assert');

	var Promotions = require('./models/promotions.js');
	
	var url = 'mongodb://localhost:27017/conFusion';

	mongoose.connect(url);
	var db = mongoose.connection;

	db.on('error',console.error.bind(console,'connection error'));
	db.once('open',function() {
		console.log("connected correctly to server");

		var newPromotion = new Promotions({

			  "name": "Weekend Grand Buffet",
		      "image": "images/buffet.png",
		      "label": "New",
		      "price": "19.99",
		      "description": "Featuring . . ."
		});

		newPromotion.save(function(err) {

			if(err) throw err;

			console.log('Promotion created!');

			Promotions.find({},function(err,promotions) {
				if(err) throw err;
				console.log(promotions);

				db.collection('promotions').drop(function() {
					db.close();
				});
			});
		});
	});	