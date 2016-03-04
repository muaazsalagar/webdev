/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
    .module("FormBuilderApp")
    .controller("HomeController", HomeController);

    function HomeController($location,$scope, LocationService, $rootScope, $http){

        console.log("In HomeController");
        $scope.result1 = '';
        $scope.options1 = null;
        $scope.details1 = '';

        $scope.getGeoCode=getGeoCode;

        function getGeoCode(address){

            console.log("Address to be located is: "+address);

            LocationService.getLongLatFromAddress(address, function(callback){
                console.log("From Maps ");
                console.log(callback);

            });

        }

    }



})();