angular.module('weatherApp')	
	.factory('cityFactory', function(){
		var city = {}, cityName, data;		
		city.getCity = function getCity(latitude,longitude,callback) {
			var latitude = latitude;
			var	longitude = longitude;

			$.ajax({
				// url: "http://maps.google.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&language=zh-TW&sensor=true",
				url: "http://maps.google.com/maps/api/geocode/json?latlng=30.52,114.31&language=zh-TW&sensor=true",
				async: true,
				dataType: 'json',
				Method: 'get',
				success: function(response) {
					var address_components = response.results[0].address_components;
					callback(address_components[2].short_name);
					
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
