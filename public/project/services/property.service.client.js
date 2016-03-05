/**
 * Created by muaazsalagar on 3/5/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .factory("PropertyService", PropertyService);


    function PropertyService($http,$rootScope){

        var forms=[];

        properties=[
            {
                "desc":"Near NEU",
                "address":{"addressLine1":"","addressLine2":"","city":"boston","state":"ma","zipCode":"","lat": "42","long":"-71"},
                "capacity":"100",
                "eventAvailable":["party","marriage","birthday"],
                "facilities":["party","marriage","birthday"],
                "cost":1000

            },

            {
                "desc":"Best Party",
                "address":{"addressLine1":"","addressLine2":"","city":"Boston","state":"ma","zipCode":"","lat": "43","long":"-71.2"},
                "capacity":"100",
                "eventAvailable":["party","marriage","birthday"],
                "facilities":["party","marriage","birthday"],
                "cost":2000

            },

            {
                "desc":"Panera",
                "address":{"addressLine1":"","addressLine2":"","city":"Boston","state":"ma","zipCode":"","lat": "42","long":"-71.6"},
                "capacity":"10",
                "eventAvailable":["party","marriage","birthday"],
                "facilities":["party","marriage","birthday"],
                "cost":3000

            },
            {
                "address":{"addressLine1":"","addressLine2":"","city":"new york","state":"NY","zipCode":"","lat": "42","long":"-71.2"},
                "capacity":"10",
                "eventAvailable":["party","marriage","birthday"],
                "facilities":["party","marriage","birthday"],
                "cost":3000

            }


        ];


        var api = {
            // declaration of methods by following standards of john papas

            getPropertiesInCity:getPropertiesInCity


        };

        return api;


        function getPropertiesInCity(city, callback){

            var propertiesInCity=[];
            for (var i=0;i<properties.length;i++)
            {
                var property=properties[i];
                var propertyCity=null;
                propertyCity=property.address.city;
                if(propertyCity.toUpperCase()===city.toUpperCase())
                {
                    propertiesInCity.push(property);
                    console.log("Cheking for city ");
                    console.log(propertyCity);

                }
            }

            callback(propertiesInCity);
        }


    }
})();
