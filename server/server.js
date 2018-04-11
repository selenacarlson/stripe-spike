const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv').config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// Router
const stripeRouter = require('./routes/stripe.router');
const databaseRouter = require('./routes/database.router');
const nonprofitRouter = require('./routes/nonprofit.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// user Router
app.use('/stripe', stripeRouter);
app.use('/database', databaseRouter);
app.use('/nonprofit', nonprofitRouter);

// use static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});




// create a service-type product







// // Charge the user's card:
// stripe.charges.create({
//   amount: 999,
//   currency: "usd",
//   description: "Example charge",
//   source: token,
// }, function(err, charge) {
//   // asynchronously called
// });

// stripe.charges.capture("ch_1A9eP02eZvKYlo2CkibleoVM", function(err, charge) {
//     // asynchronously called
//   });

//   (async function() {
//     // Create a Customer:
//     const customer = await stripe.customers.create({
//       source: 'tok_mastercard',
//       email: 'paying.user@example.com',
//     });
  
//     // Charge the Customer instead of the card:
//     const charge = await stripe.charges.create({
//       amount: 1000,
//       currency: 'usd',
//       customer: 'CUSTOMER',
//     });
  
//     // YOUR CODE: Save the customer ID and other info in a database for later.
  
//   })();
  
//   (async function() {
//     // When it's time to charge the customer again, retrieve the customer ID.
//     const charge = stripe.charges.create({
//       amount: 1500, // $15.00 this time
//       currency: 'usd',
//       customer: 'CUSTOMER', // Previously stored, then retrieved
//     });
//   })();
  