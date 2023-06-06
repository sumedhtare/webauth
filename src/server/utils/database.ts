import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import { CREATE_USERS_TABLE_QUERY } from '../constants';

dotenv.config();

const dbPath = process.env.DB_PATH || '';

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }

  console.log('Connected to the SQLite database');

  db.run(CREATE_USERS_TABLE_QUERY, (err) => {
    if (err) {
      console.error('Failed to create users table:', err);
      process.exit(1);
    }
  });
});
