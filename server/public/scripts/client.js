const myApp = angular.module('myApp', ['ngRoute']);
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
    .when('/subscribe', {
        templateUrl: 'views/subscribe.html',
        controller: 'SubscribeController as vm'
    })
    .otherwise({
        template: '<h1>404</h1>'
    });
}]);




