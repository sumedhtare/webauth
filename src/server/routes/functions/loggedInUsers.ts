import { Response } from 'express';
import { LOGGEDIN_USERS_QUERY } from '../../constants';

export const loggedInUsers = (req: any, res: Response) => {
    req.db.all(LOGGEDIN_USERS_QUERY, (err: any, rows: any[]) => {
        if (err) {
            console.error('Error retrieving logged-in users from the database:', err);
            return res.status(500).json({ message: 'Failed to retrieve logged-in users' });
        }
        const onlineUsers = rows.map(user =>{
            return {
                username: user.username,
                login_time: user.login_time,
                last_update_time: user.last_update_time,
                last_login: user.last_login,
                user_ip: user.user_ip,
                id: user.id,
            }
        })
        res.json(onlineUsers);
    });
}