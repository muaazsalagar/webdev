/**
 * Created by muaazsalagar on 3/13/16.
 */
/**
 * Created by muaazsalagar on 3/13/16.
 */

module.exports=function(app)
{
    var FormModel =require("./../model/form/form.model.js")();

    app.get("/api/assignment/form/:formId/field",getFormFieldsByFormID);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldFromFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromFieldIdAndFormId);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldFromFieldIdAndFormId);

    function getFormFieldsByFormID(req, res)
   {
       var formID=req.param.formId;
       var fieldsForForm=fieldsForForm.fieldsForForm(formID);
       res.json(fieldsForForm);
   }

    function getFieldFromFieldIdAndFormId(req, res)
    {
        var formId=req.param.formId;
        var fieldId=req.param.fieldId;

        FormModel.fieldsForForm(formId,fieldId);
        res.json();
    }



};
