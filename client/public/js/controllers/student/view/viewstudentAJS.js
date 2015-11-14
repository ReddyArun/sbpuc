angular.module('sbpuc').controller('viewStudentCtrl', function ($scope, $http, $routeParams, $window) {
    $scope.viewStudentData = {};
    $scope.viewFeeData = {};
    $scope.viewBalanceData = {};
    // Get all todos
    $http.get('/api/com/sbect/student/view/studentdetails/' + $routeParams.id)
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

    $scope.print = function (id, feeid) {
        var left = screen.width / 2 - 200, top = screen.height / 2 - 250
        $window.open('print?id='+id+'&feeid='+feeid, '', "top=" + top + ",left=" + left + ",width=400,height=500")
    };
});