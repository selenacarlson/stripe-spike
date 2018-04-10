myApp.service('UserService', ['$http', function($http){
    const self = this;
    self.user = {
        name: 'bridget',
        customer_id: 'cus_CdOkF8XXIdetXF',
    }
    self.stripeCustomerInfo = {};

    self.getStripeCustomerInfo = function () {
        $http.get(`/stripe/customer/${self.user.customer_id}`)
        .then(response => {
            self.stripeCustomerInfo = response.data;
            console.log(self.stripeCustomerInfo);
            
        }).catch(err => {
            console.log(err);  
        });
    }


    // Init
    self.getStripeCustomerInfo();

}]);