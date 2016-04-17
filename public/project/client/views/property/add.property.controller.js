/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("AddPropertyController", AddPropertyController);

    function AddPropertyController($rootScope, PropertyService,ReviewService, $location,$routeParams) {

        // for the registration of the user

        var vm = this;

        vm.register = register;

        function register(newProperty) {

            // get emails seperated:
            console.log("IN Property Controller");

            newProperty.eventsAvailable = newProperty.eventsAvailable.trim().split(",");
            newProperty.facilities = newProperty.facilities.trim().split(",");

            PropertyService.createProperty(newProperty)
                .then(function(users) {

               console.log("Registered Controller");
            });
        }

    }

})();
