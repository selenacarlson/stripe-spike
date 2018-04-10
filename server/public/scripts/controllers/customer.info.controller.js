myApp.controller('CustomerInfoController', ['$http', 'UserService', function($http, UserService){
    const self = this;
    self.userService = UserService;
    self.user = UserService.user;

    self.stripeCustomerInfo = UserService.stripeCustomerInfo;


}]);