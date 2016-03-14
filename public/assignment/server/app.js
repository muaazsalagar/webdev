/**
 * Created by muaazsalagar on 2/20/16.
 */

module .exports=function(app)
{
    require("./services/field.service.server.js")(app);
    require("./services/user.service.server.js")(app);
    require("./services/form.service.server.js")(app);

};