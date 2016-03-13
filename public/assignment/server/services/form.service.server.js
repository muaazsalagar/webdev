/**
 * Created by muaazsalagar on 3/13/16.
 */

module.exports=function(app)
{
  var FormModel =require("./../model/form/form.model.js")();

    //creates a new form embedded in the body of the request, and responds with an array of all forms
    app.post("/api/assignment/user/:userId/form", createForm);

    //responds with an array of all forms
    app.get("/api/assignment/user/:userId/form",findAllFormsForUser);

    //responds with a single form whose id property is equal to the id path parameter
    app.get("/api/assignment/form/:formId",findFormByID );


    //responds with a single form whose formname property is equal to the formname path parameter
    app.get("/api/assignment/form?formname=formname",findFormByFormname);

    //updates an existing form whose id property is equal to the id path parameter.
    // The new properties are set to the values in the form object embedded in the HTTP request. Responds with an array of all forms
    app.put("/api/assignment/form/:formId",updateFormByID);


    //removes an existing form whose id property is equal to the id path parameter. Responds with an array of all forms

    app.delete("/api/assignment/form/:id",deleteFormByID);


    function createForm(req, res)
    {
        var form= req.body;
        var userId=req.param.userId;

        var formID=uuid.v4();
        form._id=formID;
        form.userId=userId;
        FormModel.createForm(form);
        var formsForUser=FormModel.findFormForUser(userId);
        res.json(formsForUser);
    }


    function findAllFormsForUser(req, res)
    {
        // returns
        res.json(FormModel.findFormForUser(req.param.userId));
    }


    function findFormByID(req, res)
    {
        var formId=req.param.formId;
        var searchedForm=FormModel.findFormByID(formId);
        res.json(searchedForm);
    }


    function updateFormByID(req, res)
    {
        var formID=req.param.formId;
        var form=req.param.form;
        var updatedForm=FormModel.updateFormByID(formID,form);

        res.json(updatedForm);
    }


    function deleteFormByID(req, res)
    {
        var formId=req.param.formID;

        var afterDeleteList=FormModel.deleteFormByID(formId);
        res.json(afterDeleteList);
    }

};