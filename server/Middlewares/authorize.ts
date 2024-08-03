import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token && validateToken(token) && secret) {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized' });
};

const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, secret!);
    return true;
  } catch (error) {
    return false;
  }
};
