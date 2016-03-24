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
        findAllcolors: findAllcolors,
        updateColorById: updateColorById,
        deleteColorById: deleteColorById,
        findColorByTitle: findColorByTitle,
        findAllColorsByUserId: findAllColorsByUserId,
        findColorsbyColor:findColorsbyColor,


    };
    return api;

    function createColor(newColor) {

        mock.push(newColor);
        return mock;
    }

    function findColorById(formId) {
        for (var i in mock) {

            if(mock[i]._id === formId) {

                return mock[i];
            }
        }
        return null;
    }

    function findAllcolors() {

        return mock;
    }

    function updateColorById(colorId, color) {

        for (var i in mock) {

            if(mock[i]._id === colorId) {

                mock[i] = color.color;
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