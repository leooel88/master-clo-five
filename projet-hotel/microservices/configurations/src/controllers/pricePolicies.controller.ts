import { Request, Response } from 'express';
import { getAllPricePolicies, createPricePolicy, getPricePolicyById, getPricePoliciesByCodes, getPricePolicyByCode as serviceGetPricePolicyByCode, updatePricePolicy, deletePricePolicy as serviceDeletePricePolicy } from '../../database/services/pricePolicy.service';

export async function getPricePolicies(req: Request, res: Response): Promise<void> {
  console.log("Microservice : PricePolicy : GET ALL PRICEPOLICIES")
  try {
    const pricePolicies = await getAllPricePolicies();
    res.json(pricePolicies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPricePolicy(req: Request, res: Response): Promise<void> {
  console.log("Microservice : PricePolicy : GET PRICEPOLICY BY ID")
  const pricePolicyId = Number(req.params.id);

  try {
    const pricePolicy = await getPricePolicyById(pricePolicyId);

    if (!pricePolicy) {
      res.status(404).json({ error: 'PricePolicy introuvable' });
      return;
    }

    res.json(pricePolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPricePolicyByCode(req: Request, res: Response): Promise<void> {
  console.log("Microservice : PricePolicy : GET PRICEPOLICY BY CODE")
  const pricePolicyCode = req.params.code;

  try {
    const pricePolicy = await serviceGetPricePolicyByCode(pricePolicyCode);

    if (!pricePolicy) {
      res.status(404).json({ error: 'PricePolicy introuvable' });
      return;
    }

    res.json(pricePolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPricePoliciesByCodesController(req: Request, res: Response): Promise<Response> {
  const pricePolicyCodes = req.query.codes as string[];

  try {
    const pricePolicies = await getPricePoliciesByCodes(pricePolicyCodes);

    if (!pricePolicies) {
      return res.status(404).json({ message: 'PricePolicies introuvables' });
    }

    return res.json(pricePolicies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function postPricePolicy(req: Request, res: Response): Promise<void> {
  console.log("Microservice : PricePolicy : POST PRICEPOLICY")
  try {
    const pricePolicyData = req.body;
    const newPricePolicy = await createPricePolicy(pricePolicyData);
    res.status(201).json(newPricePolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putPricePolicy(req: Request, res: Response): Promise<void> {
  console.log("Microservice : PricePolicy : UPDATE PRICEPOLICY")
  
  const pricePolicyId = Number(req.params.id);
  const pricePolicyData = req.body;

  try {
    const updatedPricePolicy = await updatePricePolicy(pricePolicyId, pricePolicyData);

    if (!updatedPricePolicy) {
      res.status(404).json({ error: 'PricePolicy introuvable' });
      return;
    }

    res.json(updatedPricePolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deletePricePolicy(req: Request, res: Response): Promise<void> {
  console.log("Microservice : PricePolicy : DELETE PRICEPOLICY")
  
  const pricePolicyId = Number(req.params.id);

  try {
    await serviceDeletePricePolicy(pricePolicyId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}