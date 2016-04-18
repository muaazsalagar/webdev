/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {



    var reviewSchema = mongoose.Schema({

        _id:String,
        user_id: String,
        property_id:String,
        rating: Number,
        date_posted:Date,
        review: String,

    }, {collection: 'project.review'});

    // returning Schema
    return reviewSchema;

};
