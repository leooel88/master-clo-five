import { Request } from 'express';
import { User } from '../microservices/database/src/models/user';

export interface AuthenticatedRequest extends Request {
  user: User;
}