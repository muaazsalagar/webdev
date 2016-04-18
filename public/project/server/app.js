/**
 * Created by muaazsalagar on 2/20/16.
 */

                                // PROJECT

module .exports=function(app, db, mongoose, uuid)

{
    // models
    var UserModel=require("./model/user/user.model.js")(db, mongoose);
    var FormModel=require("./model/form/form.model.js")(db, mongoose);
    var PropertyModel=require("./model/property/property.model.js")(db,mongoose);
    var ReviewModel=require("./model/review/review.model.js")(db,mongoose);
    var BookingModel=require("./model/booking/booking.model.js")(db,mongoose);



    // services

    var FieldService = require("./services/field.service.server.js")(app,FormModel,uuid);
    var UserService = require("./services/user.service.server.js")(app,UserModel,uuid);
    var FormService = require("./services/form.service.server.js")(app,FormModel,uuid);
    var PropertyService = require("./services/property.service.server.js")(app,PropertyModel,uuid);
    var ReviewService = require("./services/review.service.server.js")(app,ReviewModel,uuid);
    var BookingService = require("./services/booking.service.server.js")(app,BookingModel,uuid);



};