
angular.module('sbpuc').controller('loginCtrl', function ($scope, $http, $location, SessionService) {
    $scope.loginData = {};
    $scope.loginData.username = 'arun';
    $scope.loginData.password = 'arun';
    if (SessionService.getAuthenticatedUser()) {
        $location.path('/viewallstudentdetails');
    }
// Login Staff
    $scope.loginUser = function () {
        $http.post('/api/com/sbect/auth/login', $scope.loginData)
                .success(function (data) {
                    SessionService.setAuthenticatedUser(JSON.stringify(data));
                    $scope.loginData = {};
                    $location.path('/viewallstudentdetails');
                })
                .error(function (error) {
                    $scope.errorMsg = "Invalid UserName and Password!...";
                    console.log('Error: ' + error);
                    $location.path('/');
                });
    };
});