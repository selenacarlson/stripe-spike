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

// stripe.products.retrieve('prod_Cd1As14yEXc5yf', (err, product) => {
//     if(err){
//         console.log('ERROR on stripe.products.retrieve', err);
        
//     } else {
//         console.log('SUCCESS on stripe.products.retrieve! Product:', product);

//     }
// })


stripe.plans.retrieve('plan_CdD9nqhlg5gy0w', (err, product) => {
    if (err) {
        console.log('ERROR on stripe.plans.retrieve', err);

    } else {
        console.log('SUCCESS on stripe.plans.retrieve! Product:', product);

    }
})

// const product = stripe.products.create({
//     name: 'Cogiv',
//     type: 'service',
// }, function (err, product) {

// });

// IN NEW BRANCH


module.exports = router;