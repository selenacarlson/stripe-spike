const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
