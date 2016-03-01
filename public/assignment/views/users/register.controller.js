/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,$scope){

        $scope.$location=$location;
        console.log("In Register");

    }
})();