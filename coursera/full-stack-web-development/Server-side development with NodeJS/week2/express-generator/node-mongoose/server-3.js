	var mongoose = require('mongoose'),
		assert = require('assert');

	var Dishes = require('./models/dishes-3.js');
	
	var url = 'mongodb://localhost:27017/conFusion';
	mongoose.connect(url);
	var db = mongoose.connection;
	db.on('error',console.error.bind(console,'connection error:'));
	db.once('open',function() {

		console.log("connected correctly to server");

		Dishes.create({
			name:'yun',
			description:'mother',
			comments: [
				{
					rating: 3,
					comment: 'a good baby',
					author: 'zhang'
				}
			]
		}, function(err,dish) {
			if(err) throw err;

			console.log('Dish created!');
			console.log(dish);
			var id = dish._id;

			setTimeout(function() {

				Dishes.findByIdAndUpdate(id,{
					$set: {
						description:'pregnant'
					}
				}, {
						new:true
					})
				.exec(function(err,dish) {
					if(err) throw err;
					console.log('updated Dish!');
					console.log(dish);

					dish.comments.push({
						rating: 5,
						comment: 'baby is growing well',
						author: 'zhangYun'
					});

					dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);

					db.collection('dishes').drop(function() {
						db.close();
					});

				});
			});

			},3000);
		})
	})	