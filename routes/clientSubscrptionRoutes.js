const express = require('express')
const router = express.Router()
const clientSubscriptionController = require('../controllers/clientSubscriptionController')


router
    .post('/', clientSubscriptionController.createClientSubscription)
    .patch('/edit', clientSubscriptionController.editClientSubscription)
    .get('/', clientSubscriptionController.getClientsBySubscriptions)

module.exports = router;