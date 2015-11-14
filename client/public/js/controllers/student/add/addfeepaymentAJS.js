
angular.module('sbpuc').controller('addFeePaymentCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.feePayment = {};
    console.log('id :' + $routeParams.id)
    $scope.studentid = $routeParams.id;
    var id = $routeParams.id;
    // Create a new student
    $scope.addFeePayment = function () {
        $http.post('/api/com/sbect/student/add/addfeepayment/' + id, $scope.feePayment)
                .success(function (data) {
                    $scope.formData = {};
                    $location.path('/viewstudent/' + data);
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
    };
});