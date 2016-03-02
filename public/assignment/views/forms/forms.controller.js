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

                $scope.userForms=response;
                $scope.formTitle="";
                console.log("After Adding new form Objects");
                //$location.url("#/forms");
                console.log(response);

            });

        }

        function selectForm(form){

            var indexOfSelected=$scope.userForms.indexOf(form);

            $scope.formTitle=$scope.userForms[indexOfSelected].title;
            $scope.selectedForm=userForms[indexOfSelected];
            console.log($scope.formTitle);

        }



        function addForm(formTitle){

            FormService.createFormForUser(currentUserId,formTitle,function (response){

                $scope.userForms=response;
                $scope.formTitle="";
                console.log("After Adding new form");
                //$location.url("#/forms");
                console.log(response);

            });

        }

        function updateForm(){
            var formSelected=$scope.selectedForm;
            FormService.updateFormById(formSelected._id, function (response) {

            });
        }

        function deleteForm()
        {

        }




    }
}) ();
