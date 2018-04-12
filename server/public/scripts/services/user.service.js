myApp.service('UserService', ['$http', function($http){
    const self = this;
    self.user = {
        name: 'Jacob',
        customer_id: 'cus_Cem5IQRcexcTZ6',
        stripeCustomerInfo: {
            invoicesByOrg: [], // for subscriptions
            chargesByOrg: [], // for one-time charges
        },
        whatWeHaveInOurDatabase: {},
    }

    self.getUserInfoFromOurDatabase = function () {
        $http.get('/database/user/cus_Cem5IQRcexcTZ6')
        .then(response => {
            self.user.whatWeHaveInOurDatabase = response.data.rows;
            // console.log('SELF.USER OBJECT:', self.user);
            
        }).catch(err => {
            console.log(err);            
        });
    }

    // find a stripe.customer by id
    self.getStripeCustomerInfo = function () {
        $http.get(`/stripe/customer/${self.user.customer_id}`)
        .then(response => {
            self.stripeCustomerInfo = response.data;
            // console.log('CUSTOMER:', self.stripeCustomerInfo);
        }).catch(err => {
            console.log(err);  
        });
    }

    // get a list of all stripe charges
    self.getAllCharges = function () {
        $http.get('/stripe/charges/cus_Cem5IQRcexcTZ6')
            .then(response => {
                // console.log('CHARGES:',response.data.data);
                // filterChargesByUser(response.data.data);
                self.user.stripeCustomerInfo.chargesByOrg = response.data;
                console.log('self.user AFTER getAllCharges:', self.user);
            }).catch(err => {
                console.log(err);
            });
    }

    // get a list of all invoices filtered by product and the given customerId
    self.getAllInvoices = function () {
        $http.get('/stripe/invoices/cus_Cem5IQRcexcTZ6')
        .then(response => {
            // console.log(response.data);
            self.user.stripeCustomerInfo.invoicesByOrg = response.data[0];
            console.log('self.user AFTER getAllInvoices:', self.user);
        }).catch(err => {
            console.log(err);  
        });
    }

    // Init
    // self.getStripeCustomerInfo();
    self.getAllCharges();
    self.getAllInvoices();

    self.getUserInfoFromOurDatabase();

}]);