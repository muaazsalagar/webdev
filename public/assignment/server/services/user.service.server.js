/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"
module.exports=function(app,UserModel,uuid)
{
 // var UserModel =require("./../model/user/user.model.js")();


    //responds with an array of all users
    app.get("/api/assignment/user",findAllUsers);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id",findUserByID );

    //responds with a single user whose username property is equal to the username path parameter
    app.get("/api/assignment/user?username=:username",findUserByUsername);


    // responds with a single user whose username property is equal to the username
    // path parameter and its password is equal to the password path parameter

    app.get("/api/assignment/user?username=:username&password=:password",findUserByCredentials);



    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user", createUser);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request. Responds with an array of all users
    app.put("/api/assignment/user/:id",updateUserByID);


    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users

    app.delete("/api/assignment/user/:id",deleteUserByID);


    function createUser(req, res)
    {
        var user= req.body;
        user._id=parseInt(uuid.v4());

        var userCreated=UserModel.createUser(user);

        res.sendStatus(200);
    }


    function findAllUsers(req, res)
    {
        var response;
        var userId=req.params.userId;
        var username=req.params.username;
        var password=req.params.password;


        // cheking with params in the request
        if(username)
        {
            response=UserModel.findUserByUsername(username);

        }
        else if(username && password)
        {
            var credentials={"username":username,
                            "password":password};
            response=UserModel.findUserByCredentials(credentials);
        }

        else
        {
            // else return all users
            response=UserModel.findAllUsers(req);
        }

        //res.json(UserModel.findAllUsers());

        // set final response as jason
        res.json(response);

    }


    function findUserByID(req, res)
    {
        var userId=req.params.userId;
        var searchedUser=UserModel.findUserByID(userId);
        res.json(searchedUser);
    }


    function findUserByUsername(req, res)
    {
       var username= req.query.username;

        var userSearched=UserModel.findUserByUsername(username);


        res.json(userSearched);
    }


    function findUserByCredentials(req, res)
    {
        var username=req.params.username;
        var password=req.params.password;
        var credentials ={ "username":username, "password": password};
        console.log("The user is :"+username);
        var searchedUser=UserModel.findUserByCredentials(credentials);
        res.json(searchedUser);
    }


    function updateUserByID(req, res)
    {
        var userID=req.param.userId;
        var user=req.param.user;
        var updatedUser=UserModel.updateUserByID(userID,user);

        res.sendStatus(200);
    }


    function deleteUserByID(req, res)
    {
        var userId=req.param.userID;

        var afterDeleteList=UserModel.deleteUserByID(userId);
        res.json(afterDeleteList);
    }


};