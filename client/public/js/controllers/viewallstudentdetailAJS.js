angular.module('sbpuc').controller('viewAllStudentDetailCtrl', function ($scope, $http, $location) {
    $scope.studentData = {};
    $scope.go = function (id) {
        $location.path('/viewstudent/' + id);
    };

    // Get all todos
    $http.get('/api/com/sbect/student/view/studentdetails')
            .success(function (data) {
                $scope.studentData = data;
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
});