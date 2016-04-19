/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(db, mongoose) {

    var bookingSchema = require("./booking.schema.server.js")(mongoose);

    var bookingModel = mongoose.model('Booking', bookingSchema);

    var api = {
        createBooking: createBooking,
        findBookingById: findBookingById,
        // new added feature for admin


        findAllBookings: findAllBookings,
        updateBookingById: updateBookingById,
        deleteBookingById: deleteBookingById,
        findBookingByBookingname: findBookingByBookingname,
        findBookingByOwnerId: findBookingByOwnerId,
        findBookingByCredentials: findBookingByCredentials
    };
    return api;

    function createBooking(booking) {

        return bookingModel.create(booking);
    }

    function findBookingById(bookingId) {

        return bookingModel.findById(bookingId);
    }

    // for admin
    function findAllBookings() {
        return bookingModel.find({});
    }


    function findBookingByCredentials(credentials) {

        return bookingModel.findOne({bookingname: credentials.bookingname, password: credentials.password});
    }

    function updateBookingById(bookingId, booking) {

        return bookingModel.findByIdAndUpdate(bookingId, booking);
    }

    function deleteBookingById(bookingId) {

        return bookingModel.findByIdAndRemove(bookingId);
    }

    function findBookingByBookingname(bookingName) {

        return bookingModel.findOne({bookingname: bookingName});
    }


    function findBookingByOwnerId(ownerId) {

        //return bookingModel.find({owner_id:ownerId});
        return bookingModel.find({});
    }





};