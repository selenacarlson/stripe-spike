myApp.controller('AdminController', ['$http', function ($http) {
    let self = this;
    
    self.newNonprofit = {};
    
    self.addNonprofit = function(newNonprofit){
        $http({
            method: 'POST',
            url: '/stripe/nonprofit',
            data: newNonprofit
        })
        .then(function(res){
            console.log(res);
            self.newNonprofit = {}; 
        })
        .catch(function(error){
            console.log(error);
        })
    }

}]);


