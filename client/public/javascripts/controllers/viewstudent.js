angular.module('sbpuc').controller('viewStudentCtrl', function ($scope, $http, $routeParams) {
    $scope.viewStudentData = {};
    $scope.viewFeeData = {};
    $scope.viewBalanceData = {};
    // Get all todos
    $http.get('/studentDetails/' + $routeParams.id)
            .success(function (data) {
                $scope.viewStudentData = data[0];
                if (data.length > 1) {
                    $scope.viewFeeData = data.slice(1, (data.length - 1));
                    $scope.viewBalanceData = data[data.length - 1];
                }
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
});