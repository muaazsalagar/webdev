/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl:"/views/users/register.view.html",
                controller:"SearchController"

            })


            .when("/login", {
                templateUrl:"/views/users/login.view.html",
                controller:"SearchController"

            })


            .when("/profile", {
                templateUrl:"/views/users/profile.view.html",
                controller:"SearchController"

            })


            .when("/admin", {
                templateUrl:"/views/users/admin.view.html",
                controller:"SearchController"

            })

            .when("/forms", {
                templateUrl:"/views/forms/forms.view.htmll",
                controller:"SearchController"

            })

            .when("/profile", {
                templateUrl:"/views/users/profile.view.html",
                controller:"SearchController"

            })

            .when("/admin", {
                templateUrl:"/views/admin/admin.view.html",
                controller:"SearchController"

            })



            .otherwise({
                redirectTo:"/views/home/home.view.html"
            })
    }
})();