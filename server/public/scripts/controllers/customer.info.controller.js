myApp.controller('CustomerInfoController', ['$http', 'UserService', function($http, UserService){
    const self = this;
    self.userService = UserService;
    self.user = UserService.user;

    self.stripeCustomerInfo = UserService.stripeCustomerInfo;
    self.getStripeCustomerInfo = UserService.getStripeCustomerInfo;

    var stripe = Stripe('pk_test_am5RbEIakojCTGAR6pNGMvfO');
    var elements = stripe.elements({
        fonts: [
            {
                cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
            },
        ],
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        locale: 'auto'
    });

    // STEP 2: continued from payment form creation on HTML
    // custom styling can be passed to to options when creating an Element
    var style = {
        base: {
            // Add your base input styles here
            fontSize: '16px',
            color: '#32325d',
        }
    };

    // create an instance of the card Element
    var card = elements.create('card', {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#c4f0ff',
                color: '#fff',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',

                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: '#87BBFD',
                },
            },
            invalid: {
                iconColor: '#FFC7EE',
                color: '#FFC7EE',
            },
        },
    });

    card.mount('#example1-card');

    
    self.editingEmail = false;
    self.editingCard = false;

    self.updateCard = function(customer_id){
        let customer = { id: customer_id }
        stripe.createSource(card).then(function (result) {
            if (result.error) {
                console.log('error creating source', result.error);
            } else {
                customer.source = result.source.id;
                $http({
                    method: 'POST',
                    url: '/stripe/updateCard',
                    data: customer
                }).then(response => {
                    console.log(response);
                    self.getStripeCustomerInfo();
                    self.editingCard = false;
                    card.clear();
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    }

    self.updatedEmail;
    self.updateEmail = function(customer_id){
        let customer = { id: customer_id, email: self.updatedEmail }
        console.log(customer);
        $http({
            method: 'POST',
            url: '/stripe/updateEmail',
            data: customer
        }).then(response => {
            console.log(response);
            self.getStripeCustomerInfo();
            self.editingEmail = false;
        }).catch(err => {
            console.log(err);
        })
    }

}]);