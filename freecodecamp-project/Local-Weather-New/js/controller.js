angular.module('weatherApp', [])
    .controller('WeatherController', ['$scope', 'cityFactory', 'weatherFactory', function($scope, cityFactory, weatherFactory) {

        // define location
        var cityName,countryName,weatherInfo = [];

        

        //fetch the geolocation&weather data
        $(document).ready(function() {

            //define constant
            $scope.week = "星期";
            $scope.du = "° c";


            var output = document.getElementById("out");


            if (!navigator.geolocation) {
                output.innerHTML = "<p>Your browser doesn't support geolocation</p>";
                return;
            }

            function success(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                cityFactory.getCity(latitude, longitude, function(rsp) {

                    //fetch the city and country
                    cityName = rsp.city;
                    countryName = rsp.country;

                    $scope.cityName = cityName;
                    $scope.countryName = countryName;

                    //cityName encode                
                    cityName = encodeURIComponent(cityName);

                    // fetch weather data

                    weatherFactory.getWeather(cityName, function(result) {
                        $scope.weatherData = result.data;


                        

                        // set the air quality data
                        $scope.airQuality = "Air Quality: ";
                        $scope.curPm = "Current pm: ";
                        var activity = $scope.weatherData.pm25.pm25.des;
                        $scope.activity = activity.slice(0, activity.length - 1);

                        //define the weather array 
                        var weather = $scope.weatherData.weather;

                        
                        // store weather info into an array

                        for(var i=1;i<=4;i++) {
                            weatherInfo.push(weather[i].info.day[1]);
                        }

                        $scope.weatherInfo = weatherInfo;

                        //according to the weather, change the image

                        if ($scope.weatherData.realtime.weather.info == '多云' || $scope.weatherData.realtime.weather.info == '阴') {
                            $scope.weatherImage = 'images/cloudy.png';
                        }
                        else if($scope.weatherData.realtime.weather.info == '晴')
                        {
                            $scope.weatherImage = 'images/sunny.png';
                        }
                        else if($scope.weatherData.realtime.weather.info.include('雨')) {
                            $scope.weatherImage = 'images/storm.png';
                        }


                        // according to the weather, change the icon of each day

                        for(var i=1;i<=4;i++) {
                            if($scope.weatherData.weather[i].info.day[1] == '多云' || $scope.weatherData.weather[i].info.day[1] == '阴') {
                                $scope.cloudy = true;
                            }

                            else if($scope.weatherData.weather[i].info.day[1] == '晴' || $scope.weatherData.weather[i].info.day[1] == '霾')
                            {
                                $scope.sunny = true;
                            }

                            else if($scope.weatherData.weather[i].info.day[1].includes('雨'))
                            {
                                $scope.hail = true;
                            }

                            
                        }


                        scopeChanged($scope);
                    });
                
                });

            };

            // if failed, use the default geolocation of beijing

            function error() {

                alert("fetching location fails,showing the default location");

                //default location beijing
                var latitude = 39.90;
                var longitude = 116.40;

                cityFactory.getCity(latitude, longitude, function(rsp) {

                    cityName = rsp.city;
                    countryName = rsp.country;

                    $scope.cityName = cityName;
                    $scope.countryName = countryName;

                    

                    //cityName encode                
                    cityName = encodeURIComponent(cityName);

                    // fetch weather data

                    weatherFactory.getWeather(cityName, function(result) {
                        $scope.weatherData = result.data;


                        

                        // set the air quality data
                        $scope.airQuality = "Air Quality: ";
                        $scope.curPm = "Current pm: ";
                        var activity = $scope.weatherData.pm25.pm25.des;
                        $scope.activity = activity.slice(0, activity.length - 1);

                        //define the weather array 
                        var weather = $scope.weatherData.weather;


                        // store weather info into an array

                        for(var i=1;i<=4;i++) {
                            weatherInfo.push(weather[i].info.day[1]);
                        }

                        $scope.weatherInfo = weatherInfo;

                        //according to the weather, change the image

                        if ($scope.weatherData.realtime.weather.info == '多云' || $scope.weatherData.realtime.weather.info == '阴') {
                            $scope.weatherImage = 'images/cloudy.png';
                        }
                        else if($scope.weatherData.realtime.weather.info == '晴')
                        {
                            $scope.weatherImage = 'images/sunny.png';
                        }
                        else if($scope.weatherData.realtime.weather.info.includes('雨')) {
                            $scope.weatherImage = 'images/storm.png';
                        }



                        // according to the weather, change the icon of each day

                        for(var i=1;i<=4;i++) {
                            if($scope.weatherData.weather[i].info.day[1].includes('多云') || $scope.weatherData.weather[i].info.day[1].includes('阴')) {
                                $scope.cloudy = true;
                            }

                            if($scope.weatherData.weather[i].info.day[1].includes('晴') || $scope.weatherData.weather[i].info.day[1].includes('霾'))
                            {
                                $scope.sunny = true;
                            }

                            if($scope.weatherData.weather[i].info.day[1].includes('雨'))
                            {
                                $scope.hail = true;
                            }

                            
                        }


                        scopeChanged($scope);
                    });




                });
                
            };

            // output.innerHTML = "<p>Locating...</p>";

            navigator.geolocation.getCurrentPosition(success, error);
        });

        function scopeChanged(scope) {
            if (!scope.$$phase) {
                scope.$apply();
            }
        }


    }]);