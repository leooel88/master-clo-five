import axios from 'axios';
import { Category, AuthenticatedRequest } from '../types/types'

const {
  CONFIGURATION_MICROSERVICE_URL
} = process.env

const categoryService = axios.create({
  baseURL: `${CONFIGURATION_MICROSERVICE_URL}`
})

export async function getCategoryByCode(req: AuthenticatedRequest, categoryCode: string): Promise<Category | null> {
  try {
    let headers = { authorization: req.headers.authorization };
    let response = await categoryService.get(`/categories/code/${categoryCode}`, { headers })
    return response.data
  } catch (err) {
    throw err
  }
}