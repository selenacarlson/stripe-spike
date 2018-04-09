myApp.controller('SubscribeController', ['$http', function($http){
    const self = this;
    self.products = {list: []};
    
    // Get a a list of 'products' (charities).
    // Each product should have a list of 'plans'
    self.getProducts = function () {
        $http.get('/stripe/products')
            .then(response => {
                console.log(response.data.data);
                // self.products.list = response.data.data;
                // console.log('plans', self.products.list);
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

    self.getProducts();

}]); 