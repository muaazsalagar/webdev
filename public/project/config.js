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
                templateUrl:"views/home/home.view.html",
                controller:"HomeController"
            })
            .when("/register", {
                templateUrl:"views/users/register.view.html",
                controller:"RegisterController"
            })
            .when("/login", {
                templateUrl:"views/users/login.view.html",
                controller:"LoginController"
            })
            .when("/profile", {
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController"
            })
            .when("/admin", {
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController"
            })

            .when("/forms", {
                templateUrl:"views/forms/forms.view.html",
                controller:"FormController"
            })

            .otherwise({
                redirectTo:"/home"
            });
    }
})();