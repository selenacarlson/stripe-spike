window.onload = function () {

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
    card.addEventListener('change', function (e) {
        var displayError = document.getElementById('card-errors');
        if (e.error) {
            displayError.textContent = e.error.message
        } else {
            displayError.textContent = '';
        }
    });

    // STEP 3: CREATE A TOKEN TO SECURLY TRANSMIT CARD INFORMATION
    // create a token or display an error when the form is submitted
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // inform the customer that there was an error
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // send the token to your server
                console.log(result.token);
                stripeTokenHandler(result.token);
            }
        });
    });

    // STEP 4: SUBMIT THE TOKEN AND THE REST OF YOUR FORM TO YOUR SERVER
    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
        // submit the form
        form.submit();
    }

}