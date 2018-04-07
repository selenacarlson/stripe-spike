myApp.controller('StripeFormController', ['$scope', '$window', function($scope, $window){
    let self = this;

    self.hello = 'HEYYYY'

    self.loadStripeElements = function () {
        console.log('HEY');
        //STEP 1: SET UP STRIPE ELEMENTS
        // include this <script src="https://js.stripe.com/v3/"></script> tag on 
        // all pages of the app for security purposes
        // then, create an instance of stripes pre-built, secure, Elements
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

        var form = document.getElementById('register-form');

        form.addEventListener('submit', function (event) {
            var nameInput = document.getElementById('name')
            var emailInput = document.getElementById('email')

            nameInput.setAttribute('name', 'name');
            nameInput.setAttribute('value', nameInput.value);

            emailInput.setAttribute('name', 'email');
            emailInput.setAttribute('value', emailInput.value);

            form.appendChild(nameInput);
            form.appendChild(emailInput);

            event.preventDefault();
            stripe.createSource(card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the source to your server
                    stripeSourceHandler(result.source);
                }
            });
        });

        function stripeSourceHandler(source) {
            // Insert the source ID into the form so it gets submitted to the server
            var form = document.getElementById('register-form');
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeSource');
            hiddenInput.setAttribute('value', source.id);
            form.appendChild(hiddenInput);

            // Submit the form
            form.submit();
        }

        var elements = stripe.elements({
            fonts: [
                {
                    cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
                },
            ],
            // Stripe's examples are localized to specific languages, but if
            // you wish to have Elements automatically detect your user's locale,
            // use `locale: 'auto'` instead.
            locale: window.__exampleLocale
        });
    }
    
    self.loadStripeElements()

}])
