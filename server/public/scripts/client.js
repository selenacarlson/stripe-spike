const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        redirectTo: 'home',
    })
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as vm'
    })
    .when('/stripe/register', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as vm'
    })
    .when('/customer-info', {
        templateUrl: 'views/customer.info.html',
        controller: 'CustomerInfoController as vm'
    })
    .when('/subscribe', {
        templateUrl: 'views/subscribe.html',
        controller: 'SubscribeController as vm'
    })
    .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController as vm'
    })
    .otherwise({
        template: '<h1>404</h1>'
    });
}]);




