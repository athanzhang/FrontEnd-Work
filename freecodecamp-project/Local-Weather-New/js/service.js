angular.module('weatherApp')	
	.factory('cityFactory', function(){
		var city = {}, cityName, data;		
		city.getCity = function getCity(latitude,longitude,callback) {
			var latitude = latitude;
			var	longitude = longitude;

			$.ajax({

				// Baidu API

				   // url: "http://api.map.baidu.com/geocoder/v2/?location="+latitude+","+longitude+"&output=json&pois=1&ak=E4cNuwV0MW72Rc8HHf3dNiFBYWYfXQuv",
				   url: "http://api.map.baidu.com/geocoder/v2/?location=30.52,114.31&output=json&pois=1&ak=E4cNuwV0MW72Rc8HHf3dNiFBYWYfXQuv",


				   // google API
				// url: "http://maps.google.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&language=zh-TW&sensor=true",
				// url: "http://maps.google.com/maps/api/geocode/json?latlng=30.52,114.31&language=zh-TW&sensor=true",
				async: true,
				dataType: 'jsonp',
				Method: 'get',
				success: function(response) {
					var addressComponent = response.result.addressComponent;
					callback(addressComponent);
					
				}
			});
						
		}
		return city;
	})
	.service('weatherFactory', function(){
		this.getWeather = function getWeather(cityName,callback) {
			$.ajax({
				url: "http://op.juhe.cn/onebox/weather/query?cityname="+cityName+"&key=2639c2117cb69b754fb7303462447c59",
				async: true,
				dataType: 'jsonp',
				Method: 'get',
				success: function(response) {
					callback(response.result);
				}

			});
		}
		
	});
