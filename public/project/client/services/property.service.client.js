/**
 * Created by muaazsalagar on 3/5/16.
 */

(function () {

    angular
        .module("BanquetApp")
        .factory("PropertyService", PropertyService);


    function PropertyService($http,$q,$rootScope){

        var api = {
            // declaration of methods by following standards of john papas

            getPropertiesInCity:getPropertiesInCity,

            createProperty:createProperty,
            setCurrentProperty:setCurrentProperty,
            getCurrentProperty:getCurrentProperty,

            // Api
            findPropertyByCredentials:findPropertyByCredentials,
            findPropertyByPropertyname:findPropertyByPropertyname,
            findAllPropertys:findAllPropertys,
            updatePropertyByID:updatePropertyByID,
            findPropertyByID:findPropertyByID,
            deletePropertyById:deletePropertyById

        };

        return api;


        /*function getPropertiesInCity(city, callback){

            var propertiesInCity=[];
            for (var i=0;i<properties.length;i++)
            {
                var property=properties[i];
                var propertyCity=null;
                propertyCity=property.address.city;
                if(propertyCity.toUpperCase()===city.toUpperCase())
                {
                    propertiesInCity.push(property);
                    //console.log("Cheking for city ");
                    //console.log(propertyCity);

                }
            }

            callback(propertiesInCity);
        }*/


        function getPropertiesInCity(city)
        {
            console.log("Client Calling the find all properties in the city from server");
            var deferred=$q.defer();
            var url="/api/banquet/property/city/:city";
            url=url.replace(":city",city);
            console.log(url);
            console.log(city);

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function findPropertyByCredentials(propertyname, password) {

            var deferred = $q.defer();

            var url = "/api/banquet/property?propertyname=:propertyname&password=:password";
            url = url.replace(":propertyname", propertyname);
            url = url.replace(":password", password);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createProperty(property)
        {
            var deferred=$q.defer();
            var url="/api/banquet/property";
            $http.post(url,property).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function setCurrentProperty (property) {
            $rootScope.currentProperty = property;
        }

        function getCurrentProperty () {
            return $rootScope.currentProperty;
        }

        function findPropertyByPropertyname(propertyname)
        {
            var deferred=$q.defer();
            var url="/api/banquet/property?propertyname=propertyname";
            url=url.replace(":propertyname",propertyname);
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function findAllPropertys(){
            var deferred=$q.defer();
            var url="/api/banquet/property";

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });


            return deferred.promise;
        }

        function updatePropertyByID(propertyId,property)
        {
            var deferred=$q.defer();
            var url="/api/banquet/property/:id";
            url=url.replace(":id",propertyId);
            console.log(url);
            console.log(propertyId);

            $http.put(url,property).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deletePropertyById(property)
        {
            var deferred=$q.defer();
            var url="/api/banquet/property/:id";
            $http.delete(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findPropertyByID(propertyId)
        {
            console.log("Client Calling the find propertyByID to the server");
            var deferred=$q.defer();
            var url="/api/banquet/property/:id";
            url=url.replace(":id",propertyId);
            console.log(url);
            console.log(propertyId);

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }




    }
})();
