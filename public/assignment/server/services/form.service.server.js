/**
 * Created by muaazsalagar on 3/13/16.
 */


"use strict"

module.exports = function(app, formModel, uuid) {

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
        var userId = parseInt(req.params.userId);

        form.userId = userId;
        form._id = parseInt(uuid.v4(), 16);

        formModel.createForm(form);
        res.json(formModel.findAllFormsByUserId(userId));
    }

    function findAllformsForUser(req, res) {

        var userId = parseInt(req.params.userId);

        res.json(formModel.findAllFormsByUserId(userId));
    }

    function findAllForms(req, res) {

        res.json(formModel.findAllForms());
    }

    function findFormById(req, res) {

        var formId = parseInt(req.params.formId);

        res.json(formModel.findFormById(formId));
    }

    function updateFormById(req, res) {

        var formId = parseInt(req.params.formId);
        var form = req.body;

        formModel.updateFormById(formId, form);

        res.send(200);
    }

    function deleteFormById(req, res) {

        var formId = parseInt(req.params.formId);

        formModel.deleteFormById(formId);

        res.send(200);
    }
}
