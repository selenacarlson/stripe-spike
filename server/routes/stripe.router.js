const express = require('express');
const router = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const pool = require('../modules/pool');



// Send new customer email and source (encripted card token) 
// information to stripe. Then save some important bits from 
// the response––a customer object––in our database
router.post('/register', function (req, res) {
    let source = req.body.stripeSource;
    let email = req.body.email;
    let name = req.body.name;
    stripe.customers.create(
        { email: email, source: source },
        (err, customer) => {
            if (err) {
                console.log(`ERROR on stripe.customers.create with email: ${email}`, err);
                res.sendStatus(500)
            } else {
                console.log('customer ++++ + ++ ++', customer);
                const sqlText = `INSERT INTO users (name, email, created, customer_id)
                VALUES ($1, $2, $3, $4);`;
                pool.query(sqlText, [name, customer.email, new Date(customer.created * 1000), customer.id])
                .then(response => {
                    res.sendStatus(201);
                }).catch(err => {
                    console.log('ERROR on INSERT INTO users', err);
                    
                    res.sendStatus(500);
                })
                // res.send(customer)
            }
        });
});




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

router.get('/customers', (req, res) => {
    const sqlText = `SELECT * FROM users;`;
    pool.query(sqlText, [])
    .then(response => {
        res.send(response);
    }).catch(err => {
        res.sendStatus(500);
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