/**
 * Created by muaazsalagar on 3/13/16.
 */


"use strict"

module.exports = function(app, colorModel, uuid) {

    //creates a new color whose properties are the same as the color object embedded in the HTTP request's body and
    //the color belongs to a user whose id is equal to the userId path parameter.
    //The color object's id is initially null since it is a new record.
    // The id of the new color should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/assignment/color", createColor);

    //returns an array of colors belonging to a user whose id is equal to the userId path parameter
    app.get("/api/assignment/allcolors", findAllcolors);

    //returns an array of colors belonging to a user whose id is equal to the userId path parameter
    app.get("/api/assignment/color/:color", findColorsByColor);

    //returns a color object whose id is equal to the colorId path parameter
    app.get("/api/assignment/color/:colorId", findColorById);

    //returns an array of colors belonging based on groups
    app.get("/api/assignment/sortedcolors", findColorsGrouped);



    //updates a color object whose id is equal to the colorId path parameter so that its properties are the same as
    //the property values of the color object embedded in the request's body
    app.put("/api/assignment/color/:colorId", updateColorById);

    //removes a color object whose id is equal to the colorId path parameter
    app.delete("/api/assignment/color/:colorId", deleteColorById);





    function createColor (req, res) {

        var color = req.body;

        color._id = parseInt(uuid.v4(), 16);

        var allcolors=colorModel.createColor(color);

        // later call for grouped data;


        res.json(allcolors);

    }

    function findAllcolors(req, res) {

        res.json(colorModel.findAllcolors());
    }



    function findColorById(req, res) {

        var colorId = parseInt(req.params.colorId);

        res.json(colorModel.findColorById(colorId));
    }

    function updateColorById(req, res) {

        var colorId = parseInt(req.params.colorId);
        var color = req.body;

        colorModel.updateColorById(colorId, color);

        res.send(200);
    }

    function deleteColorById(req, res) {

        var colorId = parseInt(req.params.colorId);

        colorModel.deleteColorById(colorId);

        res.send(200);
    }


    function findColorsByColor(req, res) {
        var color = (req.params.color);

        var result=colorModel.findColorsbyColor(color);


        res.json(result);
    }


    function findColorsGrouped(req, res) {

        var result=colorModel.findColorsGrouped();


        res.json(result);
    }


}
