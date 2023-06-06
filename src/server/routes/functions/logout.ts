import { Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { revokedTokens } from '../../middleware';
import { SET_USER_OFFLINE_QUERY } from '../../constants';
import sqlite3 from 'sqlite3';

dotenv.config();

const secretKey = process.env.JWT_SECRET || '';

export const logout = (req: any, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const db = req.db as sqlite3.Database;
  
    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      revokedTokens.push(token);
  
      db.run(
        SET_USER_OFFLINE_QUERY,
        [decoded.userId],
        function (err: any) {
          if (err) {
            console.error('Error setting user offline:', err);
          }
        });
  
      res.json({ message: 'Logged out successfully' });
    });  
}