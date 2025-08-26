import {Hono} from 'hono'
import * as premarketcontrollers from "../controllers/premarketcontrollers.js";

const premarketRoutes = new Hono();

premarketRoutes.get('/tokens',  premarketcontrollers.getTokens);
premarketRoutes.get('/token/:addr',  premarketcontrollers.getTokenInfo);
premarketRoutes.get('/offers/:addr', premarketcontrollers.getOffers);
// premarketRoutes.post('/create_offers', premarketcontrollers.createOffers)


export default premarketRoutes;
