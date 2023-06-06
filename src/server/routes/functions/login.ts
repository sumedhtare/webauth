import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { SET_USER_ONLINE_QUERY, USER_FROM_USERNAME_QUERY } from '../../constants';
import sqlite3 from 'sqlite3';
import { formatIP, decrypt } from '../../utils';

dotenv.config();

const secretKey = process.env.JWT_SECRET || '';
const tokenValidity = process.env.JWT_TOKEN_VALIDITY || '1h';

export const login = (req: any, res: Response) => {
  const { username, password } = req.body;
  const decryptedPassword = decrypt(password);
  const db = req.db as sqlite3.Database;

  db.get(USER_FROM_USERNAME_QUERY, [username], (err: any, row: any[]) => {
    if (err) {
      console.error('Error inserting logged-in user into the database:', err);
      return res.status(500).json({ message: 'Failed to log in user' });
    }
    const user: any = row;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    bcrypt.compare(decryptedPassword, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: tokenValidity });
      const currentTime = new Date().toISOString();

      db.run(
        SET_USER_ONLINE_QUERY,
        [currentTime, currentTime, currentTime, formatIP(req.ip), user.id],
        (err: any) => {
          if (err) {
            console.error('Error updating user into the database:', err);
          }
        }
      );
      const filterUser = { ...user };
      delete filterUser.password;
      res.json({ token, user: filterUser });
    });
  });
};
