/**
 * Created by muaazsalagar on 3/13/16.
 */
"use strict";

module.exports = function(db, mongoose) {

    var formSchema = require("./form.schema.server")(mongoose);

    var formModel = mongoose.model("Form", formSchema);

    var api = {

        //Form
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        findAllFormsByUserId: findAllFormsByUserId,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        getMongooseModel: getMongooseModel
    };

    return api;

    function updateFormById(formId, form) {

        return formModel.findByIdAndUpdate(formId, form);
    }

    function deleteFormById(formId) {

        return formModel.findByIdAndRemove(formId);
    }

    function findFormByTitle(formTitle) {

        return formModel.findOne({title: formTitle});
    }

    function getMongooseModel() {

        return formModel;
    }

    function createForm(form) {

        return formModel.create(form);
    }

    function findFormById(formId) {

        return formModel.findOne(formId);
    }

    function findAllForms() {

        return formModel.find({ });
    }

    function findAllFormsByUserId(userId) {

        return formModel.find({userId: userId});
    }


    function createFieldForForm(formId, field) {

        formModel.findOne(formId)

            .then(

                function (form) {

                    form.fields.push(field);

                    return form.save();

                },

                function (err) {

                    return null;
                }
            );
    }

    function findAllFieldsForForm (formId) {

        formModel.findOne(formId)

            .then(

                function (form) {

                    return form.fields;

                },

                function (err) {

                    return null;

                }
            );
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {

        formModel.findOne(formId)

            .then(

                function (form) {

                    var fields = form.fields;

                    for(var i in fields) {

                        if( fields[i]._id === fieldId)
                            return fields[i];
                    }
                    return null;

                },

                function (err) {

                    return null;

                }
            );

    }


    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        formModel.findOne(formId)

            .then(

                function (form) {

                    var fields = form.fields;

                    for(var i in fields) {

                        if( fields[i]._id === fieldId) {

                            form.fields[i] = field;
                            break;
                        }
                    }

                    return form.save();

                },

                function (err) {

                    return null;

                }
            );

    }
    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        formModel.findOne(formId)

            .then(

                function (form) {

                    var fields = form.fields;

                    for(var i in fields) {

                        if( fields[i]._id === fieldId) {

                            form.fields[i].remove();
                            break;
                        }
                    }

                    return form.save();

                },

                function (err) {

                    return null;

                }
            );
    }

}