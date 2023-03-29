import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Accès non autorisé' });
    return;
  }

  // Ici, nous utilisons un token statique pour simplifier l'exemple, mais en réalité, vous devriez vérifier un token JWT ou similaire
  if (token !== 'Bearer my-secret-token') {
    res.status(401).json({ error: 'Token invalide' });
    return;
  }
    
  next();
}