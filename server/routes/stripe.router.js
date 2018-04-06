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


// stripe.plans.retrieve('plan_CdD9nqhlg5gy0w', (err, product) => {
//     if (err) {
//         console.log('ERROR on stripe.plans.retrieve', err);

//     } else {
//         console.log('SUCCESS on stripe.plans.retrieve! Product:', product);

//     }
// });


router.get('/get_jenny', (req, res) => {
    stripe.customers.retrieve('cus_CdF4mK0B8JtJtq', (err, customer) => {
            if(err){
                console.log('ERROR on stripe.customers.retrieve', err);
                res.sendStatus(500);
            } else {
                res.send(customer);
            }
        }
    )
})

router.get('/plan', (req, res) => {
    stripe.plans.retrieve('plan_CdD9nqhlg5gy0w', (err, plan) => {
        if(err){
            console.log(err);
            res.sendStatus(500)
        } else {
            res.send(plan);
        }
    });
});

router.post('/subscribe_jenny', (req, res) => {
    console.log('customer id -----------', req.body.jennyRosen.id);
    console.log('plan id ---------------', req.body.plan.id);
    stripe.subscriptions.create({
        customer: req.body.jennyRosen.id,
        items: [
            {
                plan: req.body.plan.id,
            }
        ]
    }, (err, subscription) => {
        if(err){
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send('SUBSCRIPTION ***********', subscription);
        }
    })
})



router.post('/make_customer', (req, res) => {
    let email = req.body.email;
    // console.log('EMAIL +++ + + ++ ++', email);
    stripe.customers.create(
        {
            email: email,
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






// IN NEW BRANCH


module.exports = router;