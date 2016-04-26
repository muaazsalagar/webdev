/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {

    var projectuserSchema = mongoose.Schema({

        username: String,
        password: String,
        token:String,
        firstName: String,
        lastName: String,
        emails: [String],
        fbemail:String,
        phones: [String],
        roles: [String],
        usertype:{type: String, default:"project"}

    }, {collection: 'project.user'});

    // returning Schema
    return projectuserSchema;


}
