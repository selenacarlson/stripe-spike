myApp.controller('SubscribeController', ['$http', 'UserService', function($http, UserService){
    const self = this;
    self.charities = {list: []};

    // Hard coded for stripe spike. dynamically filled with info from DB 
    // upon successful login with facebook
  
    
    // Get a a list of 'products' (charities).
    // Each product should have a list of 'plans'
    self.getNonprofits = function () {
        $http.get('/database/nonprofits')
            .then(response => {
                self.charities.list = response.data;
                console.log(self.charities.list);
            }).catch(err => {
                console.log(err);
            });
    }

    self.subscribeToThisPlan = function (charity, planId) {
        console.log(planId);
        // console.log(UserService.user.customerId);
        let data = { planId: planId, customerId: UserService.user.customer_id };
        $http.post('/stripe/subscribe_to_plan', data)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });

    }

    self.getNonprofits();

    self.oneTimeDonation = { customer: UserService.user.customer_id }

    self.oneTimeDonate = function(charity) {
        self.oneTimeDonation.product = charity;
        $http({
            method: 'POST',
            url: '/stripe/oneTimeDonate',
            data: self.oneTimeDonation
        })
        .then(response => {
            console.log(response);
            self.oneTimeDonation = { customer: self.user.customer_id }
        }).catch(err => {
            console.log(err);
        })
    }
}]); 