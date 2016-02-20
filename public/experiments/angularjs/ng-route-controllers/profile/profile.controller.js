/**
 * Created by muaazsalagar on 2/17/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope) {
        $scope.profileHello = "Hello from ProfileController"
    }
})();