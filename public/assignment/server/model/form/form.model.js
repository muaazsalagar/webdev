/**
 * Created by muaazsalagar on 3/13/16.
 */

/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"

var mock =require("./form.mock.json");
module.exports= function () {

    var api={

        createForm:createForm,
        findAllForms:findAllForms,
        findFormByID:findFormByID,
        updateFormByID:updateFormByID,
        deleteFormByID:deleteFormByID,
        findFormByTitle:findFormByTitle



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


