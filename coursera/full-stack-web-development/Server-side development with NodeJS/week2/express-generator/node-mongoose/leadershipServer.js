	var mongoose = require('mongoose');

	var Leaders = require('./models/leadership.js');

	var url = 'mongodb://localhost:27017/conFusion';

	mongoose.connect(url);
	var db = mongoose.connection;

	db.on('error',console.error.bind(console,'connection error'));
	db.once('open',function() {

		console.log("connected correctly to server");

		var newLeader = new Leaders({

			  "name": "Peter Pan",
		      "image": "images/alberto.png",
		      "designation": "Chief Epicurious Officer",
		      "abbr": "CEO",
		      "description": "Our CEO, Peter, . . ."
		});

		newLeader.save(function(err) {

			if(err) throw err;

			console.log('Leader created!');

			Leaders.find({},function(err,leaders) {

				if(err) throw err;

				console.log(leaders);

				db.collection('Leaders').drop(function() {
					db.close();
				});
			});
		});
	});
