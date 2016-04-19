/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(app, bookingModel, uuid) {

    // for passport intercepters
    var auth = authorized;

    //Registers a new booking embedded in the body of the request, and responds with an array of all bookings
    app.post("/api/assignment/register",  register);

    //creates a new booking embedded in the body of the request, and responds with an array of all bookings
    app.post("/api/assignment/booking",createBooking);

    //Return logged in booking
    app.get("/api/assignment/booking/loggedin", loggedIn);

    //Logout
    app.post("/api/assignment/booking/logout", logout);

    //responds with all bookings
    app.get("/api/assignment/booking",auth ,findAllbookings);

    //updates an existing booking whose id property is equal to the id path parameter.
    // The new properties are set to the values in the booking object embedded in the HTTP request.
    // Responds with an array of all bookings
    app.put("/api/assignment/booking/:id",auth ,updateBookingById);


    //responds with a single booking whose id property is equal to the id path parameter
    app.get("/api/assignment/booking/:id", findBookingById);


    //responds with a single booking whose id property is equal to the id path parameter
    app.get("/api/assignment/bookingByOwnerId/:id", findBookingByOwnerId);


    //removes an existing booking whose id property is equal to the id path parameter. Responds with an array of all bookings

    app.delete("/api/assignment/booking/:id", auth, deleteBookingById);

    // for passport implementation

   // app.post  ('/api/assignment/login', passport.authenticate('local'), login);




    function login(req, res) {

        var booking = req.booking;
        res.json(booking);

    }

    function loggedIn(req, res) {

        res.send(req.isAuthenticated() ? req.booking : null);
    }

    function logout(req, res) {

        req.logOut();
        res.send(200);
    }




    function isBookingIsAdmin(booking) {

        // check in the roles array call before each crud operation performed by Admin


        if(booking.roles.indexOf("admin") > 0) {

            return true;
        }
        return false;
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {
            res.send(401);

        } else {
            next();
        }
    }

    // for register with passport

    function register(req, res){

        console.log("In Register");
        // take info from body
        var bookingInRequest = req.body;

        bookingInRequest.roles = ['student'];

        bookingModel.findBookingByBookingname(bookingInRequest.bookingname)
            .then(

                function (booking) {

                    if(booking) {
                        res.json(null);
                    }
                    else {
                        // booking is new
                        // encrypt booking password with bcrypt set password encrypted
                        bookingInRequest.password = bcrypt.hashSync(bookingInRequest.password);

                        // return with createBooking of BookingModel Request

                        return bookingModel.createBooking(bookingInRequest);
                    }
                }
            )

            .then(

                function (registeredBooking) {

                    if(registeredBooking) {

                        // if booking is registered successfuly from bookingModel

                        req.login(registeredBooking,function (err) {

                            if(err) {

                                // if any error of passport login method

                                res.status(400).send(err);

                            } else {
                                // else booking login of passport success so
                                // return booking in response

                                res.json(registeredBooking);
                            }

                        });
                    }

                },

                function (err) {

                    res.status(400).send(err);

                }
            );

    }



    function createBooking (req, res) {

        var bookingFromRequest = req.body;

        // need to add the condition to check if the booking is admin or not!!

        bookingFromRequest.status = "requested";
        bookingFromRequest.booking_date=new Date();



        // first check if a booking already exists by bookingName

        bookingFromRequest = bookingModel.createBooking(bookingFromRequest)

            .then(

                function (doc) {

                    res.status(200).send("Created");

                },

                function (err) {

                    res.status(400).send(err);

                }
            );

        // if  booking already exits then return all bookings
    }




    function findAllbookings (req, res) {

     // change for all passport


    bookingModel.findAllbookings()
        .then(

            function (doc) {

                res.json(doc);
            },

            function (err) {

                res.status(400).send(err);
            }
        );
        }




    function findBookingByCredentials(req, res) {

        var bookingname = req.query.bookingname;
        var password = req.query.password;

        var credentials = {bookingname: bookingname, password: password};

        var currentBooking = bookingModel.findBookingByCredentials(credentials)

            .then(

                function (doc) {
                    req.session.currentBooking = doc;

                    res.json(doc);

                },

                function (err) {

                    res.status(400).send(err);
                }
            )
    }

    function findBookingById(req, res) {

        var bookingId = req.params.id;

        bookingModel.findBookingById(bookingId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function findBookingByOwnerId(req, res) {

        var ownerId = req.params.id;

        bookingModel.findBookingByOwnerId(ownerId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }


    function findBookingByBookingname(req, res) {

        var bookingname = req.query.bookingname;

        bookingModel.findBookingByBookingname(bookingname)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }



    function updateBookingById(req, res) {

        var bookingFromRequest = req.body;
        var bookingId = req.params.id;

        // need to add the condition to check if the booking is admin or not!!


        bookingModel.updateBookingById(bookingId, bookingFromRequest)
            .then(function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');
                    } else {

                        res.status(200).send('Updated');
                    }
                }
            );
    }


    // delete by ID

    function deleteBookingById(req, res) {

        var bookingId = req.params.id;

            bookingModel.deleteBookingById(bookingId)

                .then(
                    function (doc) {

                        if (doc) {

                            res.status(200).send('Deleted');
                        }
                        else {

                            res.status(400).send(err);
                        }
                    }
                );

    }


    // END
}