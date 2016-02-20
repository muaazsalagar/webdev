/**
 * Created by muaazsalagar on 2/17/16.
 */

(function () {

    // we need routing here
    angular
    .module("MovieApp")
    .confi(configuration);




    function configuration ($routeProvider){
        $routeProvider
        .when("/home",{
            templateUrl:"home/home.view.html"
        })
        when("/search",{
            templateUrl:"home/search.view.html",
            controller:"SearchController"
        })
            .otherwise({
                redirectTo: "/home"
            })
    }
})