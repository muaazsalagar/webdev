/**
 * Created by muaazsalagar on 2/17/16.
 */


(function(){
    angular
        .module("WhiteBoardApp", ["ngRoute"])
        .config(function($routeProvider){

            // route provider is the service by
            $routeProvider
                .when("/", {
                    templateUrl: "home.html"
                })
                .when("/profile", {
                    templateUrl: "profile.html"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();



