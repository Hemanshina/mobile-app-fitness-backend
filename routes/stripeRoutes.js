const express = require('express')
const router = express.Router()
const userPaymentAccountController = require('../controllers/userPaymentAccountController')

router
    .post('/create-deposit-session', userPaymentAccountController.createStipeDepositeSession)
    .get('/all/:clientId', userPaymentAccountController.getAllTransactions)
    .post('/webhook', userPaymentAccountController.stripeWebhook)


module.exports = router