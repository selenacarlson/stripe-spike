myApp.controller('HomeController', ['$http', function ($http) {
    let self = this;
    // self.customers = {list: []};
    self.customer = {
        id: "cus_CdGZDwcnaytTAf"
    }


    



    self.customers = {list: []};

    self.plans = { list: [] };

    self.getPlans = function () {
        $http.get('/stripe/plans')
            .then(response => {
                self.plans.list = response.data.data;
                console.log('plans', self.plans.list);
            }).catch(err => {
                console.log(err);
            });
    }

    self.subscribeToThisPlan = function (planId) {
        console.log(planId);
        console.log(self.customer.id);
        let data = { planId: planId, customerId: self.customer.id };
        $http.post('/stripe/subscribe_to_plan', data)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });

    }

    self.getCustomers = function () {
        $http.get('/stripe/customers')
        .then(response => {
            self.customers.list = response.data.rows;
            console.log('customers', self.customers.list);
            
        }).catch(err => {
            console.log(err);
        });
    }

    self.getCustomers();
    self.getPlans();

}]);


