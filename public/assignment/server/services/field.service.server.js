/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function (app, fieldModel) {

    //creates a new field whose properties are the same as the field object embedded in the request's body and
    // the field belongs to a form whose id is equal to the formId path parameter.
    // The field object's id is initially null since it is a new record.
    // The id of the new form field should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/assignment/form/:formId/field", createFormField);

    //returns an array of fields belonging to a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);

    //returns a field object whose id is equal to the fieldId path parameter
    //and belonging to a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);

    //updates a field object whose id is equal to the fieldId path parameter and
    // belonging to a form object whose id is equal to the formId path parameter
    // so that its properties are the same as the property values of the field object embedded in the request's body
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

    //removes a field object whose id is equal to the fieldId path parameter and
    // belonging to a form object whose id is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    // update feature fields

    app.put("/api/assignment/form/:formId/field", updateFields);





    function createFormField (req, res) {

        var field = req.body;
        var formId = req.params.formId;

        fieldModel.createFieldForForm(formId, field)

            .then(

                function (form) {

                    form.fields.push(field);

                    return form.save();

                },

                function (err) {

                    return null;
                }
            )

            .then(

                function (doc) {

                    if(doc) {

                        res.status(200).send("Created");

                    } else  {

                        res.status(400).send("Error");
                    }

                }
            );
    }

    function findAllFieldsForForm(req, res) {

        var formId = req.params.formId;

        fieldModel.findAllFieldsForForm(formId)

            .then(

                function (fields) {

                    res.json(fields);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.findFieldByFieldIdAndFormId(formId, fieldId)

            .then(

                function (field) {

                    res.json(field);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        console.log(field);

        fieldModel.updateFieldByFieldIdAndFormId(formId, fieldId, field)

            .then(

                function (doc) {

                    if(doc) {

                        res.status(200).send("Updated");

                    } else  {

                        res.status(400).send("Error");
                    }

                }
            );
    }

    // upadate fields


    function updateFields(req, res) {

        var formId = req.params.formId;

        var startIndex = req.query.startIndex;

        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {

            fieldModel.sortFields(formId, startIndex, endIndex)

                .then(
                    function (status) {

                        res.json(200);

                    },

                    function (err) {

                        res.json(400);
                    }
                )
        }

    }



    function deleteFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteFieldByFieldIdAndFormId(formId, fieldId)

            .then(

                function (doc) {

                    if(doc) {

                        res.status(200).send("Deleted");

                    } else  {

                        res.status(400).send("Error");
                    }

                }
            );
    }

}

