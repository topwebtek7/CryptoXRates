import * as express from 'express'
const router = express.Router()

const CryptoXRates = require('./cryptoXRatesClass')

const newCryptoXRates = new CryptoXRates()

router.get('/cryptoData', (req, res) => {
    newCryptoXRates.rateList()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(JSON.parse(err)))
})

module.exports = router
