/**
 * Created by muaazsalagar on 2/12/16.
 */

/**standrad practice is as in functions you are oblivious to other funcitons outside the funciton so it for name space */


(function ()
{
    // module is as some programs built hierarchically
    angular.module("MovieAdminApp",[]).controller("MovieController", MovieController);


    function MovieController($scope)

    {   //$scope is global vaibale which will allow us to access varibales from controller and view and vice a versa
        // these are tightly coupled and each one will know about changes in its values.
        $scope.hello=("Hello from the Controller")

        $scope.movies=[
            {id:1, title:"starwars", director:"JJ abrams"},
            {id:2, title:"Days of our Lives", director:"JJ abrams"},
            {id:3, title:"starwars", director:"JJ abrams"}

        ];

        // this is bets practice guidline by john papa

        $scope.addMovie=addMovie;
        $scope.deleteMovie=deleteMovie;
        $scope.selectMovie=selectMovie;
        $scope.updateMovie=updateMovie;



        function addMovie (movie)
        {
            console.log("adding new movie ");


            var newMovie = {
                id:movie.id,
                title:movie.title,
                director:movie.director
            };
            console.log("New Movie adding done")
            $scope.movies.push(newMovie)
            // to clear the adding tag for
            $scope.movie={};
        }
        
        function deleteMovie(movie) {
           //

            var indexOfSelected=$scope.movies.indexOf(movie);
            console.log("Delete Clicked for index"+indexOfSelected);

            // splice gives more info about data like its an array so no splice to make it object oriented we can directly pass
            // as instance not index instance
           // $scope.movies.splice(index,1); so we get index from intsance
            // this actualy should not be in controller it should be in db directly as it DB opertation in mongo! so we will learn that


            $scope.movies.splice(movie,1);
        }

        function selectMovie(movie)
        {
            // bind the selected instance of movie to form


            $scope.movie={
                id:movie.id,
                title:movie.title,
                director:movie.director
            };
            $scope.movie=movie;


        }


        function updateMovie(movie)
        {
           var index=$scope.movies.indexOf(movie);
            console.log("the index of update selected is: "+index)

           var updatedMovie = {
               id:movie.id,
               title:movie.title,
               director:movie.director
           };

           $scope.movies[index]=updatedMovie;
            $scope.movie={};


        }
    }
}) ();