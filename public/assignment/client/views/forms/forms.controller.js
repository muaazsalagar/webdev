/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";


(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, FormService, $location) {

        var vm = this;

        function init() {

            FormService.findAllFormsForUser($rootScope.currentUser._id)

                .then(

                    function(response) {

                        vm.forms = response;

                        vm.$location = $location;
                    }
                );
        }
        init();

        var toBeUpdatedIndex = -1;

        //crud operations from front end

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        // functions implemented
        function addForm(form) {

            FormService.createFormForUser($rootScope.currentUser._id, form)

                .then(

                    function(response) {

                        return FormService.findAllFormsForUser($rootScope.currentUser._id);

                    })
                .then(

                    function (response) {

                        vm.forms = response;

                    }
                );

            vm.form = {};
        }

        function updateForm(form) {

            FormService.updateFormById(form._id, form)

                .then(function (response) {

                    if (response === "Updated") {

                        return FormService.findFormById(form._id);
                    }
                })

                .then(function(updatedForm) {

                    vm.forms[toBeUpdatedIndex] = updatedForm;
                });

            vm.form={};
        }

        function deleteForm($index) {

            var formID = vm.forms[$index]._id;

            FormService.deleteFormById(formID).then(function(response) {

                if(response === "Deleted") {

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

            toBeUpdatedIndex = $index;
        }
    }
})();