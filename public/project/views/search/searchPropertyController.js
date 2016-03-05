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

        /*
        need wait operation
         LocationService.getCityFromAddress(propertyAddress,function(callback) {

         console.log(callback);
         $scope.AddressFetched=callback;


         var city=callback.results[0].address_components[3].short_name;


         console.log("CITY FETCHED FROM ADDRESS: ");
         console.log(city);
         $scope.cityFetched=city;
         });

         */

        //Data for page
        console.log("Call to get Listing has city: ");

        console.log($scope.cityFetched);

        var propertiesOnMap=[];
        var propertiesInCity=[];

        PropertyService.getPropertiesInCity( "boston",function (callback){

            console.log("Properties in city");
            console.log(callback);
            propertiesInCity=callback;


        });

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


            }
        }

        // get the map points

        convertPropertyToMapDisplay();



        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(42.5, -71.0000),
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
            marker.content = '<div class="infoWindowContent">' + info.cost + '</div>';

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
})();