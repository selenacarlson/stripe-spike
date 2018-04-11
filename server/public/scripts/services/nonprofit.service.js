myApp.service('NonprofitService', ['$http', function($http){
    const self = this;

    self.getAggregateNonprofitData = function () {
        $http.get('/nonprofit/aggregate-nonprofit-donations')
        .then(response => {
            console.log(response);

        }).catch(err => {
            console.log(err);
        });
    }

    
    // Init
    self.getAggregateNonprofitData();


}]);
