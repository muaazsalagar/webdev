/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {

    var projectuserSchema = mongoose.Schema({

        _id:Number,
        usertype:String,
        username: String,
        password: String,
        token:String,
        firstName: String,
        lastName: String,
        emails: [String],
        fbemail:String,
        phones: [String],
        roles: [String]

    }, {collection: 'project.user'});

    // returning Schema
    return projectuserSchema;


}
