myApp.service('UserService', ['$http', function($http){
    const self = this;
    self.user = {
        name: 'bridget',
        customer_id: 'cus_CdOkF8XXIdetXF',
    }
    self.stripeCustomerInfo = {};

    // find a stripe.customer by id
    self.getStripeCustomerInfo = function () {
        $http.get(`/stripe/customer/${self.user.customer_id}`)
        .then(response => {
            self.stripeCustomerInfo = response.data;
            console.log('CUSTOMER:', self.stripeCustomerInfo);
            
        }).catch(err => {
            console.log(err);  
        });
    }

    // Get all transactions on Whyatt's account
    self.getTransactions = function () {
        $http.get('/stripe/all-transactions')
        .then(response => {
            console.log('ALL TRANSACTIONS:', response);
            
        }).catch(err => {
            console.log(err);            
        });
    }

    // find a stripe.charge by id
    self.getChargeById = function () {
        $http.get('/stripe/that-charge')
            .then(response => {
                console.log('CHARGE:',response);

            }).catch(err => {
                console.log(err);
            });
    }

    // find a card by id
    // self.getCardById = function () {
    //     $http.get('/stripe/that-card')
    //     .then(response => {
    //         console.log('CARD:', response);
            
    //     }).catch(err => {
    //         console.log(err);
            
    //     });
    // }

    // Init
    self.getStripeCustomerInfo();
    self.getTransactions();
    self.getChargeById();
    // self.getCardById();
}]);