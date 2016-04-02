/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(app, formModel) {

    //creates a new form whose properties are the same as the form object embedded in the HTTP request's body and
    //the form belongs to a user whose id is equal to the userId path parameter.
    //The form object's id is initially null since it is a new record.
    // The id of the new form should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/assignment/user/:userId/form", createForm);

    //returns an array of forms belonging to a user whose id is equal to the userId path parameter
    app.get("/api/assignment/user/:userId/form", findAllformsForUser);

    //returns a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId", findFormById);

    //updates a form object whose id is equal to the formId path parameter so that its properties are the same as
    //the property values of the form object embedded in the request's body
    app.put("/api/assignment/form/:formId", updateFormById);

    //removes a form object whose id is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm (req, res) {

        var form = req.body;
        var userId = req.params.userId;

        form.userId = userId;

        form = formModel.createForm(form)

            .then(

                function (doc) {

                    res.status(200).send("Created");

                },

                function (err) {

                    res.status(400).send(err);

                }
            );
    }

    function findAllformsForUser(req, res) {

        var userId = req.params.userId;

        formModel.findAllFormsByUserId(userId)

            .then(

                function (docs) {

                    res.json(docs);

                },

                function (err) {

                    res.status(400).send(err);

                }
            );

    }

    function findAllForms(req, res) {

        formModel.findAllForms()

            .then(

                function (docs) {

                    res.json(docs);

                },

                function (err) {

                    res.status(400).send(err);

                }
            );
    }

    function findFormById(req, res) {

        var formId = req.params.formId;

        formModel.findFormById(formId)

            .then(

                function (doc) {

                    res.json(doc);

                },

                function (err) {

                    res.status(400).send(err);

                }
            );
    }

    function updateFormById(req, res) {

        var formId = req.params.formId;
        var form = req.body;

        formModel.updateFormById(formId, form)

            .then(

                function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');
                    } else {

                        res.status(200).send('Updated');
                    }
                }
            )
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;

        formModel.deleteFormById(formId)

            .then(

                function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');

                    } else {

                        res.status(200).send('Deleted');
                    }
                }
            );
    }
}