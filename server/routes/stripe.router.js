const express = require('express');
const router = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const pool = require('../modules/pool');



// Send new customer email and source (encripted card token) 
// information to stripe. Then save some important bits from 
// the response––a customer object––in our database
router.post('/register', function (req, res) {
    console.log('req.body ----- - -- ----- ', req.body);
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


// get a list of our 'products' (charities) from OUR SQL db
router.get('/products', (req, res) => {
    const sqlText = `SELECT * FROM products`;
    pool.query(sqlText)
    .then(response => {
        res.send(response.rows);
    }).catch(err => {
        console.log(err);        
    });
});


// Get a list of customers from OUR db
router.get('/customers', (req, res) => {
    const sqlText = `SELECT * FROM users;`;
    pool.query(sqlText, [])
    .then(response => {
        res.send(response);
    }).catch(err => {
        res.sendStatus(500);
    });
});



// Create subscription
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

let nonprofit = {};

router.post('/nonprofit', (req, res) => {
    nonprofit = req.body
    stripe.products.create({
        name: nonprofit.name,
        type: 'service',
    }, (err, product) => {
        if(err){
            console.log(err);
            res.sendStatus(500);  
        } else {
            nonprofit.product_id = product.id
            createPlans(nonprofit.product_id);
        } 
    });
})

function createPlans(id){
    stripe.plans.create({
        product: id,
        currency: 'usd',
        interval: 'month',
        nickname: '$5/month',
        amount: 500,
    }, (err, plan) => {
        if(err){
            console.log(err); 
        } else {
            nonprofit.five_plan_id = plan.id
        } 
    });

    stripe.plans.create({
        product: id,
        currency: 'usd',
        interval: 'month',
        nickname: '$10/month',
        amount: 1000,
    }, (err, plan) => {
        if(err){
            console.log(err);
        } else {
            nonprofit.ten_plan_id = plan.id
        } 
    });

    stripe.plans.create({
        product: id,
        currency: 'usd',
        interval: 'month',
        nickname: '$20/month',
        amount: 2000,
    }, (err, plan) => {
        if(err){
            console.log(err); 
        } else {
            nonprofit.twenty_plan_id = plan.id
        } 
    });
} //end createPlans


// Create charge
router.post('/create', function (req, res) {
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



// IN NEW BRANCH


module.exports = router;