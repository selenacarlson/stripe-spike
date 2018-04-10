myApp.controller('SubscribeController', ['$http', function($http){
    const self = this;
    self.charities = {list: []};

    // Hard coded for stripe spike. dynamically filled with info from DB 
    // upon successful login with facebook
    self.user = {
        // hard coded customer ID,
        customerId: "cus_CeJqFtnnFjy6vd",
    };
    
    // Get a a list of 'products' (charities).
    // Each product should have a list of 'plans'
    self.getNonprofits = function () {
        $http.get('/stripe/nonprofits')
            .then(response => {
                self.charities.list = response.data;
                console.log(self.charities.list);
            }).catch(err => {
                console.log(err);
            });
    }

    self.subscribeToThisPlan = function (planId) {
        console.log(planId);
        console.log(self.user.customerId);
        let data = { planId: planId, customerId: self.user.customerId };
        $http.post('/stripe/subscribe_to_plan', data)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });

    }

    self.getNonprofits();

    self.oneTimeDonation = { customer: self.user.customerId }

    self.oneTimeDonate = function(charity) {
        self.oneTimeDonation.product = charity;
        $http({
            method: 'POST',
            url: '/stripe/oneTimeDonate',
            data: self.oneTimeDonation
        })
        .then(response => {
            console.log(response);
            self.oneTimeDonation = { customer: self.user.customerId }
        }).catch(err => {
            console.log(err);
        })
    }
}]); 