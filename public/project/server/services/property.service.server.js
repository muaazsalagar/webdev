/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(app, propertyModel, uuid) {

    //creates a new property embedded in the body of the request, and responds with an array of all propertys
    app.post("/api/banquet/property", createProperty);


    //responds with an array of all propertys
    app.get("/api/banquet/property", findAllpropertys);


    // responds with  properties in the city whose city is city path parameter
    app.get("/api/banquet/property/city/:city", getPropertiesInCity);


    //responds with a single property whose id property is equal to the id path parameter
    app.get("/api/banquet/property/:id", findPropertyById);

    //updates an existing property whose id property is equal to the id path parameter.
    // The new properties are set to the values in the property object embedded in the HTTP request.
    // Responds with an array of all propertys
    app.put("/api/banquet/property/:id", updatePropertyById);

    //removes an existing property whose id property is equal to the id path parameter. Responds with an array of all propertys
    app.delete("/api/banquet/property/:id", deletePropertyById);


    function createProperty (req, res) {

        var property = req.body;
        property._id = parseInt(uuid.v4());

        propertyModel.createProperty(property)
            .then(
                function(doc)
                {
                    res.json(doc);
                },

                function (err)
                {
                    res.status(400).send(err);
                }
            );


       // res.json(propertyModel.createProperty(property));


    }

    function findAllpropertys (req, res) {

        if(req.query.propertyname && req.query.password) {


            findPropertyByCredentials(req, res);

        }else if (req.query.propertyname) {

            findPropertyByPropertyname(req, res);

        }else {

            res.json(propertyModel.findAllPropertys());
        }
    }

    function findPropertyById(req, res) {

        var propertyId = parseInt(req.params.id);

        //res.json(propertyModel.findPropertyById(propertyId));

        propertyModel.findPropertyById(propertyId)

            .then(

                function (doc) {
                    console.log("The findPropertyById");
                    res.json(doc);
                },

                function (err) {
                    console.log("The ERROR in findPropertyById server");
                    console.log(err);
                    res.status(400).send(err);
                }
            );



    }

    function findPropertyByPropertyname(req, res) {

        var propertyname = req.query.propertyname;

        //res.json(propertyModel.findPropertyByPropertyname(propertyname));

        propertyModel.findPropertyByPropertyname(propertyname)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }

    function findPropertyByCredentials(req, res) {

        var propertyname = req.query.propertyname;
        var password = req.query.password;
        var credentials = {propertyname: propertyname, password: password};
        var currentProperty = propertyModel.findPropertyByCredentials(credentials);

        //res.json(currentProperty);

        propertyModel.findUserById(userId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }

    function updatePropertyById(req, res) {

        var propertyId = parseInt(req.params.id);

        var property = req.body;

        //propertyModel.updatePropertyById(propertyId, property);

        propertyModel.updatePropertyById(propertyId,property)

            .then(

                function (doc) {

                    res.send(200);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

       // res.send(200);
    }

    function deletePropertyById(req, res) {

        var propertyId = parseInt(req.params.id);

        //propertyModel.deletePropertyById(propertyId);

       // res.send(200);

        propertyModel.deletePropertyById(propertyId)

            .then(

                function (doc) {

                    res.send(200);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }

    function getPropertiesInCity(req, res) {

        var city = (req.params.city);
        console.log("City at server side is ");
        console.log(city);

        //res.json(propertyModel.getPropertiesInCity(city));

        propertyModel.getPropertiesInCity(city)
            .then(
                function(doc)
                {
                    res.json(doc);
                },

                function (err)
                {
                    res.status(400).send(err);
                }
            );


    }

}
