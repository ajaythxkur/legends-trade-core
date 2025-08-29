import {Hono} from 'hono'
import * as dashboardControllers from "../controllers/dashboardControllers.js";

const dashRoutes = new Hono();

dashRoutes.get('/user_offer_tokens/:userAddr', dashboardControllers.getUserOfferTokens);
dashRoutes.get('/token_offers/:userAddr/:tokenAddr', dashboardControllers.getUserOffers);

dashRoutes.get('/userdata/:userAddr', dashboardControllers.getUserData)


dashRoutes.get('/orders/:addr', dashboardControllers.getOrders);

export default dashRoutes;