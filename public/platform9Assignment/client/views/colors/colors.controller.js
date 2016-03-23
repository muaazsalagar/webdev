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
        function addColor(color) {

            ColorService.createColorForUser(color).then(function(response) {

                vm.colors = response;

            });
            vm.color = {};
        }

        function updateColor(color) {

            ColorService.updateColorById(color._id, color).then(function (response) {

                if (response === "OK") {

                    ColorService.findColorById(color._id).then(function(updatedColor) {

                        vm.colors[toBeUpdatedIndex] = updatedColor;
                    });
                }
            });

            vm.color={};
        }

        function deleteColor($index) {

            var colorID = vm.red_colors[$index]._id;

            ColorService.deleteColorById(colorID).then(function(response) {

                if(response === "OK") {
                    init();
                }
            });
        }

        function selectColor($index) {

            vm.color={};

            var selectedColor = vm.red_colors[$index];

            vm.color = {
                _id: selectedColor._id,
                title: selectedColor.title,
                userId: selectedColor.userId
            };

            toBeUpdatedIndex = $index;
        }
    }
})();
