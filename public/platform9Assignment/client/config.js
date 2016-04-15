/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("ColorApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"client/views/home/home.view.html"
            })

            .when("/edit", {
                templateUrl: "client/views/colors/colors.view.html",
                controller: "ColorsController",
                controllerAs: "model"

            })

            .otherwise({
                redirectTo:"/home"
            });
    }
})();