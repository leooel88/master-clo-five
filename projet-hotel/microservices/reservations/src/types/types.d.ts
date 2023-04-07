import { Request } from 'express';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string
  password: string;
  role: string;
}

export interface Room {
  id: number;
  hotelId: number;
  categoryCode: string;
}

export interface Category {
  id: number;
  code: string;
  name: string;
  capacity: number;
  basePrice: number;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}
