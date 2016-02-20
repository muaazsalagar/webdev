/**
 * Created by muaazsalagar on 2/17/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("HomeController", HomeController);
    function HomeController($scope) {
        $scope.homeHello = "Hello from HomeController"
    }
})();

