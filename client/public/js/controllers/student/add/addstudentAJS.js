
angular.module('sbpuc').controller('addStudentCtrl', function ($scope, $http, $location) {

    $scope.formData = {};
    // Create a new student
    $scope.createStudent = function () {
        $http.post('/api/com/sbect/student/add/addstudent', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    //$location.path('/viewallstudentdetails');
                    if (data !== '' && data !== 'undefined') {
                        $location.path('/viewstudent/' + data);
                    }
                })
                .error(function (error) {
                    console.log('Error while adding the new student: ' + error);
                });
    };
});