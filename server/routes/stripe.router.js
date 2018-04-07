const express = require('express');
const router = express();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post('/register', function (req, res) {

    let source = req.body.stripeSource;
    let email = req.body.email;
    let name = req.body.name;

    stripe.customers.create(
        {email: email, source: source}, 
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