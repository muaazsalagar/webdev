/**
 * Created by muaazsalagar on 3/3/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .factory("LocationService", LocationService);


    function LocationService($http,$rootScope){

        var forms=[];




        var api = {
            // declaration of methods by following standards of john papas

            getLongLatFromAddress:getLongLatFromAddress,
            getCityFromAddress:getCityFromAddress


        };

        return api;

        function getLongLatFromAddress(address, callback){

            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="
                +address+"&key=AIzaSyAVnQMP63GMSCBPBgY2nqzXFhyCmsyCl1Q")
                .success(callback);



        }

        function getCityFromAddress(address, callback){

            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="
                    +address+"&key=AIzaSyAVnQMP63GMSCBPBgY2nqzXFhyCmsyCl1Q")
                .success(callback);



        }



    }
})();