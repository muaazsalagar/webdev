/**
 * Created by muaazsalagar on 2/17/16.
 */
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("ProfileControllerWhiteBoard", ProfileControllerWhiteBoard);
    function ProfileControllerWhiteBoard($scope) {
        $scope.profileHello = "Hello from ProfileControllerWhiteBoard"
    }
})();