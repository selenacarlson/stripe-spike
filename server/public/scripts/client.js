const myApp = angular.module('myApp', []);

myApp.controller('StripeController', ['$http', function($http){
    let self = this;
    // self.customers = {list: []};
    self.customer = {
        id: "cus_CdGZDwcnaytTAf"
    }
    self.plans = {list: []};
 
    self.getPlans = function(){
        $http.get('/stripe/plans')
        .then(response => {
            self.plans.list = response.data.data;
            console.log(self.plans);
        }).catch(err => {
            console.log(err);
        });
    }

    self.subscribeToThisPlan = function (planId) {
        console.log(planId);
        console.log(self.customer.id);
        let data = {planId: planId, customerId: self.customer.id};
        $http.post('/stripe/subscribe_to_plan', data)
        .then(response => {
            console.log(response);            
        }).catch(err => {
            console.log(err);            
        });
        
    }




    self.getPlans();


}]);







