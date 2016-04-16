/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("PropertyController", PropertyController);

    function PropertyController($rootScope, PropertyService,ReviewService, $location,$routeParams) {

        var propertyId=$routeParams.propertyId;

        var vm = this;

        function init() {

            PropertyService.findPropertyByID(propertyId).then(function (response) {


            vm.property=response;
                console.log("Success1");

            });

            ReviewService.findReviewByPropertyId(propertyId).then(function (response) {
            vm.reviews=response;
            console.log("Success2");
            });


        }
        init();



    }
})();
