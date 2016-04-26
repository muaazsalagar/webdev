/**
 * Created by muaazsalagar on 2/20/16.
 */
module.exports = function(app, db, mongoose, uuid,userModel, securityService) {

    //var userModel = require("./models/user/user.model.js")(db, mongoose);
    var formModel = require("./models/form/form.model.js")(db, mongoose);
    var fieldModel = require("./models/form/field.model")(db, mongoose, formModel);

    var userService = require("./services/user.service.server.js")(app, userModel,securityService);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}
