import express from 'express';
import { getWeatherData, showWeatherPage } from '../Controllers/weatherController.js';

const router = express.Router();

router.get("/",showWeatherPage);

router.post("/",getWeatherData);


export const weatherRoutes = router;