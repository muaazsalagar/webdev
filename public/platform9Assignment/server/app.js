/**
 * Created by muaazsalagar on 2/20/16.
 */
module .exports=function(app,uuid)

{
    // model
    var ColorModel=require("./model/color/color.model.js")();


    // service
    var ColorService = require("./services/color.service.server.js")(app,ColorModel,uuid);


};