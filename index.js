/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    https = require('https'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');
/**
 * Mongoose
 */
mongoose.connect('mongodb://localhost/project_one');
/**
 * Express
 */
var app = express();
/**
 *
 */
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
/**
 * Stripe endpoint
 */
/**
 * Get Stripe Library
 */
var Stripe = require('stripe');
var stripe = Stripe("sk_test_VF8whfxJ7JdWNz4PCR2kdn0b");
app.use(express.bodyParser());
app.post('/stripe', function (req, res) {
    'use strict';
    console.log(req.is('json'));
    var stripeToken = req.body.stripeToken;
    var charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "usd",
        card: stripeToken,
        description: "payinguser@example.com"
    }, function (err, charge) {
        if (err && err.type === 'StripeCardError') {
            // The card has been declined
            console.log("Card declined");
        }
        //Charged the card
        console.log(charge);
    });
});

/**
 * Static resources
 */
app.use(function (req, res, next) {
    'use strict';
    res.setHeader('Expires', 'Fri, 30 Oct 2014 14:19:41 GMT');
    res.setHeader('Last-Modified', 'Fri, 30 Oct 1998 14:19:41 GMT');
    next();
});
var coreAssets = __dirname + '/app';
app.use(express.static(coreAssets));
/**
 * Start Server
 */
app.listen(8080, function () {
    'use strict';
    console.log('Listening on port ' + 8080);
});
