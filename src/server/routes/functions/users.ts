import { Response } from 'express';
import { USER_FROM_ID_QUERY } from '../../constants';
import sqlite3 from 'sqlite3';

export const users = (req: any, res: Response) => {
   
    const userId = req.params.id;    
   
    const db = req.db as sqlite3.Database;

    db.get(USER_FROM_ID_QUERY, [userId], (err: any, row: any) => {
        if (err) {
            console.error('Error retrieving logged-in users from the database:', err);
            return res.status(500).json({ message: 'Failed to retrieve logged-in users' });
        }

        if (!row) {
            return res.status(404).json({ error: 'User not found' });
          }
        
        const user = {... row};
        delete user.password

        res.json(user);
    });
}