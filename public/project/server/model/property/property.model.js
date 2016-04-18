/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function (db,mongoose) {

    var propertySchema = require("./property.schema.server.js")(mongoose);
    var propertyModel = mongoose.model('Property', propertySchema);


    var api = {

        createProperty: createProperty,
        findAllPropertys: findAllPropertys,
        findPropertyById: findPropertyById,
        updatePropertyById: updatePropertyById,
        deletePropertyByID: deletePropertyByID,
        findPropertyByPropertyname: findPropertyByPropertyname,
        findPropertyByCredentials: findPropertyByCredentials,
        getPropertiesInCity: getPropertiesInCity

    };
    return api;


    function createProperty(property) {

        return propertyModel.create(property);

    }


    function findAllPropertys() {
        return propertyModel.find({});


    }

    function findPropertyById(PropertyById) {
        //userID = parseInt(userID);
        console.log("IN MODEL "+PropertyById);
        return propertyModel.findOne({_id:PropertyById});

    }


    function deletePropertyByID(userID) {

        userID = parseInt(userID);
        propertyModel.findByIdAndRemove(userID);
    }


    function updatePropertyById(userId, user) {

        userId = parseInt(userId);
        propertyModel.findByIdAndUpdate(userId, user);

    }


    function findPropertyByPropertyname(userName) {

        return propertyModel.findOne({owner: userName});
    }


    function findPropertyByCredentials(credentials) {

        return propertyModel.findOne({owner: credentials.username});
    }

    function getPropertiesInCity(city) {

        console.log("In Model Property: "+city);

        // callback(propertiesInCity);
        //return propertiesInCity;

        // currently return all
        return propertyModel.find(
            {

            }
        )
    }



};