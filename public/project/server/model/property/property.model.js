/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

var mock = require("./property.mock.json");
module.exports = function () {

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
};


function createProperty(user) {

    mock.push(user);
    // console.log("after creation, users are:")
    console.log(mock);

    return mock;

}


function findAllPropertys() {
    return mock;


}

function findPropertyById(userID) {
    userID = parseInt(userID);

    for (var i in mock) {
        if (mock[i]._id == userID) {
            console.log("Match Found");
            return mock[i];
        }
    }
    return null;

}


function deletePropertyByID(userID) {

    userID = parseInt(userID);
    for (var i in mock) {
        if (mock[i]._id == userId) {
            mock.splice(i, 1);

            return mock;
        }
    }

}


function updatePropertyById(userId, user) {

    userId = parseInt(userId);
    for (var i in mock) {
        if (mock[i]._id == userId) {
            console.log("Match Found");
            mock[i] = user;
            return mock;
        }
    }

}


function findPropertyByPropertyname(userName) {
    for (var i in mock) {
        if (mock[i].username == userName) {
            return mock[i];

        }
    }
    return null;
}


function findPropertyByCredentials(credentials) {
    for (var i in mock) {
        if (mock[i].username == credentials.username &&
            mock[i].password == credentials.password) {
            return mock[i];

        }
    }
    return null;
}

function getPropertiesInCity(city) {
console.log("In Model Property ");

    var propertiesInCity = [];
    for (var i in mock) {
        var property = mock[i];
        var propertyCity = null;
        propertyCity = property.address.city;
        if (propertyCity.toUpperCase() === city.toUpperCase()) {
            propertiesInCity.push(property);
            //console.log("Cheking for city ");
            //console.log(propertyCity);
        }
    }

   // callback(propertiesInCity);
    return propertiesInCity;
}

