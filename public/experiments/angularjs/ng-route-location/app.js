/**
 * Created by muaazsalagar on 2/17/16.
 */



(function(){
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .config(function($routeProvider){

            // we are configuring the route provider which is service provided by angular framerwork


            // route provider is the service by
            $routeProvider
                .when("/", {
                    templateUrl: "home.view.html"
                })
                .when("/profile", {
                    templateUrl: "profile.html"
                })
                .when("/admin", {
                    templateUrl: "admin.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        }).controller("NavController", function($scope, $location) {
        $scope.$location = $location;

        // here we can change scope and location param values ; parameter order does not matter
        // this is called dependecny injection same as Spring MVC and other framerwork

        // problem or flaw with this is : production deployemtn uses minified version function param names are
        // shortended so we need to work around that
    });

})();
