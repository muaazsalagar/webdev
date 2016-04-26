/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(db, mongoose) {

    var projectuserSchema = require("./user.schema.server.js")(mongoose);

    var userModel = mongoose.model('ProjectUser', projectuserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        // new added feature for admin

        findAllUsers: findAllUsers,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {

        return userModel.create(user);
    }

    function findUserById(userId) {

        return userModel.findById(userId);
    }

    // for admin
    function findAllUsers() {
        return userModel.find({});
    }


    function findUserByCredentials(credentials) {

        return userModel.findOne({username: credentials.username, password: credentials.password});
    }

    function updateUserById(userId, user) {

        return userModel.findByIdAndUpdate(userId, user);
    }

    function deleteUserById(userId) {

        return userModel.findByIdAndRemove(userId);
    }

    function findUserByUsername(userName) {

        return userModel.findOne({username: userName});
    }




}