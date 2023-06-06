import { Response } from 'express';
import bcrypt from 'bcrypt';
import {
    REGISTER_QUERY,
    USER_FROM_USERNAME_QUERY
} from '../../constants';
import sqlite3 from 'sqlite3';
import { formatIP } from '../../utils/formatting';
import { decrypt } from '../../utils/aes';

export const register = (req: any, res: Response) => {
    const { username, password } = req.body;
    const decryptedPassword = decrypt(password);

    const db = req.db as sqlite3.Database;

    db.get(USER_FROM_USERNAME_QUERY, [username], (err: any, row: any[]) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Failed to register user' });
        }

        if (row) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error('Error generating salt:', err);
                return res.status(500).json({ message: 'Failed to register user' });
            }

            bcrypt.hash(decryptedPassword, salt, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Failed to register user' });
                }

                const userAgent = req.headers['user-agent'];
                const currentTime = new Date().toISOString();
                const userData = {
                    username,
                    password,
                    loginTime: null,
                    lastUpdateTime: currentTime,
                    lastLogin: null,
                    userIP: formatIP(req.ip),
                    userAgent,
                    registerTime: currentTime,
                    loginsCount: 0
                }

                db.run(
                    REGISTER_QUERY,
                    [username, hashedPassword, userData.loginTime, userData.lastUpdateTime, userData.lastLogin, userData.userIP, userAgent, userData.registerTime, userData.loginsCount],
                    function (err: any) {
                        if (err) {
                            console.error('Error inserting user into the database:', err);
                            return res.status(500).json({ message: 'Failed to register user' });
                        }

                        return res.json({ message: 'User registered successfully' });
                    });
            });
        });
    });
}