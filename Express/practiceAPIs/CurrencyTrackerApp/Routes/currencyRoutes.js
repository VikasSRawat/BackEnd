import express from 'express';
import { showcurrencyPage,convertCurrency } from '../Controllers/currencyController.js';

const router = express.Router();

router.get("/",showcurrencyPage)
router.post("/convert",convertCurrency);

export const currencyRoutes = router;