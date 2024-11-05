import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "your_jwt_secret_key";
export interface authRequest extends Request {
    user?: any
}

export const authMiddleware = (req: authRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token:any = req.header('Authorization')?.replace('Bearer ', '');
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      console.log('Invalid token',error);
    }
  }
  next();
};
