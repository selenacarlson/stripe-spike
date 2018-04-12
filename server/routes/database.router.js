const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// get a list of our 'products' (charities) from OUR SQL db
router.get('/nonprofits', (req, res) => {
    const sqlText = `SELECT * FROM nonprofits`;
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

// Get user information by id from our database
router.get('/user/:id', (req, res) => {
    let userId = req.params.id;
    const sqlText = `SELECT ot.amount_charged, ot.product_id, ot.date, ot.nonprofit_id FROM users JOIN user_onetime_donations as ot
                        ON ot.user_id = users.id;`;
    pool.query(sqlText, [])
    .then(response => {
        res.send(response);
    }).catch(err => {
        console.log('ERROR on SELECT ot.amount_charged, ot.date, ot.nonprofit_id FROM users JOIN user_onetime_donations as ot:', err);
        res.sendStatus(500);
    });
});



module.exports = router;