import { Hono } from 'hono'
import * as premarketcontrollers from "../controllers/premarketcontrollers.js";

const premarketRoutes = new Hono();

premarketRoutes.get('/tokens', premarketcontrollers.getTokens);
premarketRoutes.get('/token/:addr', premarketcontrollers.getTokenInfo);
premarketRoutes.get('/offers/:addr', premarketcontrollers.getOffers);
// premarketRoutes.get('/offers', premarketcontrollers.getOffers);
premarketRoutes.get('/cc_tokens', premarketcontrollers.getCrossChainTokens)

premarketRoutes.patch('/token', premarketcontrollers.updateTokenData);
premarketRoutes.patch('/update_cc', premarketcontrollers.updateCrossChainAddress)

export default premarketRoutes;
