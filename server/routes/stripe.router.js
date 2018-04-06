const express = require('express');
const router = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post('/charge', function (req, res) {
    let token = req.body.stripeToken;
    console.log('token', token);
    console.log(req.body);
    stripe.charges.create({
        amount: 999,
        currency: "usd",
        description: "Example charge",
        source: token,
    }, function (err, charge) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(charge);
            res.send(charge)
        }
    });
});


router.get('/plans', (req, res) => {
    stripe.plans.list( (err, plans) => {
        if(err){
            console.log(err);
            res.sendStatus(500)
        } else {
            res.send(plans);
        }
    });
});


router.post('/subscribe_to_plan', (req, res) => {
    console.log('customer id -----------', req.body.customerId);
    console.log('plan id ---------------', req.body.planId);
    stripe.subscriptions.create({
        customer: req.body.customerId,
        items: [
            {
                plan: req.body.planId,
            }
        ]
    }, (err, subscription) => {
        if(err){
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(subscription);
        }
    })
})



// IN NEW BRANCH


module.exports = router;