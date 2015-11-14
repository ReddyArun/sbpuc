var routerApp = angular.module('sbpuc', ['ngRoute']);
routerApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/templates/auth/loginpage.html',
                controller: 'loginCtrl'
            })
            .when('/viewallstudentdetails', {
                templateUrl: '/templates/student/view/allstudentdetails.html',
                controller: 'viewAllStudentDetailCtrl'
            })
            .when('/addstudent', {
                templateUrl: '/templates/student/add/addstudent.html',
                controller: 'addStudentCtrl'
            })
            .when('/viewstudent/:id', {
                templateUrl: '/templates/student/view/viewstudent.html',
                controller: 'viewStudentCtrl'
            })
            .when('/addfeepayment/:id', {
                templateUrl: '/templates/student/add/addfeepayment.html',
                controller: 'addFeePaymentCtrl'
            });
});
routerApp.service('SessionService', function () {
    var authenticatedUser = null;

    this.setAuthenticatedUser = function (value) {
        authenticatedUser = value;
    };
    this.getAuthenticatedUser = function () {
        return authenticatedUser;
    };
});
routerApp.run(['$rootScope', '$location', 'SessionService', function ($rootScope, $location, SessionService) {
        $rootScope.$on('$locationChangeStart', function (event, next) {
//            if (!SessionService.getAuthenticatedUser()) {
//                console.log("Authentication Error");
//                $location.path('/');
//            }
        });
        $rootScope.$on('show-errors-reset', function () {
            $timeout(function () {
                el.removeClass('has-error');
            }, 0, false);
        });
    }]);