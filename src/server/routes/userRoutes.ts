import express from 'express';
import { authenticateToken } from '../middleware';
import { register, loggedInUsers, login, logout, users } from './functions';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logged-in-users',authenticateToken, loggedInUsers);

router.post('/logout', authenticateToken, logout);

router.get('/users/:id', authenticateToken, users);


export default router;
