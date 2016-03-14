/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $rootScope) {

        var forms=[];

        forms=[
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];


        var api = {
            // declaration of methods by following standards of john papas
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById

        };

        return api;

        function createFormForUser(userId, formTitle, callback){
            var newForm;
            newForm= {
                "_id": (new Date().getTime()),
                "title":formTitle,
                "userId": userId
            };

            forms.push(newForm);
            callback(newForm);

        }

        function findAllFormsForUser(userId, callback)
        {
            var formsForUser=[];

            for(var i=0;i<forms.length;i++)
            {
                if(forms[i].userId==userId)
                {
                    formsForUser.push(forms[i]);
                }
            }

            callback(formsForUser);

        }

        function deleteFormById(formId, callback)
        {
            for(var i=0;i<forms.length;i++)
            {
                if(forms[i]._id==formId)
                {
                    forms.splice(i,1);
                }
            }

            callback(forms);

        }

        function updateFormById(formId, newForm, callback)
        {
            for(var i=0;i<forms.length;i++)
            {
                if(forms[i]._id==formId)
                {
                    forms[i].id=newForm.id;
                    forms[i].title=newForm.title;
                    forms[i].userId=newForm.userId;
                    break;


                }
            }

            callback(newForm);
        }


    }
})();