
angular.module('sbpuc').controller('addFeePaymentCtrl', function ($scope, $http, $routeParams, $location, $route, $window, $timeout) {

    $scope.feePayment = {};
    console.log('id :' + $routeParams.id)
    //var id = $routeParams.id;
    // Create a new student
    $scope.addFeePayment = function (id) {
        $('#myModal').modal('hide');
        $http.post('/api/com/sbect/student/add/addfeepayment/' + id, $scope.feePayment)
                .success(function (data) {
                    $scope.feePayment = {};
                    $timeout(function () {
                        $scope.callReLoadingData(id, data);
                    }, 1000);
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
    };
    $scope.callReLoadingData = function (id, data) {
        $location.path($location.path());
        $route.reload();
        $timeout(function () {
            $scope.callOpenprintDialogData(id, data);
        }, 1000);
    };
    $scope.callOpenprintDialogData = function (id, data) {
        $location.path($location.path());
        $route.reload();
        var left = screen.width / 2 - 200, top = screen.height / 2 - 250
        $window.open('print?id=' + id + '&feeid=' + data, '', "top=" + top + ",left=" + left + ",width=800,height=500");
    };
});