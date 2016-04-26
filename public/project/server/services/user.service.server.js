/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"
var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");



// load the auth variables
var configAuth = require("../config/auth.js");

module.exports = function(app, userModel, uuid) {

    // for passport intercepters
    var auth = authorized;

    //Registers a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/project/register",  register);

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/project/user",createUser);

    //Return logged in user
    app.get("/api/project/user/loggedin", loggedIn);

    //Logout
    app.post("/api/project/user/logout", logout);

    //responds with all users
    app.get("/api/project/user",auth ,findAllusers);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/project/user/:id",auth ,updateUserById);


    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/project/user/:id", findUserById);


    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users

    app.delete("/api/project/user/:id", auth, deleteUserById);

    // for passport implementation

    //app.post  ('/api/project/login', passport.authenticate('local'), login);


    // FB STUFF
    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/#/login'
        }));


    var facebookConfig = {
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);




// all tools for login and basic functions

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserById(profile.id)
            .then(
                function(user) {
                    if(user) {

                        console.log("user From FB ");

                        console.log(user);

                        return done(null, user);
                    } else {

                        // else create user:

                        var names = profile.displayName.split(" ");
                        var username=(names[0]+names[1]).toLowerCase();
                        var userId= parseInt(profile.id);

                        var newFacebookUser = {
                            username:username,
                            lastname:  names[1],
                            firstname: names[0],
                            //email:     profile.emails ? profile.emails[0].value:"",
                            roles:["user","admin","manager"],
                            _id:   userId,
                            password: token
                        };
                        console.log(newFacebookUser);
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    console.log("ERROR IN FB AUTH ");
                    console.log(err);
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
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

    function login(req, res) {

        var user = req.user;
        res.json(user);

    }

    function loggedIn(req, res) {

        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {

        req.logOut();
        res.send(200);
    }

    
    function isUserIsAdmin(user) {

        // check in the roles array call before each crud operation performed by Admin


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

        // need to add the condition to check if the user is admin or not!!


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

        var userFromRequest = req.body;
        var userId = req.params.id;

        // need to add the condition to check if the user is admin or not!!


        userModel.updateUserById(userId, userFromRequest)
            .then(function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');
                    } else {

                        res.status(200).send('Updated');
                    }
                }
            );
    }


    // delete by ID

    function deleteUserById(req, res) {

        var userId = req.params.id;

        if(isManager(req.user)) {

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




    // to check if user is admin first this will be used for each admin realted crud opeation

    function isAdmin(user) {

        if(user.roles.indexOf("admin") > 0) {

            return true;
        }

        return false;
    }

    // to check if user is MANAGER first this will be used for each MANAGER realted crud opeation

    function isManager(user) {

        if(user.roles.indexOf("manager") > 0) {

            return true;
        }

        return false;
    }

    // END

}