console.log('hi');

window.onload = function() {

    //STEP 1: SET UP STRIPE ELEMENTS
    // include this <script src="https://js.stripe.com/v3/"></script> tag on 
    // all pages of the app for security purposes
    // then, create an instance of stripes pre-built, secure, Elements
    var stripe = Stripe('pk_test_am5RbEIakojCTGAR6pNGMvfO');
    var elements = stripe.elements();

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
    var card = elements.create('card', { style: style });

    // add the instance of the card Element to the #card-element div
    card.mount('#card-element')

    // add a "change" event listener to the card Element to help with 
    // error handling and customer usibility
    card.addEventListener('change', function(e){
        var displayError = document.getElementById('card-errors');
        if(e.error){
            displayError.textContent = e.error.message
        } else {
            displayError.textContent = '';
        }
    });

    var form = document.getElementById('payment-form');
    var ownerInfo = {
        owner: {
            name: 'Jenny Rosen',
            address: {
            line1: 'Nollendorfstraße 27',
            city: 'Berlin',
            postal_code: '10777',
            country: 'DE',
            },
            email: 'jenny.rosen@example.com'
        },
    };

    form.addEventListener('submit', function(event) {
    event.preventDefault();

        stripe.createSource(card, ownerInfo).then(function(result) {
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
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeSource');
        hiddenInput.setAttribute('value', source.id);
        form.appendChild(hiddenInput);
      
        // Submit the form
        form.submit();
      }

    // var makeCustomerBtn = document.getElementById('make-customer');
    // makeCustomerBtn.addEventListener('click', function(){
    //     var email = document.getElementById('customer-email').value;
    //     axios.post('/stripe/make_customer', {email: email})
    //     .then(response => {
    //         console.log(response);
            
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // });


}

