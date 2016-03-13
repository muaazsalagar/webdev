/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

var mock =require("./user.mock.json");
module.exports= function () {

    var api={

        createUser:createUser,
        findAllUsers:findAllUsers,
        findUserByID:findUserByID,
        updateUserByID:updateUserByID,
        deleteUserByID:deleteUserByID,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials

    };
    return api;
};

function createUser(user){

    mock.push(user);

    return mock;

}


function findAllUsers(){
    return mock;


}

function  findUserByID(userID)
{
    userID=parseInt(userID);

    for(var i in mock)
    {
        if (mock[i]._id==userID)
        {

            return mock[i];
        }
    }
    return null;

}


function  deleteUserByID(userID){

    userID= parseInt(userID);
    for (var i in mock)
    {
        if(mock[i]._id==userId)
        {
            mock.splice(i,1);

            return mock;
        }
    }

}


function  updateUserByID(userID, user){

    userID= parseInt(userID);
    for (var i in mock)
    {
        if(mock[i]._id==userId)
        {
            mock[i]=user;
            return mock;
        }
    }

}




function findUserByUsername(userName)
{
    for (var i in mock)
    {
        if(mock[i].username==userName)
        {
            return mock[i];

        }
    }
    return null;
}



function findUserByCredentials(credentials)
{
    for (var i in mock)
    {
        if(mock[i].username==credentials.username && credentials.password)
        {
            return mock[i];

        }
    }
    return null;
}
