/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {



    var reviewSchema = mongoose.Schema({
        
        user_id: Number,
        property_id:Number,
        rating: Number,
        date_posted:Date,
        review: String,

    }, {collection: 'project.review'});

    // returning Schema
    return reviewSchema;

};
