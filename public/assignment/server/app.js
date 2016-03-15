/**
 * Created by muaazsalagar on 2/20/16.
 */
module .exports=function(app,uuid)

{
    var UserModel=require("./model/user/user.model.js")();
    var FormModel=require("./model/form/form.model.js")();

    require("./services/field.service.server.js")(app,uuid);
    require("./services/user.service.server.js")(app,UserModel,uuid);
    require("./services/form.service.server.js")(app,FormModel,uuid);

};