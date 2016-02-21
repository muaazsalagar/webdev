/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var users=[];
        users=[
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		},
            {	"_id":1, "firstName":"m",           "lastName":"m",
                "username":"m",     "password":"m",      "roles": ["student"]		}
        ];


        var api = {
            // declaration of methods
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId

        };

        return api;

        // implementation of api functions
        function findMoviesByTitle(title, callback)
        {
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);

        }

        function findMovieByImdbId(imdbId)
        {

        }
    }


})();