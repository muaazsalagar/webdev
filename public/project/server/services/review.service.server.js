/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

module.exports = function(app, reviewModel, uuid) {

    //creates a new review embedded in the body of the request, and responds with an array of all reviews
    app.post("/api/banquet/reviews/review", createReview);

    //responds with an array of all reviews
    app.get("/api/banquet/reviews/review", findAllreviews);

    //responds with a single review whose id property is equal to the id path parameter
    app.get("/api/banquet/reviews/review/:id", findReviewById);

    //responds with all reviews whose id property is equal to the id path parameter
    app.get("/api/banquet/property/all_reviews/:id", findReviewByPropertyId);

    //responds with all reviews whose id user is equal to the id path parameter
    app.get("/api/banquet/property/reviewsByUser/:id/:propertyId", findReviewByUserId);


    //updates an existing review whose id property is equal to the id path parameter.
    // The new properties are set to the values in the review object embedded in the HTTP request.
    // Responds with an array of all reviews
    app.put("/api/banquet/reviews/review/:id", updateReviewById);

    //removes an existing review whose id property is equal to the id path parameter. Responds with an array of all reviews
    app.delete("/api/banquet/reviews/review/:id", deleteReviewById);

    function createReview (req, res) {

        var review = req.body;

        review._id = parseInt(uuid.v4());


        //res.json(reviewModel.createReview(review));

        reviewModel.createReview(review)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );


    }

    function findAllreviews (req, res) {

        if(req.query.reviewname && req.query.password) {


            findReviewByCredentials(req, res);

        }else if (req.query.reviewname) {

            findReviewByReviewname(req, res);

        }else {

            //res.json(reviewModel.findAllReviews());

            reviewModel.findAllReviews()

                .then(

                    function (doc) {

                        res.json(doc);
                    },

                    function (err) {

                        res.status(400).send(err);
                    }
                );



        }
    }

    function findReviewById(req, res) {

        var reviewId = parseInt(req.params.id);

        //res.json(reviewModel.findReviewById(reviewId));

        reviewModel.findReviewById(reviewId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }

    function findReviewByPropertyId(req, res) {

        console.log("the ")
        var propertyId = parseInt(req.params.id);
        //res.json(reviewModel.findReviewByPropertyId(propertyId));
        console.log("the Property iD is ");
        console.log(propertyId);

        reviewModel.findReviewByPropertyId(propertyId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }


    function findReviewByUserId(req, res) {


        var userId = parseInt(req.params.id);
        var propertyId = parseInt(req.params.propertyId);

        //res.json(reviewModel.findReviewByPropertyId(propertyId));
        console.log("the Property iD is ");
        console.log(propertyId);

        reviewModel.findReviewByUserId(userId,propertyId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }




    function findReviewByReviewname(req, res) {

        var reviewname = req.query.reviewname;

        res.json(reviewModel.findReviewByReviewname(reviewname));
    }

    function findReviewByCredentials(req, res) {

        var reviewname = req.query.reviewname;
        var password = req.query.password;

        var credentials = {reviewname: reviewname, password: password};

        var currentReview = reviewModel.findReviewByCredentials(credentials);


        res.json(currentReview);
    }


    function updateReviewById(req, res) {

        var reviewId = parseInt(req.params.id);

        var review = req.body;

        //reviewModel.updateReviewById(reviewId, review);
        //res.send(200);

        reviewModel.updateReviewById(reviewId, review)

            .then(

                function (doc) {

                    res.send(200);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );

    }

    function deleteReviewById(req, res) {

        var reviewId = parseInt(req.params.id);

       // reviewModel.deleteReviewById(reviewId);

       // res.send(200);

        reviewModel.deleteReviewById(reviewId)

            .then(

                function (doc) {

                    res.send(200);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );



    }
}
