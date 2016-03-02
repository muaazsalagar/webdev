/**
 * Created by muaazsalagar on 2/17/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileControllerWhiteBoard"
                })
                .when("/admin", {
                    templateUrl: "admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();