/**
 * Created by muaazsalagar on 3/13/16.
 */

/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

var mock =require("./form.mock.json");
var uuid = require('node-uuid');
module.exports= function () {

    var api={

        // form
        createForm:createForm,
        findAllForms:findAllForms,
        findFormByID:findFormByID,
        updateFormByID:updateFormByID,
        deleteFormByID:deleteFormByID,
        findFormByTitle:findFormByTitle,
        findFormForUser:findFormForUser,

        // forms
        getFormFieldsByFormID:getFormFieldsByFormID,
        getFieldFromFieldIdAndFormId:getFieldFromFieldIdAndFormId,
        updateFieldFromFieldIdAndFieldObject:updateFieldFromFieldIdAndFieldObject,
        deleteFieldFromFieldIdAndFormId:deleteFieldFromFieldIdAndFormId,
        createField:createField




    };
    return api;
};

function createForm(form){

    mock.push(form);

    return mock;

}


function findAllForms(){
    return mock;


}

function  findFormByID(formID)
{
    formID=parseInt(formID);

    for(var i in mock)
    {
        if (mock[i]._id==formID)
        {

            return mock[i];
        }
    }
    return null;

}

function  updateFormByID(formID, form){

    formID= parseInt(formID);
    for (var i in mock)
    {
        if(mock[i]._id==formId)
        {
            mock[i]=form;
            return mock;
        }
    }

}


function  deleteFormByID(formID, form){

    formID= parseInt(formID);
    for (var i in mock)
    {
        if(mock[i]._id==formId)
        {
            mock.splice(i,1);
            return mock;
        }
    }

}



function findFormByTitle(formName)
{
    for (var i in mock)
    {
        if(mock[i].formname==formName)
        {
            return mock[i];

        }
    }
    return null;
}


function findFormForUser(userId)
{
    var formsbyUser=[];
    for (var i in mock)
    {
        if(mock[i].userId==userId)
        {
            formsbyUser.push(mock[i]);

        }
    }
    return formsbyUser;
}


function getFormFieldsByFormID (formId)
{
    formId=parseInt(formId);
    var fieldsForForm=[];
    for(var i in mock)
    {
        if(mock[i]._id==formId)
        {
            fieldsForForm=mock[i].fields;
        }

    }
    return fieldsForForm;

}


function getFieldFromFieldIdAndFormId(formId, fieldId)
{
    for (var i in mock)
    {
       if(mock[i]._id==formId) {

           var fields=mock[i].fields;
           for (var j in fields) {
               if (fields[j]._id==fieldId) {

                   return fields[j];
               }
           }
       }
    }

    return null;

}



function deleteFieldFromFieldIdAndFormId(formId, fieldId)
{
    for (var i in mock)
    {
        if(mock[i]._id==formId) {

            var fields=mock[i].fields;
            for (var j in fields) {
                if (fields[j]._id==fieldId) {

                    // assign to mock or splice usage for fields directly;
                    fields.splice(j,1);
                    mock[i].fields=fields;
                    return;

                }
            }
        }
    }

    return null;

}

function updateFieldFromFieldIdAndFieldObject(formId, fieldId, field)
{
    for (var i in mock)
    {
        if(mock[i]._id===formId) {

            var fields=mock[i].fields;
            for (var j in fields) {
                if (fields[j]._id===fieldId) {

                    // assign to mock or splice usage for fields directly;
                    fields[j]=field;
                    mock[i].fields=fields;
                    return;

                }
            }
        }
    }
    return null;
}

function createField(formId, formField)
{
    for(var i in mock)
    {
        if (mock[i]._id===formId)
        {
            mock[i].fields.push(formField);
            break;
        }
    }
}