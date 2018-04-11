const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// //list all invoices
// router.get('/all-invoices', (req, res) => {
//     stripe.invoices.list((err, invoices) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(500)
//         } else {
//             res.send(invoices)
//         }
//     });
// });

// // find a stripe.charge by id
// router.get('/all-charges', (req, res) => {
//     // const thatCharge = 'ch_1CDl88FewByiHSs3cyMAUBxP';
//     stripe.charges.list((err, charges) => {
//         if (err) {
//             console.log(err);
//             res.sendStatus(500)
//         } else {
//             res.send(charges)
//         }
//     });
// });