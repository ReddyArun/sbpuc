var routerApp = angular.module('nodeTodo', ['ngRoute']);
routerApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/templates/studentdetails.html',
                controller: 'studentDetailController'
            })
            .when('/addstudent', {
                templateUrl: '/templates/addstudent.html',
                controller: 'addStudentController'
            })
});
routerApp.controller('studentDetailController', function ($scope, $http) {
    $scope.studentData = {};

    // Get all todos
    $http.get('/studentDetails')
            .success(function (data) {
                $scope.studentData = data;
                console.log(data);
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
});

routerApp.controller('addStudentController', function ($scope, $http, $location) {

    $scope.formData = {};
    // Create a new student
    $scope.createTodo = function (todoID) {
        $http.post('/insert', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    console.log(data);
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




