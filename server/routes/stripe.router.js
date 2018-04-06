const express = require('express');
const router = express();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post('/create', function (req, res) {
    console.log(req.body);
    let source = req.body.stripeSource;
    let email = 'test@test.com'
    // console.log('token', stripeSource);
    stripe.customers.create(
        {
            email: email,
            source: source,
        }, 
        (err, customer) => {
            if(err){
                console.log(`ERROR on stripe.customers.create with email: ${email}`, err);
                res.sendStatus(500)
            } else {
                res.send(customer)
            }
        });
});

module.exports = router;