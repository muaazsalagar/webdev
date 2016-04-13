/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, $routeParams, $location, $scope, $uibModal, $log) {

        var vm = this;

        vm.fields = [];
        vm.field = {}

        vm.options = [];

        // crud operations on Field
        vm.removeField = removeField;
        vm.addField = addField;
        vm.editField = editField;
        vm.sortFields = sortFields;

        vm.oldIndex = -1;

        var formId = -1;

        function init() {

            if($routeParams.formId) {

                formId = $routeParams.formId;

                FieldService.getFieldsForForm(formId).then(function (response) {

                    vm.fields = response.fields;
                    $scope.fields = vm.fields;

                });

            }  else {

                $location.url("/forms");
            }

            vm.options = [
                {name: "Single Line Text Field", value: "sline-text"},
                {name: "Multi Line Text Field", value: "mline-text"},
                {name: "Date Field", value: "date"},
                {name: "Dropdown Field", value: "dropdown"},
                {name: "Checkboxes Field", value: "checkbox"},
                {name: "Radio Buttons Field", value: "radio"},
                {name: "Password Field", value: "password"},
                {name: "Email Field", value: "email"}
            ];
        }
        init();

        function removeField($index) {

            var fieldId = vm.fields[$index]._id;

            FieldService.deleteFieldFromForm(formId, fieldId).then(function (response) {

                if(response === "Deleted") {

                    FieldService.getFieldsForForm(formId).then(function (response) {

                        vm.fields = response.fields;
                        $scope.fields = vm.fields;

                    });
                }
            });
        }

        function addField() {

            var fieldType = vm.fieldType.value;

            switch (fieldType) {

                case "sline-text":
                    vm.field = createSingleLineField("TEXT");
                    break;

                case "mline-text":
                    vm.field = createMultiLineField();
                    break;

                case "date":
                    vm.field = createDateField();
                    break;

                case "dropdown":
                    vm.field = createDropDownField();
                    break;

                case "checkbox":
                    vm.field = createCheckboxField();
                    break;

                case "radio":
                    vm.field = createRadioField();
                    break;

                case "email":
                    vm.field = createSingleLineField("EMAIL");
                    break;

                case "password":
                    vm.field = createSingleLineField("PASSWORD");
                    break;

            }

            FieldService.createFieldForForm(formId, vm.field)

                .then(function (response) {

                    if(response === "Created") {
                        return  FieldService.getFieldsForForm(formId);
                    }
                })

                .then(

                    function (response) {

                        vm.fields = response.fields;
                        $scope.fields = vm.fields;
                    }
                )

        }

        function createSingleLineField(type) {

            var field = {
                label: "New " + type.toLowerCase() + " Field",
                type: type,
                placeholder: "New " + type.toLowerCase() + " Field"
            };

            return field;
        }

        function createMultiLineField() {

            var field = {
                label: "New Text Field",
                type: "TEXTAREA",
                placeholder: "New Field"
            };

            return field;
        }

        function createDateField() {

            var field = {
                label: "New Date Field",
                type: "DATE"
            };

            return field;
        }

        function createDropDownField() {

            var field =
            {"label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            return field;
        }

        function createCheckboxField() {

            var field =
            {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            return field;
        }

        function createRadioField() {

            var field =
            {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            return field;
        }


        function editField($index) {

            vm.fieldToBeEdited = vm.fields[$index];

            var modalInstance = $uibModal.open( {

                templateUrl: 'fieldEditModal.html',

                controller: 'ModalInstanceCtrl',

                resolve: {
                    field: function () {

                        return vm.fieldToBeEdited;
                    }
                }

            });

            modalInstance.result
                .then(function (field) {
                    return FieldService.updateField(formId, field._id, field);

                })
                .then(function (response) {
                    if(response === "Updated") {
                        return FieldService.getFieldsForForm(formId);

                    }
                })
                .then(function (response) {
                    vm.fields = response.fields;
                    $scope.fields = vm.fields;

                });
        }

        function sortFields(start, end) {

            FieldService.sortFields(formId, start, end)

                .then(

                    function (response) {

                    },

                    function (err) {

                        vm.error = err;

                    }
                );

        }
    }

    angular.module('FormBuilderApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, field) {

        $scope.field = field;

        $scope.ok = function () {

            if($scope.newLabel) {

                $scope.field.label = $scope.newLabel;
            }

            if($scope.field.type != "DATE") {

                if($scope.newPlaceholder) {

                    if($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA"
                        || $scope.field.type === "EMAIL" || $scope.field.type === "PASSWORD ") {

                        $scope.field.placeholder = $scope.newPlaceholder;

                    } else {

                        UpdateOtherFields();
                    }
                }

            }

            function UpdateOtherFields() {

                var content = $scope.newPlaceholder;

                content = content.trim();

                var rawOptions = content.split("\n");

                var options = [];

                for (var i in rawOptions) {

                    var rawField = rawOptions[i].split(":");

                    var option = {label: rawField[0], value: rawField[1]};

                    options.push(option);
                }

                $scope.field.options = options;

            }

            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();