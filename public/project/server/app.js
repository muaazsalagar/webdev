/**
 * Created by muaazsalagar on 2/20/16.
 */
module .exports=function(app,uuid)

{
    // models
    var UserModel=require("./model/user/user.model.js")();
    var FormModel=require("./model/form/form.model.js")();
    var PropertyModel=require("./model/property/property.model.js")();


    // services

    var FieldService = require("./services/field.service.server.js")(app,FormModel,uuid);
    var UserService = require("./services/user.service.server.js")(app,UserModel,uuid);
    var FormService = require("./services/form.service.server.js")(app,FormModel,uuid);
    var PropertyService = require("./services/property.service.server.js")(app,PropertyModel,uuid);



};