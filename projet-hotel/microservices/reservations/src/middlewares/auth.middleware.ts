import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../linkers/users.linker';
import { AuthenticatedRequest } from '../types/types'

const { JWT_SECRET } = process.env

export async function authUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Accès non autorisé' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

    if (req.user) {
      if (req.user.id != decoded.id) {
        res.status(401).json({ error: 'Accès non autorisé' });
        return;
      }
      next();
    }

    const user = await getUserById(req, decoded.id);
    console.log(user)

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
    const user = await getUserById(req, decoded.id);

    if (!user) {
      res.status(401).json({ error: 'Token invalide' });
      return;
    }

    if (!user.role || user.role !== 'ADMIN') {
      res.status(401).json({ error: 'Vous n\'avez pas les autorisations suffisantes pour cette requête' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
}
