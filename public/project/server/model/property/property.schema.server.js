/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {

    var addressSchema = require("./address.schema.server.js")(mongoose);
    var propertySchema = mongoose.Schema({

        _id:Number,
        owner: String,
        owner_id:Number,
        title: String,
        desc: String,
        address: addressSchema,
        eventsAvailable: [String],
        facilities: [String],
        capacity: Number,
        cost: Number

    }, {collection: 'project.property'});

    // returning Schema
    return propertySchema;


};
