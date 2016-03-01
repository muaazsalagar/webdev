/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location,$scope){

        $scope.$location=$location;
        console.log("In Profile");

    }
})();