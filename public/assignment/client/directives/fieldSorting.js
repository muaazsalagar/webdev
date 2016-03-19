/**
 * Created by sudeep on 3/17/16.
 */

"use strict";

(function () {

    angular
        .module("fieldSorting", [])
        .directive("fieldSorting", fieldSorting);
    
    function fieldSorting() {

        var start = null, end = null;

        function link(scope, element, attributes) {

            var fieldAxis = attributes.fieldAxis;

            $(element).sortable( {

                axis: fieldAxis,

                start: function (event, ui) {

                    start = ui.item.index();
                },
                
                stop: function (event, ui) {

                    end = ui.item.index();
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();