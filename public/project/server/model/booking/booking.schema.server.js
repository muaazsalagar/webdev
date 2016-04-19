/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {

    var bookingSchema = mongoose.Schema({
        user_id: Number,
        start_date: Date,
        end_date: Date,
        booking_date:Date,
        property_id:Number,
        owner_id:Number,
        state:String,
        number_guest:Number

    }, {collection: 'project.booking'});

    // returning Schema
    return bookingSchema;


}
