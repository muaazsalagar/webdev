/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {

    var addressSchema = mongoose.Schema({

        addressLine1: String,
        addressLine2:String,
        city: String,
        state: String,
        zipcode: String,
        lat: String,
        lon: String

    }, {collection: 'project.address'});

    // returning Schema
    return addressSchema;


}
