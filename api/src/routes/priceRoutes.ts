import { Hono } from 'hono'
import * as priceController from "../controllers/priceController.js"

const priceRoutes = new Hono();

priceRoutes.get('/get/:symbol', priceController.getTokenPrice);

export default priceRoutes;
