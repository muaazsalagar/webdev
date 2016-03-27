/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("PropertyController", PropertyController);

    function PropertyController($rootScope, PropertyService, $location) {

        var vm = this;

        function init() {

           /* FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(response) {

                vm.forms = response;

                vm.$location = $location;

            });*/
        }
        init();



    }
})();
