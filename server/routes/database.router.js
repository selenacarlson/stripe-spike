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




module.exports = router;