const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
const axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});


let token; // Using Express

app.post('/stripe', function(req, res){
    token = req.body.stripeToken 
})

// Charge the user's card:
stripe.charges.create({
  amount: 999,
  currency: "usd",
  description: "Example charge",
  source: token,
}, function(err, charge) {
  // asynchronously called
});