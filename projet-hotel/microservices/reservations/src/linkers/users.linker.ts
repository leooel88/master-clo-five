import axios from 'axios';

import { User, AuthenticatedRequest } from '../types/types'

const {
  USER_MICROSERVICE_URL
} = process.env

const userService = axios.create({
  baseURL: `${USER_MICROSERVICE_URL}`
})

export async function getUserById(req: AuthenticatedRequest, userId: number): Promise<User | null> {
  try {
    let headers = { authorization: req.headers.authorization };
    let response = await userService.get(`/users/${userId}`, { headers })
    return response.data
  } catch (err) {
    throw err
  }
}