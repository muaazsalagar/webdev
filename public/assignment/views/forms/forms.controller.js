/**
 * Created by muaazsalagar on 2/20/16.
 */
/**
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location,$scope, FormService, $rootScope, UserService){

        $scope.$location=$location;
        $scope.addForm=addForm;
        $scope.selectForm=selectForm;
        $scope.updateForm=updateForm;
        $scope.deleteForm=deleteForm;

        console.log("IN Forms Controller");
        var currentUser=UserService.getCurrentUser();
        var currentUserId=currentUser._id;

        FormService.findAllFormsForUser(currentUser._id, function(response)
        {
            console.log("values from the DB for userforms")
            console.log(response);
            $scope.userForms=response;
        });


        function addForm(formTitle){

            FormService.createFormForUser(currentUserId,formTitle,function (response){


                console.log("After Adding new form Objects");
                //$location.url("#/forms");
                console.log(response);
                $scope.userForms.push(response);
                $scope.form={};

            });

        }

        function selectForm(form){

            var indexOfSelected=$scope.userForms.indexOf(form);
            var selectedForm=$scope.userForms[indexOfSelected];

           // $scope.form.title=$scope.userForms[indexOfSelected].title;

            $scope.form;
            $scope.form=
            {"_id": selectedForm._id,
                "title": selectedForm.title,
                "userId": selectedForm.userId
            };

            console.log($scope.form);

        }




        function updateForm(){
            var formSelected=$scope.form;
            FormService.updateFormById(formSelected._id,formSelected, function (response) {

                console.log("Updated Form is");
                console.log(response);
                $scope.userForms[response._id]=response;
                $scope.form={};

            });
        }

        function deleteForm(form)
        {
            var formSelected=form;
            FormService.deleteFormById(formSelected._id, function (response) {

                console.log("Deletion");

                $scope.userForms=response;
                var currentUser=UserService.getCurrentUser();

                FormService.findAllFormsForUser(currentUser._id, function(response)
                {

                    console.log(response);
                    $scope.userForms=response;
                });

                $scope.form={};
            });
        }




    }
}) ();
