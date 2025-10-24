import { signedCookies } from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
import { error } from 'console';

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';
  console.log('Creating token for:', email);
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === '') {
    console.log('No token found in cookies');
    return res.status(401).json({ message: 'Token not received' });
  }
  console.log('Verifying token...');
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';

  try {
    const decoded = jwt.verify(token, secret);
    console.log('Token verified successfully for:', decoded);
    res.locals.jwtData = decoded;
    return next();
  } catch (err: any) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Token Expired or Invalid' });
  }
};
