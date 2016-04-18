/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("ManagerController", ManagerController);

    function ManagerController($rootScope, PropertyService, UserService,$location,$routeParams) {

        // for the registration of the user

        var vm = this;

        vm.register = register;

        function register(newProperty) {

            // get emails seperated:
            console.log("IN Manager Controller");

            UserService.findUserById($rootScope.currentUser._id)
                .then(function(user) {

                    //console.log(user);

                    newProperty.owner=user.firstName+ " "+user.lastName;
                    newProperty.owner_id=user._id;
                    newProperty.eventsAvailable = newProperty.eventsAvailable.trim().split(",");
                    newProperty.facilities = newProperty.facilities.trim().split(",");

                    PropertyService.createProperty(newProperty)
                        .then(function(newProperty) {

                            console.log("Registered Controller now properties are !!!");
                            console.log(newProperty);
                            var propertyID=newProperty._id;

                            //location.reload();
                            var newUrl="/property/:propertyID/propertyDetails";
                            newUrl=newUrl.replace(":propertyID",propertyID);

                            $location.url(newUrl);

                           // vm.property={};
                        });


                });


        }

    }

})();
