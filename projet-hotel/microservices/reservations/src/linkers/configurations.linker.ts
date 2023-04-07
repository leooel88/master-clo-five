import { Category } from '../types/types'
import axios from 'axios';

const {
  CONFIGURATION_MICROSERVICE_URL
} = process.env

const categoryService = axios.create({
  baseURL: `${CONFIGURATION_MICROSERVICE_URL}`
})

export async function getCategoryByCode(categoryCode: string): Promise<Category | null> {
  return await categoryService.get(`/categories/code/${categoryCode}`)
}