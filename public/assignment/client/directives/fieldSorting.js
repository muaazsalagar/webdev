/**
 * Created by muaaz on 3/17/16.
 */

"use strict";
// changed as per new sortable
(function () {

    angular
        .module("fieldSorting", [])
        .directive("fieldSorting", fieldSorting);

    function fieldSorting() {

        function link(scope, element) {

            var start = null;
            var end   = null;

            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.fieldSorting({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                fieldSorting: '&'
            },
            link: link
        };
    }
})();