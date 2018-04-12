myApp.service('UserService', ['$http', function($http){
    const self = this;
    self.user = {
        name: 'Jacob',
        customer_id: 'cus_Cem5IQRcexcTZ6',
        stripeCustomerInfo: {
            allInvoices: [], // for subscriptions
            chargesByOrg: [], // for one-time charges
        },
        whatWeHaveInOurDatabase: {},
    }

    self.getUserInfoFromOurDatabase = function () {
        $http.get('/database/user/cus_Cem5IQRcexcTZ6')
        .then(response => {
            self.user.whatWeHaveInOurDatabase = response.data.rows;
            console.log('SELF.USER OBJECT:', self.user);
            
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
        $http.get('/stripe/all-charges')
            .then(response => {
                // console.log('CHARGES:',response.data.data);
                filterChargesByUser(response.data.data)
            }).catch(err => {
                console.log(err);
            });
    }

    function filterChargesByUser (charges) {
        const usersCharges = charges.filter(item => {
            // console.log(item.customer);
            // console.log(self.user.customer_id);
            return item.customer == self.user.customer_id;
        });          
        filterUserChargeIdsByOrg (usersCharges);
    }

    function filterUserChargeIdsByOrg (userCharges) {
        let prodIds = [];
        for(let charge of userCharges){
            if (!charge.metadata.product_id) {
                continue;
            } else {
                prodIds.push(charge.metadata.product_id);
            }
        }
        let uniqueProdIds = [...new Set(prodIds)];        
        getChargeObjectsForEachOrg (uniqueProdIds, userCharges);
    }

    function getChargeObjectsForEachOrg (uniqueIdsArr, userChargesArr) {
        let chargesByOrg = [];
        for(let uniqueId of uniqueIdsArr){
            let orgsCharges = {uniqueId: uniqueId, charges: []};
            for(let charge of userChargesArr){
                if(charge.metadata.product_id == uniqueId){
                    orgsCharges.charges.push(charge);
                }
            }
            chargesByOrg.push(orgsCharges);
        }
        // console.log('CHARGES BY ORGANIZATION:', chargesByOrg); 
        self.user.stripeCustomerInfo.chargesByOrg = chargesByOrg;
    }

    // get a list of all invoices
    self.getAllInvoices = function () {
        $http.get('/stripe/all-invoices')
        .then(response => {
            // console.log('ALL INVOICES RESPONSE.DATA:',response.data);
            filterInvoicesByUser(response.data.data)
        }).catch(err => {
            console.log(err);  
        });
    }

    function filterInvoicesByUser (invoices) {
        const userInvoices = invoices.filter(item => item.customer == self.user.customer_id);
        // console.log('USER INVOICES:', userInvoices);
        self.user.stripeCustomerInfo.allInvoices = userInvoices;
        // console.log('USER SERVICE USER OBJECT:', self.user);
    }

    // Init
    // self.getStripeCustomerInfo();
    // self.getAllCharges();
    // self.getAllInvoices();

    self.getUserInfoFromOurDatabase();

}]);