const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

 ///////////////////////////////////////////////////////////////////////////////////////
///// These functions generate an array of objects. Each one contains          ////////
///// a 'productId' with stripes prod_id AND an 'charges' array of the         ////////
///// stripe.charge objects whose metadata.product_id matches the 'productId'  ////////
//////////////////////////////////////////////////////////////////////////////////////
function getDataForUserReportOnOnetimeDonations (charges, userId, res) {
    filterChargesByUser(charges, userId, res);
}

function filterChargesByUser (charges, userId, res) {
    const userCharges = charges.filter(charge => charge.customer == userId);
    filterUserChargesByOrganizationDonatedTo (userCharges);
}

function getUniqueProductIdsFromUserCharges (userCharges, res) {
    let productIds = [];
    for(let charge of userCharges){
        if(!charge.metadata.product_id){
            continue;
        } else {
            productIds.push(charge.metadata.product_id);
        }
    }
    let uniqueProductIds = [...new Set(productIds)];
    getChargeObjectsForEachProduct(uniqueProductIds, userCharges);
}

function organizeChargesByProductChargedFor (uniqueProductIds, userCharges) {
    let chargesByProduct = [];
    uniqueProductIds.forEach( (uniqueId, i) => {
        let product = { productId: uniqueId, charges: [] };
        userCharges.forEach(charge => {
            if (charge.metadata.product_id == uniqueId) {
                product.charges.push(charge);
            }
        });
        return i == uniqueProductIds.length - 1 ? chargesByProduct: null;
    });  
}

