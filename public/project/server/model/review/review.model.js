/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

var mock =require("./review.mock.json");
module.exports= function () {

    var api={

        createReview:createReview,
        findAllReviews:findAllReviews,
        findReviewById:findReviewById,
        updateReviewById:updateReviewById,
        deleteReviewByID:deleteReviewByID,
        findReviewByReviewname:findReviewByReviewname,
        findReviewByCredentials:findReviewByCredentials,
        findReviewByPropertyId:findReviewByPropertyId

    };
    return api;
};

function createReview(review){

    mock.push(review);
   // console.log("after creation, reviews are:")
    console.log(mock);

    return mock;

}


function findAllReviews(){
    return mock;


}

function  findReviewById(reviewID)
{
    reviewID=parseInt(reviewID);

    for(var i in mock)
    {
        if (mock[i]._id==reviewID)
        {
            console.log("Match Found");
            return mock[i];
        }
    }
    return null;

}

function  findReviewByPropertyId(propertyID)
{
    propertyID=parseInt(propertyID);
    var reviewsForProperty=[];
    for(var i in mock)
    {
        if (mock[i].property_id==propertyID)
        {
            console.log("Match for review");
            reviewsForProperty.push(mock[i]);

        }
    }
    return reviewsForProperty;

}


function  deleteReviewByID(reviewID){

    reviewID= parseInt(reviewID);
    for (var i in mock)
    {
        if(mock[i]._id==reviewId)
        {
            mock.splice(i,1);

            return mock;
        }
    }

}


function  updateReviewById(reviewId, review){

     reviewId= parseInt(reviewId);
    for (var i in mock)
    {
        if(mock[i]._id==reviewId)
        {

            mock[i]=review;
            return mock;
        }
    }

}



function findReviewByReviewname(reviewName)
{
    for (var i in mock)
    {
        if(mock[i].reviewname==reviewName)
        {
            return mock[i];

        }
    }
    return null;
}



function findReviewByCredentials(credentials)
{
    for (var i in mock)
    {
        if(mock[i].reviewname==credentials.reviewname &&
            mock[i].password==credentials.password)
        {
            return mock[i];

        }
    }
    return null;
}
