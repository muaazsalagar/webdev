/**
 * Created by muaazsalagar on 2/20/16.
 */
/**
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, FormService, $location) {

        var vm = this;

        function init() {

            FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(response) {

                vm.forms = response;

                vm.$location = $location;

            });
        }
        init();

        var UpdatForIndex = -1;

        //Event handler declarations
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        //Event handler implementations
        function addForm(form) {

            FormService.createFormForUser($rootScope.currentUser._id, form).then(function(response) {

                vm.forms = response;

            });
            vm.form = {};
        }

        function updateForm(form) {

            FormService.updateFormById(form._id, form).then(function (response) {

                if (response === "OK") {
                    // success for form id

                    FormService.findFormById(form._id).then(function(updatedForm) {

                        vm.forms[UpdatForIndex] = updatedForm;
                    });
                }
            });

            vm.form={};
        }

        function deleteForm($index) {

            var formID = vm.forms[$index]._id;

            FormService.deleteFormById(formID).then(function(response) {

                if(response === "OK") {
                    init();
                }
            });
        }

        function selectForm($index) {

            vm.form={};

            var selectedForm = vm.forms[$index];

            vm.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };

            UpdatForIndex = $index;
        }
    }
})();
