import * as express from 'express';
import { getPricePolicies, getPricePolicy, getPricePolicyByCode, getPricePoliciesByCodesController, postPricePolicy, putPricePolicy, deletePricePolicy } from '../controllers/pricePolicies.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const pricePolicyRoutes = express.Router();

pricePolicyRoutes.get('/', authUser, getPricePolicies);
pricePolicyRoutes.get('/:id', authUser, getPricePolicy);
pricePolicyRoutes.get('/code/:code', authUser, getPricePolicyByCode);
pricePolicyRoutes.get('/codes', authUser, getPricePoliciesByCodesController)
pricePolicyRoutes.post('/', authAdmin, postPricePolicy);
pricePolicyRoutes.put('/:id', authAdmin, putPricePolicy);
pricePolicyRoutes.delete('/:id', authAdmin, deletePricePolicy);

export { pricePolicyRoutes };