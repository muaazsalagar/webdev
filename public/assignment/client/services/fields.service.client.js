/**
 * Created by muaazsalagar on 2/03/10.
 */

"use strict";

(function () {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var api = {


            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            sortFields: sortFields

        };
        return api;

        function createFieldForForm(formId, field) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId/field";
            url = url.replace(":formId", formId);

            $http.post(url, field).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function getFieldsForForm(formId) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId/field";
            url = url.replace(":formId", formId);

            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId/field/:fieldId";
            url = url.replace(":formId", formId);
            url = url.replace(":fieldId", fieldId);

            $http.get(url).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId/field/:fieldId";
            url = url.replace(":formId", formId);
            url = url.replace(":fieldId", fieldId);

            $http.delete(url).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId/field/:fieldId";
            url = url.replace(":formId", formId);
            url = url.replace(":fieldId", fieldId);

            $http.put(url, field).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        // sortable


        function sortFields(formId, startIndex, endIndex) {

            return $http
                .put("/api/assignment/form/" + formId + "/field?startIndex=" + startIndex + "&endIndex=" + endIndex);
        }

    }
})();