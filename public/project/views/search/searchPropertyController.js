/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("PropertySearch",PropertySearch);

    function PropertySearch($location,$scope, UserService, $rootScope, $routeParams, LocationService,PropertyService){

        //$scope.propertySearch=propertySearch;
        $scope.$location=$location;

        var propertyAddress=$routeParams.propertyAddress;
        console.log("propertyAddress "+ propertyAddress);


        //need wait operation
        /*
         LocationService.getCityFromAddress(propertyAddress,function(callback) {

         console.log(callback);
         $scope.AddressFetched=callback;


         var city=callback.results[0].address_components[3].short_name;


         console.log("CITY FETCHED FROM ADDRESS: ");
         console.log(city);
         $scope.cityFetched=city;
         });

         */

        var propertiesOnMap=[];
        var propertiesInCity=[];
        var mapCenter=[];


        LocationService.getCityFromAddress(propertyAddress).then(function(response){

            //$scope.cityFetched=response.results[0].address_components[3].short_name;

            $scope.cityFetched=LocationService.getCityFormGooleResponse(response);


            console.log("Google Returned");
            console.log(response);

            PropertyService.getPropertiesInCity( $scope.cityFetched,function (callback){

                console.log("The Fetched City is: " + $scope.cityFetched);
                console.log("Properties in city");
                console.log(callback);
                propertiesInCity=callback;


                convertPropertyToMapDisplay();


            });


        });

        //Data for page
        console.log("Call to get Listing has city: ");

        console.log($scope.cityFetched);



        function convertPropertyToMapDisplay(){
            for (var i=0;i<propertiesInCity.length;i++)
            {
                var apropertyFectched=propertiesInCity[i];
                var propertyonmap={
                    "city" : apropertyFectched.address.city,
                    "desc" : apropertyFectched.desc,
                    "lat" : apropertyFectched.address.lat,
                    "long" : apropertyFectched.address.long,
                    "cost":apropertyFectched.cost
                };

                propertiesOnMap.push(propertyonmap);

                if(propertiesOnMap[0]);
                {
                    mapCenter[0]=propertiesOnMap[0].lat;
                    mapCenter[1]=propertiesOnMap[0].long;

                }


                getCarousalOnMap();

                mapReady();


            }
        }

        // get the map points



        function mapReady()
        {
            console.log(mapCenter[0],mapCenter[1]);


            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(mapCenter[0], mapCenter[1]),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            $scope.map = new google.maps.Map(document.getElementById('map1'), mapOptions);

            $scope.markers = [];

            var infoWindow = new google.maps.InfoWindow();

            var createMarker = function (info){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.desc
                });

                //marker.content = '<div class="infoWindowContent">' + info.cost + '</div>';

                var strVar="";
                strVar += " <div id='slides_control' style='width: 260px;left:50%;top:20px;margin-left:-200px;'>";
                strVar += "      <carousel>";
                strVar += "        <slide ng-repeat=\"slide in slides\" active=\"slide.active\">";
                strVar += "          <img ng-src=\"{{slide.image}}\">";
                strVar += "          <div class=\"carousel-caption\">";
                strVar += "            <h4>Slide {{$index+1}}<\/h4>";
                strVar += "          <\/div>";
                strVar += "        <\/slide>";
                strVar += "      <\/carousel>";
                strVar += "    <\/div>";

                //marker.content = '<div c>' + strVar + '</div>';

                marker.content = '<div >' + strVar + '</div>';

                console.log($scope.slides);
                //console.log(content);


                //marker.content = '<div class="slides_control" >' + content + '</div>';




                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    // add carousal to content appropriately by calling services for location data

                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);

            }


            // create Markers:

            for (i = 0; i < propertiesOnMap.length; i++){
                createMarker(propertiesOnMap[i]);
            }

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }



        }

        function getCarousalOnMap(){

            $scope.slides = [
                {
                    image: 'http://lorempixel.com/400/200/'
                },
                {
                    image: 'http://lorempixel.com/400/200/food'
                },
                {
                    image: 'http://lorempixel.com/400/200/sports'
                },
                {
                    image: 'http://lorempixel.com/400/200/people'
                }
            ];




        }


    }
})();