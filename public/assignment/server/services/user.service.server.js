/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(app, userModel, uuid) {

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user", createUser);

    //Return logged in user
    app.get("/api/assignment/user/loggedin", loggedIn);

    //Logout
    app.post("/api/assignment/user/logout", logout);

    //responds with all users
    app.get("/api/assignment/user", findAllusers);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/assignment/user/:id", updateUserById);

    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users
    app.delete("/api/assignment/user/:id", deleteUserById);


    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);


    function loggedIn(req, res) {

        if(!req.session.currentUser) {
            req.session.currentUser = null;
        }
        res.json(req.session.currentUser);
    }

    function logout(req, res) {

        req.session.destroy();
        res.send(200);
    }


    function createUser (req, res) {

        var user = req.body;

        user = userModel.createUser(user)

            .then(

                function (doc) {

                    req.session.currentUser = doc;
                    res.json(user);

                },

                function (err) {

                    res.status(400).send(err);

                });
    }

    function findAllusers (req, res) {

        if(req.query.username && req.query.password) {

            findUserByCredentials(req, res);

        }else if (req.query.username) {

            findUserByUsername(req, res);

        }else {

            res.json(userModel.findAllUsers());
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

        userModel.deleteUserById(userId)

            .then(

                function (err) {

                    if(err) {

                        res.status(400).send(err);
                    }
                    else {
                        res.status(200).send('Deleted');
                    }
                }
            );
    }
}