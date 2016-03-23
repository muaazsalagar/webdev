/**
 * Created by muaazsalagar on 3/13/16.
 */
"use strict"

var mock = require("./color.mock.json");

module.exports = function() {
    var api = {

        //Color methods
        createColor: createColor,
        findColorById: findColorById,
        findAllColors: findAllColors,
        updateColorById: updateColorById,
        deleteColorById: deleteColorById,
        findColorByTitle: findColorByTitle,
        findAllColorsByUserId: findAllColorsByUserId,
        findColorsbyColor:findColorsbyColor,

        //Field
        createFieldForColor: createFieldForColor,
        findAllFieldsForColor: findAllFieldsForColor,
        findFieldByFieldIdAndColorId: findFieldByFieldIdAndColorId,
        updateFieldByFieldIdAndColorId: updateFieldByFieldIdAndColorId,
        deleteFieldByFieldIdAndColorId: deleteFieldByFieldIdAndColorId
    };
    return api;

    function createColor(form) {

        mock.push(form);
    }

    function findColorById(formId) {
        for (var i in mock) {

            if(mock[i]._id === formId) {

                return mock[i];
            }
        }
        return null;
    }

    function findAllColors() {

        return mock;
    }

    function updateColorById(formId, form) {

        for (var i in mock) {

            if(mock[i]._id === formId) {

                mock[i].title = form.title;
                break;
            }
        }

        return mock;
    }

    function deleteColorById(formId) {
        for (var i in mock) {

            if (mock[i]._id === formId) {

                mock.splice(i,1);
                break;
            }
        }
        return mock;
    }

    function findColorByTitle(formTitle) {
        for (var i in mock) {

            if (mock[i].title === formTitle) {

                return mock[i];
            }
        }
        return null;
    }

    function findAllColorsByUserId(userId) {
        var forms = [];

        for (var i in mock) {

            if (mock[i].userId === userId) {

                forms.push(mock[i]);
            }
        }

        return forms;
    }

    function createFieldForColor(formId, field) {
        for (var i in mock) {

            if (mock[i]._id === formId) {

                if(!mock[i].fields) {
                    mock[i].fields = [];
                }

                mock[i].fields.push(field);
                break;
            }
        }
    }

    function findAllFieldsForColor (formId) {

        for (var i in mock) {

            if (mock[i]._id === formId) {

                return mock[i].fields;
            }
        }
        return null;
    }

    function findFieldByFieldIdAndColorId(formId, fieldId) {
        for (var i in mock) {

            if (mock[i]._id === formId) {

                for (var j in mock[i].fields) {

                    if (mock[i].fields[j]._id === fieldId) {

                        return mock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateFieldByFieldIdAndColorId(formId, fieldId, field) {

        field._id = fieldId;

        for (var i in mock) {

            if (mock[i]._id === formId) {

                for (var j in mock[i].fields) {

                    if (mock[i].fields[j]._id === fieldId) {

                        mock[i].fields[j] = field;
                    }
                }
            }
        }
    }
    function deleteFieldByFieldIdAndColorId(formId, fieldId) {

        for (var i in mock) {

            if (mock[i]._id === formId) {

                for (var j in mock[i].fields) {

                    if (mock[i].fields[j]._id === fieldId) {

                        mock[i].fields.splice(j,1);
                    }
                }
            }
        }
    }


    function findColorsbyColor(color) {
        var colors = [];

        for (var i in mock) {

            if (mock[i].color ===color) {

                colors.push(mock[i]);
            }
        }

        return colors;
    }


}