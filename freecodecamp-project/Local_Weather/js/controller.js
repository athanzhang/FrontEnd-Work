angular.module('weatherApp',[])
    .controller('WeatherController', ['$scope','cityFactory','weatherFactory', function($scope,cityFactory,weatherFactory) {

    	// define location
    	var cityName;    	

    	//fetch the geolocation&weather data
$scope.geoFindMe = function geoFindMe() {
            var output = document.getElementById("out");
            

            if (!navigator.geolocation) {
                output.innerHTML = "<p>Your browser doesn't support geolocation</p>";
                return;
            }

            function success(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                cityFactory.getCity(latitude,longitude,function(rsp) {
                	cityName = rsp;

                	// output.innerHTML = '<p>'+cityName+'</p>';

                	//cityName encode                
               		cityName = encodeURIComponent(cityName);

               		// fetch weather data

      				weatherFactory.getWeather(cityName,function(result){
      				$scope.weatherData  = result.data; 


			    	$scope.du="\u2103";
			    	$scope.airQuality = "Air Quality: ";
			    	$scope.curPm = "Current pm: ";
			    	var activity = $scope.weatherData.pm25.pm25.des;
			    	$scope.activity = activity.slice(0,activity.length-1);  				

      				scopeChanged($scope);
      				});
                });      

                
                
            };



            function error() {
                output.innerHTML = "can not fetch your location";
            };

            // output.innerHTML = "<p>Locating...</p>";

            navigator.geolocation.getCurrentPosition(success, error);
        }

function scopeChanged(scope) {
        if (!scope.$$phase) {
            scope.$apply();
        	}
	    }


    }]);

