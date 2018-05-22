import * as express from 'express'
import { Request, Response, NextFunction } from "express"
const router = express.Router()

import CryptoXRates from './cryptoXRatesClass'

router.get('/cryptoData', (req: Request, res: Response) => {
    CryptoXRates.rateList()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(JSON.parse(err)))
})

router.get('/', function(req: Request, res: Response, next: NextFunction) {
    res.send('Express RESTful API');
});

export default router
