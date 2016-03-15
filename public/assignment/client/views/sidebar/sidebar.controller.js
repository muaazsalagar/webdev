/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($location, $rootScope){

        var vm=this;
        

        vm.$location=$location;
        vm.isAdmin=isAdmin;

        function isAdmin()
        {

            var currentUser=$rootScope.currentUser;
            if (currentUser!=null) {


                var roles = currentUser.roles;
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i] == "admin") {
                        return true;

                    }

                }
            }
            return false;
        }

    }




}) ();
