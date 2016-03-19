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
                templateUrl:"client/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl:"client/views/users/register.view.html",
                controller:"RegisterController" ,
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl:"client/views/users/login.view.html",
                controller:"LoginController" ,
                controllerAs:"model"
            })
            .when("/profile", {
                templateUrl:"client/views/users/profile.view.html",
                controller:"ProfileController" ,
                controllerAs:"model"
            })
            .when("/admin", {
                templateUrl:"client/views/admin/admin.view.html",
                controller:"AdminController" ,
                controllerAs:"model"
            })

            .when("/forms", {
                templateUrl:"client/views/forms/forms.view.html",
                controller:"FormController" ,
                controllerAs:"model"
            })

            .when("/form/:formId/fields", {
                templateUrl: "client/views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })


            .otherwise({
                redirectTo:"/home"
            });
    }
})();