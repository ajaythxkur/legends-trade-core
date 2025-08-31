import { Hono } from 'hono'
import * as dashboardControllers from "../controllers/dashboardControllers.js";

const dashRoutes = new Hono();

dashRoutes.get('/userdata/:userAddr', dashboardControllers.getUserData)

dashRoutes.get('/premarket_tokens/:userAddr', dashboardControllers.getUserPremarketTokens);
dashRoutes.get('/token_offers/:tokenAddr', dashboardControllers.getUserOffers);

dashRoutes.get('/offers/:token_addr', dashboardControllers.getOffers)

dashRoutes.get('/orders/:addr', dashboardControllers.getOrders);

export default dashRoutes;