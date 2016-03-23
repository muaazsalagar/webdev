/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("ColorApp")
        .controller("ColorsController", ColorsController);

    function ColorsController($rootScope, ColorService, $location) {

        var vm = this;

        function init() {

            ColorService.findColorsByColor("red").then(function(response) {

                vm.red_colors = response;



            });
            ColorService.findColorsByColor("blue").then(function(response) {

                vm.blue_colors = response;



            });
            ColorService.findColorsByColor("green").then(function(response) {

                vm.green_colors = response;



            });

        }
        init();

        var toBeUpdatedIndex = -1;

        //Event handler declarations
        vm.addColor = addColor;
        vm.updateColor = updateColor;
        vm.deleteColor = deleteColor;
        vm.selectColor = selectColor;

        //Event handler implementations
        function addColor(form) {

            ColorService.createColorForUser(color).then(function(response) {

                vm.colors = response;

            });
            vm.form = {};
        }

        function updateColor(form) {

            ColorService.updateColorById(form._id, form).then(function (response) {

                if (response === "OK") {

                    ColorService.findColorById(form._id).then(function(updatedColor) {

                        vm.forms[toBeUpdatedIndex] = updatedColor;
                    });
                }
            });

            vm.form={};
        }

        function deleteColor($index) {

            var formID = vm.forms[$index]._id;

            ColorService.deleteColorById(formID).then(function(response) {

                if(response === "OK") {
                    init();
                }
            });
        }

        function selectColor($index) {

            vm.form={};

            var selectedColor = vm.forms[$index];

            vm.form = {
                _id: selectedColor._id,
                title: selectedColor.title,
                userId: selectedColor.userId
            };

            toBeUpdatedIndex = $index;
        }
    }
})();
