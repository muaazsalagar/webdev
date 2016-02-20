/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
    .module("MovieApp")
    .config(configuration);


    function configuration($routeProvider){
    $routeProvider
        .when("/home",{
         templateUrl:"home.view.html"
        })
        .when("/search", {
            templateUrl:"search/search.view.html",
            controller:"SearchController"

        })

        //to maintain state of the application after search and results

        .when("/search/:title", {
            templateUrl:"search/search.view.html",
            controller:"SearchController"

        })


        .when ("/details/:imdbID",{
            templateUrl:"details/details.view.html",
            controller:"DetailsController"


        })

        .otherwise({
            redirectTo:"/home"
        })
    }
})();