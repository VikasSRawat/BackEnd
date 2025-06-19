import express from 'express';
import { getWeatherPage } from '../Controllers/weatherController.js';

const router = express.Router();


router.get("/",getWeatherPage);


export const weatherRoutes = router;