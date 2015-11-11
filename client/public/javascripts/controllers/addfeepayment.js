
angular.module('sbpuc').controller('addFeePaymentCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.feePayment = {};
    console.log('id :' + $routeParams.id)
    $scope.studentid = $routeParams.id;
    var id = $routeParams.id;
    // Create a new student
    $scope.addFeePayment = function () {
        $http.post('/addfeepayment/' + id, $scope.feePayment)
                .success(function (data) {
                    $scope.formData = {};
                    $location.path('/viewstudent/' + id);
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
    };
});