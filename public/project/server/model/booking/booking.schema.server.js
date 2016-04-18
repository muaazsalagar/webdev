/**
 * Created by muaazsalagar on 3/29/16.
 */

"use strict"

module.exports = function (mongoose) {

    var bookingSchema = mongoose.Schema({
        user_id: String,
        start_date: Date,
        end_date: Date,
        booking_date:Date,
        property_id:String,
        owner_id:String,
        state:String,
        number_guest:Number

    }, {collection: 'project.booking'});

    // returning Schema
    return bookingSchema;


}
