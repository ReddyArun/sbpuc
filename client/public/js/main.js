var routerApp = angular.module('sbpuc', ['ngRoute']);
routerApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/templates/auth/loginpage.html',
                controller: 'loginCtrl',
                data: {
                    requireLogin: false,
                    adminPrev: false
                }
            })
            .when('/viewallstudentdetails', {
                templateUrl: '/templates/student/view/allstudentdetails.html',
                controller: 'viewAllStudentDetailCtrl',
                data: {
                    requireLogin: true,
                    adminPrev: false
                }
            })
            .when('/addstudent', {
                templateUrl: '/templates/student/add/addstudent.html',
                controller: 'addStudentCtrl',
                data: {
                    requireLogin: true,
                    adminPrev: true
                }
            })
            .when('/viewstudent/:id', {
                templateUrl: '/templates/student/view/viewstudent.html',
                controller: 'viewStudentCtrl',
                data: {
                    requireLogin: true,
                    adminPrev: true
                }
            })
            .when('/addfeepayment/:id', {
                templateUrl: '/templates/student/add/addfeepayment.html',
                controller: 'addFeePaymentCtrl',
                data: {
                    requireLogin: true,
                    adminPrev: true
                }
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
        $rootScope.$on('$routeChangeStart', function (event, next) {
//            if (next.data.requireLogin) {
//                if (!SessionService.getAuthenticatedUser()) {
//                    console.log("Authentication Error");
//                    $location.path('/');
//                }
//                if (next.data.adminPrev) {
//                    var admin = JSON.parse(SessionService.getAuthenticatedUser()).admin;
//                    console.log(admin)
//                    if (!admin) {
//                        event.preventDefault();
//                    }
//                }
//            }
        });
    }]);