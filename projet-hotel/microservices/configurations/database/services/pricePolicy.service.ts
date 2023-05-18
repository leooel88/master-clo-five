import { PricePolicy } from '../models/pricePolicy';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.config';

export async function createPricePolicy(pricePolicyData: Partial<PricePolicy>): Promise<PricePolicy> {
  const pricePolicy = await PricePolicy.create(pricePolicyData);
  return pricePolicy;
}

export async function getAllPricePolicies(): Promise<PricePolicy[]> {
  const pricePolicies = await PricePolicy.findAll();
  return pricePolicies;
}

export async function getPricePolicyById(id: number): Promise<PricePolicy | null> {
  const pricePolicy = await PricePolicy.findByPk(id);
  return pricePolicy;
}

export async function getPricePolicyByCode(pricePolicyCode: string): Promise<PricePolicy | null> {
  const pricePolicy = await PricePolicy.findOne({ where: { code: pricePolicyCode } });
  return pricePolicy;
}

export async function getPricePoliciesByCodes(pricePolicyCodes: string[]): Promise<PricePolicy[] | null> {
  const pricePolicies = await PricePolicy.findAll({
    where: {
      code: {
        [Op.in]: pricePolicyCodes
      }
    }
  })

  if (!pricePolicies.length) {
    return null;
  }

  return pricePolicies;
}

export async function updatePricePolicy(id: number, pricePolicyData: Partial<PricePolicy>): Promise<PricePolicy | null> {
  const pricePolicy = await PricePolicy.findByPk(id);

  if (!pricePolicy) {
    return null;
  }
  await pricePolicy.update(pricePolicyData);
  return pricePolicy;
}

export async function deletePricePolicy(id: number): Promise<void> {
  await PricePolicy.destroy({ where: { id } });
}
