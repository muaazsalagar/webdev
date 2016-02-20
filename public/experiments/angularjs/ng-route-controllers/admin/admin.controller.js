/**
 * Created by muaazsalagar on 2/17/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("AdminController", AdminController);
    function AdminController($scope) {
        $scope.adminHello = "Hello from AdminController"
    }
})();