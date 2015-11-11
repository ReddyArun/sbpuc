
angular.module('sbpuc').controller('addStudentCtrl', function ($scope, $http, $location) {

    $scope.formData = {};
    // Create a new student
    $scope.createTodo = function (todoID) {
        $http.post('/addstudent', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    $location.path = '/';
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
    };

//    // Delete a todo
//    $scope.deleteTodo = function (todoID) {
//        $http.delete('/delete/' + todoID)
//                .success(function (data) {
//                    $scope.todoData = data;
//                    console.log(data);
//                })
//                .error(function (data) {
//                    console.log('Error: ' + data);
//                });
//    };

});