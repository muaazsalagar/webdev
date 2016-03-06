/**
 * Created by muaazsalagar on 3/3/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .factory("LocationService", LocationService);


    function LocationService($http,$rootScope,$q){

        var forms=[];




        var api = {
            // declaration of methods by following standards of john papas

            getLongLatFromAddress:getLongLatFromAddress,
            getCityFromAddress:getCityFromAddress,
            getCityFormGooleResponse:getCityFormGooleResponse


        };

        return api;

        function getLongLatFromAddress(address, callback){

            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="
                +address+"&key=AIzaSyAVnQMP63GMSCBPBgY2nqzXFhyCmsyCl1Q")
                .success(callback);



        }

        function getCityFromAddress(address, callback){

            var deferred = $q.defer();

            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="
                    +address+"&key=AIzaSyAVnQMP63GMSCBPBgY2nqzXFhyCmsyCl1Q")
                .success(function (response)
                {
                    deferred.resolve(response);
                });


            return deferred.promise;

        }

        function getCityFormGooleResponse(googleMapObject)
        {

            var addressComponents=googleMapObject.results[0].address_components;

            for(var i=0; i<addressComponents.length;i++) {
                var addressComponent=addressComponents[i];
                var types=addressComponent.types;

                if(types[0]=="locality" && types[1]=="political"){

                    return addressComponent.short_name;
                }


            }
            return "No City Matched";
        }




    }
})();