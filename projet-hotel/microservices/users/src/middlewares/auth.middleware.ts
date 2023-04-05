import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../../../database/src/services/user.service';
import { AuthenticatedRequest } from '../../../../global/types'

const { JWT_SECRET } = process.env

export async function authUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Accès non autorisé' });
    return;
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    const user = await getUserById(decoded.id);

    if (!user) {
      res.status(401).json({ error: 'Token invalide' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
}

export async function authAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Accès non autorisé' });
    return;
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    const user = await getUserById(decoded.id);

    if (!user) {
      res.status(401).json({ error: 'Token invalide' });
      return;
    }

    if (!user.role || user.role !== 'ADMIN' || !user.username || user.username !== decoded.username) {
      res.status(401).json({ error: 'Vous n\'avez pas les autorisations suffisantes pour cette requête' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
}