const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Here, we need to get all transactions for each product (nonprofit)
// and aggregate them. Then, we need to package the results in an object
// to send client side.

router.get('/aggregate-nonprofit-donations', (req, res) => {
    stripe.balance.listTransactions(
        {limit: 100},
        (err, transactions) => {
            if(err){
                console.log(err);
                res.sendStatus(500);
            } else {
                getSourceForEachTransaction(transactions.data, res)
            }
        }
    )
});

function getSourceForEachTransaction (transactions, res) {
    let sources = [];
    for(let i = 0; i < transactions.length; i++){
        let transaction = transactions[i];
        if(transaction.source.startsWith('ch')){
            stripe.charges.retrieve(transaction.source, (err, charge) => {
                if(err){
                    console.log('ERROR on stripe.charges.retrieve',err);
                    res.sendStatus(500);
                } else {
                    sources.push({transactionId: transaction.id, charge: charge});
                    if(i == transactions.length - 1){
                        getProductIdForEachCharge(sources, res)
                    }
                }
            });
        } 
    }
}

function getProductIdForEachCharge (sources, res) {
    let sourcesWithProductIds = [];
    for(let i = 0; i < sources.length; i++){
        let source = sources[i];
        // console.log('----- source', source);
        
        if(source.charge.metadata.product_id){
            source = {...source, productId: source.charge.metadata.product_id}
            // console.log(source);
            
            sourcesWithProductIds.push(source);
        } else if (source.charge.invoice) {
            stripe.invoices.retrieve(source.charge.invoice, (err, invoice) => {
                if (err) {
                    console.log(err);
                } else {
                    source = {...source, productId: invoice.lines.data[0].product}
                    sourcesWithProductIds.push(source);
                    
                }
            });
        }
    }
    console.log(sourcesWithProductIds);
    
}

function getProdIdThruInvoice (invoiceId) {
    stripe.invoices.retrieve(invoiceId, (err, invoice) => {
        if(err){
            console.log(err);            
        } else {
            return invoice.lines.data[0].product
        }
    });
}


module.exports = router;

