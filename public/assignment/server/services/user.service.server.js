/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");



module.exports = function(app, userModel, uuid) {

    // for passport intercepters
    var auth = authorized;

    //Registers a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/register",  register);

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user",createUser);

    //Return logged in user
    app.get("/api/assignment/user/loggedin", loggedIn);

    //Logout
    app.post("/api/assignment/user/logout", logout);

    //responds with all users
    app.get("/api/assignment/user",auth ,findAllusers);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/assignment/user/:id",auth ,updateUserById);

    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users
    app.delete("/api/assignment/user/:id",auth, deleteUserById);


    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);

    // for passport implementation

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



// all tools for login and basic functions

    function localStrategy(username, password, done) {

        // find user by username
        console.log()
        userModel.findUserByUsername(username)

            .then(

                function (user) {
                    console.log(user);

                    // if user is returned by userName:
                    if(user && bcrypt.compareSync(password, user.password)) {

                        // return with done with user as response

                        return done(null, user);

                    }else {
                        // otherwise return false
                        return done(null, false);
                    }

                } ,
                function (err) {
                    // else set error

                    if (err) { return done(err); }
                }
            )
    }

    function login(req, res) {

        console.log("In login");
        var user = req.user;
        res.json(user);
    }


    function loggedIn(req, res) {
        console.log("In loggedIn");

        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {

        req.logOut();
        res.send(200);
    }

    // passportJS user methods
    function serializeUser(user, done) {

        done(null, user);

    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)

            .then(
                // if user found set done with user response
                function(user){

                    done(null, user);
                },

                function(err){

                    done(err, null);
                }

            );
    }


    function isUserIsAdmin(user) {

        // check in the roles array

        if(user.roles.indexOf("admin") > 0) {

            return true;
        }
        return false;
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {
            res.send(401);

        } else {
            next();
        }
    }

    // for register with passport

    function register(req, res){

        console.log("In Register");
        // take info from body
        var userInRequest = req.body;

        userInRequest.roles = ['student'];

        userModel.findUserByUsername(userInRequest.username)
            .then(

                function (user) {

                    if(user) {
                        res.json(null);
                    }
                    else {
                        // user is new
                        // encrypt user password with bcrypt set password encrypted
                        userInRequest.password = bcrypt.hashSync(userInRequest.password);

                        // return with createUser of UserModel Request

                        return userModel.createUser(userInRequest);
                    }
                }
            )

            .then(

                function (registeredUser) {

                    if(registeredUser) {

                        // if user is registered successfuly from userModel

                        req.login(registeredUser,function (err) {

                            if(err) {

                                // if any error of passport login method

                                res.status(400).send(err);

                            } else {
                                // else user login of passport success so
                                // return user in response

                                res.json(registeredUser);
                            }

                        });
                    }

                },

                function (err) {

                    res.status(400).send(err);

                }
            );

    }




    function createUser (req, res) {

        var userFromRequest = req.body;

        if(userFromRequest.roles && userFromRequest.roles.length > 1) {
            // add roles by commo septated values
            userFromRequest.roles = userFromRequest.roles.split(",");

        } else {
            // otherwise default role as student

            userFromRequest.roles = ["student"];
        }

        // first check if a user already exists by userName
        userModel
            .findUserByUsername(userFromRequest.username)
            .then(

                function(user){

                    // if the user does not already exist
                    if(user == null) {

                        userFromRequest.password = bcrypt.hashSync(userFromRequest.password);
                        // create new User
                        return userModel.createUser(userFromRequest)

                            .then(

                                // fetch all the users
                                function(){

                                    return userModel.findAllUsers();
                                },

                                function(err){

                                    res.status(400).send(err);
                                }
                            );

                        // if  user already exits then return all users

                    } else {

                        return userModel.findAllUsers();
                    }
                },

                function(err){

                    res.status(400).send(err);
                }
            )
            .then(

                // if users are returned

                function(users){

                    res.json(users);
                },
                function(){
                    // else send error
                    res.status(400).send(err);
                }
            )

    }

    function findAllusers (req, res) {

     // change for all passport

        if(req.query.username && req.query.password) {

            findUserByCredentials(req, res);

        }else if (req.query.username) {

            findUserByUsername(req, res);

        }else {

            if(isUserIsAdmin(req.user)) {

                userModel.findAllUsers()

                    .then(

                        function (users) {

                            var normalUsers = [];

                            for(var i in users) {
                                if(users[i].roles.indexOf('admin') === -1) {
                                    normalUsers.push(users[i]);
                                }
                            }

                            res.json(normalUsers);

                        },

                        function (err) {

                            res.status(400);
                        }
                    );

            }else {
                res.status(403);
            }
        }

    }


    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        var currentUser = userModel.findUserByCredentials(credentials)

            .then(

                function (doc) {
                    req.session.currentUser = doc;

                    res.json(doc);

                },

                function (err) {

                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res) {

        var userId = req.params.id;

        userModel.findUserById(userId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;

        userModel.findUserByUsername(username)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }




    function updateUserById(req, res) {

        var userId = req.params.id;

        var user = req.body;

        userModel.updateUserById(userId, user)

            .then(

                function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');
                    } else {

                        res.status(200).send('Updated');
                    }
                }
            );
    }

    function deleteUserById(req, res) {

        var userId = req.params.id;

        if(isUserIsAdmin(req.user)) {

            userModel.deleteUserById(userId)

                .then(
                    function (doc) {

                        if (doc) {

                            res.status(200).send('Deleted');
                        }
                        else {

                            res.status(400).send(err);
                        }
                    }
                );
        }else {
            res.status(403);
        }

    }
}